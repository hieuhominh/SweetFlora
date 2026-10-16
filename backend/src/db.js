const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgrespassword@localhost:5432/sweetflora';

let isConnected = false;

const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 3000,
});

pool.connect((err, client, release) => {
    if (err) {
        console.warn('⚠️ [PostgreSQL]: Could not connect to PostgreSQL server directly.');
        console.warn('   Reason:', err.message);
        console.log('💡 [SweetFlora]: Activating Resilient In-Memory Fallback so APIs keep serving smoothly!');
        isConnected = false;
    } else {
        console.log('✅ [PostgreSQL]: Successfully connected to database:', pool.options.database || 'sweetflora');
        isConnected = true;
        release();
    }
});

// Fallback seed data in case PostgreSQL is running in container or locally
const FALLBACK_DATA = {
    florists: [
        { id: 1, name: "Phương Floral Boutique", district: "Quận 3", address: "42 Cách Mạng Tháng 8", rating: 4.9, experience_years: 4, phone: "0908.412.888" },
        { id: 2, name: "Tiệm Hoa Nắng Mai", district: "Bình Thạnh", address: "128 Điện Biên Phủ", rating: 4.8, experience_years: 3, phone: "0912.345.678" },
        { id: 3, name: "Dalat Rose Studio", district: "TP. Thủ Đức", address: "88 Võ Văn Ngân", rating: 5.0, experience_years: 5, phone: "0933.158.999" },
        { id: 4, name: "Nàng Thơ Florist", district: "Quận 1", address: "15 Lê Duẩn", rating: 4.9, experience_years: 2, phone: "0945.678.910" }
    ],
    flowers: [
        {
            id: 1, florist_id: 1, florist_name: "Phương Floral Boutique (Quận 3)",
            name: "Bó Hồng Juliet & Cúc Mẫu Đơn Pastel", category: "love", price: 580000,
            image_url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
            description: "Bó hoa phối trộn giữa hồng Juliet nhập khẩu, cúc mẫu đơn và hoa baby trắng tinh khôi. Phù hợp tặng sinh nhật, kỷ niệm hoặc tỏ tình lãng mạn."
        },
        {
            id: 2, florist_id: 2, florist_name: "Tiệm Hoa Nắng Mai (Bình Thạnh)",
            name: "Bó Baby Cầu Vồng Tươi Mát", category: "birthday", price: 320000,
            image_url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
            description: "Hoa baby nhuộm màu pastel tự nhiên, tươi lâu trên 7 ngày. Nhẹ nhàng, ngọt ngào, món quà bất ngờ cho bạn bè, em gái."
        },
        {
            id: 3, florist_id: 3, florist_name: "Dalat Rose Studio (TP. Thủ Đức)",
            name: "Giỏ Hoa Hướng Dương Rực Rỡ", category: "congrats", price: 450000,
            image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
            description: "Hoa hướng dương Đà Lạt cành to, nhụy đen kết hợp cùng hoa lá phụ xanh mát. Mang thông điệp may mắn, thành công."
        },
        {
            id: 4, florist_id: 1, florist_name: "Phương Floral Boutique (Quận 3)",
            name: "Bó Cẩm Tú Cầu Xanh Ngọc", category: "birthday", price: 380000,
            image_url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
            description: "Cẩm tú cầu Đà Lạt nở xòe to tròn đều, giấy gói tông xanh sage vintage. Thiết kế thanh lịch, trang nhã."
        },
        {
            id: 5, florist_id: 3, florist_name: "Dalat Rose Studio (TP. Thủ Đức)",
            name: "Lẵng Hồng Đỏ Ecuador Kiêu Sa", category: "love", price: 890000,
            image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
            description: "Hồng đỏ nhập khẩu cánh dày nhung mịn, cắm trong giỏ mây mộc mạc cao cấp. Thể hiện tình yêu nồng nhiệt và sâu sắc."
        },
        {
            id: 6, florist_id: 2, florist_name: "Tiệm Hoa Nắng Mai (Bình Thạnh)",
            name: "Bình Lan Hồ Điệp Mini Để Bàn", category: "congrats", price: 650000,
            image_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
            description: "Lan hồ điệp tím trắng 2 cành ghép trong chậu gốm sứ Bát Tràng. Giữ tươi từ 3-4 tuần, rất trang trọng cho bàn làm việc."
        },
        {
            id: 7, florist_id: 4, florist_name: "Nàng Thơ Florist (Quận 1)",
            name: "Bó Hoa Cúc Tana Thơ Mộng", category: "birthday", price: 290000,
            image_url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
            description: "Những đóa cúc Tana nhỏ xinh như những mặt trời tí hon. Phong cách tối giản mộc mạc nhưng cực kỳ được lòng các bạn nữ trẻ."
        },
        {
            id: 8, florist_id: 1, florist_name: "Phương Floral Boutique (Quận 3)",
            name: "Hộp Hoa Mẫu Đơn & Tulip Hồng", category: "love", price: 1200000,
            image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
            live_image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
            description: "Hộp quà hoa tươi thiết kế đặc biệt gồm hoa Mẫu Đơn Hà Lan và hoa Tulip hồng dịu dàng."
        }
    ],
    orders: [
        {
            id: 1, order_code: "SF-8924", customer_name: "Nguyễn Tuấn Anh",
            customer_phone: "0914123456", customer_email: "tuananh.dev@gmail.com",
            flower_id: 1, total_amount: 580000,
            gift_message: "Chúc em sinh nhật thật hạnh phúc!",
            status: "PENDING_APPROVAL"
        }
    ],
    approvals: [
        {
            id: 1, order_id: 1,
            catalog_photo_url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
            studio_photo_url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
            florist_note: "Dạ chào bạn, tiệm Phương Floral đã hoàn thiện bó hoa với hoa hồng Juliet mới về sáng nay. Bạn xem ảnh thật kiểm tra nhé!",
            status: "WAITING_FOR_CUSTOMER",
            countdown_seconds: 285
        }
    ]
};

async function query(sql, params = []) {
    try {
        if (isConnected) {
            const res = await pool.query(sql, params);
            return res;
        }
    } catch (err) {
        console.warn('PostgreSQL query error, using in-memory store:', err.message);
    }
    return null;
}

module.exports = {
    pool,
    query,
    FALLBACK_DATA
};
