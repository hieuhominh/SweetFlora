const express = require('express');
const cors = require('cors');
const { query, FALLBACK_DATA } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'SweetFlora REST API',
        timestamp: new Date().toISOString(),
        database: 'PostgreSQL'
    });
});

// 1. GET /api/flowers: Filter by budget, category, search
app.get('/api/flowers', async (req, res) => {
    try {
        const { budget, category, search } = req.query;

        // Try querying PostgreSQL
        let dbRes = await query(`
            SELECT f.*, fl.name as florist_name, fl.district as florist_district 
            FROM flowers f
            JOIN florists fl ON f.florist_id = fl.id
            ORDER BY f.id ASC
        `);

        let flowers = dbRes ? dbRes.rows : FALLBACK_DATA.flowers;

        // Apply filters in memory
        if (category && category !== 'all') {
            flowers = flowers.filter(f => f.category === category);
        }

        if (budget) {
            if (budget === 'low') flowers = flowers.filter(f => f.price < 400000);
            else if (budget === 'mid') flowers = flowers.filter(f => f.price >= 400000 && f.price <= 700000);
            else if (budget === 'high') flowers = flowers.filter(f => f.price > 700000);
        }

        if (search) {
            const q = search.toLowerCase();
            flowers = flowers.filter(f => 
                f.name.toLowerCase().includes(q) || 
                (f.florist_name && f.florist_name.toLowerCase().includes(q))
            );
        }

        res.json({ success: true, count: flowers.length, data: flowers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. GET /api/flowers/:id
app.get('/api/flowers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let dbRes = await query(`
        SELECT f.*, fl.name as florist_name, fl.district, fl.phone, fl.rating
        FROM flowers f
        JOIN florists fl ON f.florist_id = fl.id
        WHERE f.id = $1
    `, [id]);

    const flower = dbRes ? dbRes.rows[0] : FALLBACK_DATA.flowers.find(f => f.id === id);
    if (!flower) return res.status(404).json({ success: false, message: 'Flower not found' });
    res.json({ success: true, data: flower });
});

// 3. GET /api/florists: List partner florists
app.get('/api/florists', async (req, res) => {
    let dbRes = await query('SELECT * FROM florists ORDER BY rating DESC');
    const florists = dbRes ? dbRes.rows : FALLBACK_DATA.florists;
    res.json({ success: true, count: florists.length, data: florists });
});

// 4. GET /api/orders/:id/approval: Core Feature - Live photo comparison
app.get('/api/orders/:id/approval', async (req, res) => {
    const orderId = parseInt(req.params.id);
    let approval = FALLBACK_DATA.approvals.find(a => a.order_id === orderId) || FALLBACK_DATA.approvals[0];
    res.json({
        success: true,
        data: {
            order_id: orderId,
            order_code: "SF-8924",
            product_name: "Bó Hồng Juliet & Cúc Mẫu Đơn Pastel",
            shop_name: "Phương Floral Boutique (Quận 3)",
            catalog_photo_url: approval.catalog_photo_url,
            studio_photo_url: approval.studio_photo_url,
            florist_note: approval.florist_note,
            status: approval.status,
            countdown_seconds: approval.countdown_seconds || 285
        }
    });
});

// 5. POST /api/orders/:id/approve: Customer confirms actual flower photo
app.post('/api/orders/:id/approve', async (req, res) => {
    const orderId = parseInt(req.params.id);
    const trackingCode = "VN-EXP-" + Math.floor(100000 + Math.random() * 900000);

    // Update in database if connected
    await query(`
        UPDATE orders SET status = 'APPROVED' WHERE id = $1;
        UPDATE approval_logs SET status = 'APPROVED', approved_at = NOW() WHERE order_id = $1;
    `, [orderId]);

    // Update memory
    const approval = FALLBACK_DATA.approvals.find(a => a.order_id === orderId);
    if (approval) approval.status = 'APPROVED';

    res.json({
        success: true,
        message: 'Order approved successfully by customer! Dispatching package.',
        tracking_code: trackingCode,
        estimated_delivery: '45 phút (Giao hỏa tốc bằng hộp carton định vị chống sốc)',
        driver: {
            name: 'Nguyễn Văn Hưng',
            phone: '0982.123.456'
        }
    });
});

// 6. POST /api/orders/:id/request-edit: Customer requests modification
app.post('/api/orders/:id/request-edit', async (req, res) => {
    const orderId = parseInt(req.params.id);
    const { note } = req.body;

    await query(`
        UPDATE approval_logs 
        SET status = 'REVISE_REQUESTED', customer_feedback = $2 
        WHERE order_id = $1
    `, [orderId, note || 'Yêu cầu đổi nơ/hoa phụ']);

    const approval = FALLBACK_DATA.approvals.find(a => a.order_id === orderId);
    if (approval) {
        approval.status = 'REVISE_REQUESTED';
        approval.florist_note = `[Khách hàng yêu cầu chỉnh sửa]: "${note}" - Shop đang thay đổi ngay tại tiệm.`;
    }

    res.json({
        success: true,
        message: 'Modification request sent to florist! Florist will respond within 3 minutes.',
        note: note
    });
});

// 7. POST /api/florist/upload-photo: Florist uploads actual photo
app.post('/api/florist/upload-photo', async (req, res) => {
    const { order_id, photo_url, note } = req.body;

    const approval = FALLBACK_DATA.approvals[0];
    if (photo_url) approval.studio_photo_url = photo_url;
    if (note) approval.florist_note = note;
    approval.status = 'WAITING_FOR_CUSTOMER';

    res.json({
        success: true,
        message: 'Live flower studio photo sent to customer for approval!',
        data: approval
    });
});

// 8. POST /api/orders: Create new order
app.post('/api/orders', async (req, res) => {
    const { flower_id, customer_name, customer_email, gift_message } = req.body;
    const newOrderCode = 'SF-' + Math.floor(1000 + Math.random() * 9000);

    res.json({
        success: true,
        message: 'Order placed successfully! Awaiting Florist to craft and upload actual photo.',
        order: {
            order_code: newOrderCode,
            customer_name: customer_name || 'Khách hàng SweetFlora',
            gift_message: gift_message || 'Không có',
            status: 'PENDING_APPROVAL'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🌸 [SweetFlora Backend]: Server running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   Flowers API:  http://localhost:${PORT}/api/flowers`);
});
