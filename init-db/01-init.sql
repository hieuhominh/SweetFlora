-- ====================================================================
-- SWEETFLORA POSTGRESQL DATABASE SCHEMA & SEED DATA
-- Database for CP3 MVP: Florists, Flowers, Orders, Approvals
-- ====================================================================

-- 1. Florists Table (Shop hoa đối tác)
CREATE TABLE IF NOT EXISTS florists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) DEFAULT 'TP. Hồ Chí Minh',
    experience_years INT DEFAULT 3,
    phone VARCHAR(20),
    email VARCHAR(100),
    rating NUMERIC(2,1) DEFAULT 4.9,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Flowers Catalog Table (Mẫu hoa)
CREATE TABLE IF NOT EXISTS flowers (
    id SERIAL PRIMARY KEY,
    florist_id INT REFERENCES florists(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'love', 'birthday', 'congrats'
    price INT NOT NULL,            -- Giá VNĐ (ví dụ: 580000)
    image_url TEXT NOT NULL,       -- Ảnh catalog mẫu
    live_image_url TEXT NOT NULL,  -- Ảnh chụp thực tế tại tiệm
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table (Đơn hàng)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    flower_id INT REFERENCES flowers(id),
    total_amount INT NOT NULL,
    gift_message TEXT,
    shipping_address TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING_APPROVAL', -- 'PENDING_APPROVAL', 'APPROVED', 'EDIT_REQUESTED', 'DELIVERING', 'COMPLETED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Real-Photo Approvals Table (Bảng duyệt ảnh thật CP2/CP3 core feature)
CREATE TABLE IF NOT EXISTS approval_logs (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    catalog_photo_url TEXT NOT NULL,
    studio_photo_url TEXT NOT NULL,
    florist_note TEXT,
    customer_feedback TEXT,
    status VARCHAR(50) DEFAULT 'WAITING_FOR_CUSTOMER', -- 'WAITING_FOR_CUSTOMER', 'APPROVED', 'REVISE_REQUESTED'
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA
INSERT INTO florists (name, address, district, phone, email, rating, experience_years) VALUES
('Phương Floral Boutique', '42 Cách Mạng Tháng 8', 'Quận 3', '0908412888', 'phuongfloral@gmail.com', 4.9, 4),
('Tiệm Hoa Nắng Mai', '128 Điện Biên Phủ', 'Bình Thạnh', '0912345678', 'nangmaiflower@gmail.com', 4.8, 3),
('Dalat Rose Studio', '88 Võ Văn Ngân', 'TP. Thủ Đức', '0933158999', 'dalatrose@gmail.com', 5.0, 5),
('Nàng Thơ Florist', '15 Lê Duẩn', 'Quận 1', '0945678910', 'nangthoflorist@gmail.com', 4.9, 2);

INSERT INTO flowers (florist_id, name, category, price, image_url, live_image_url, description) VALUES
(1, 'Bó Hồng Juliet & Cúc Mẫu Đơn Pastel', 'love', 580000, 
 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80',
 'Bó hoa phối trộn giữa hồng Juliet nhập khẩu, cúc mẫu đơn và hoa baby trắng tinh khôi. Phù hợp tặng sinh nhật, kỷ niệm hoặc tỏ tình lãng mạn.'),

(2, 'Bó Baby Cầu Vồng Tươi Mát', 'birthday', 320000,
 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
 'Hoa baby nhuộm màu pastel tự nhiên, tươi lâu trên 7 ngày. Nhẹ nhàng, ngọt ngào, món quà bất ngờ cho bạn bè, em gái.'),

(3, 'Giỏ Hoa Hướng Dương Rực Rỡ', 'congrats', 450000,
 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
 'Hoa hướng dương Đà Lạt cành to, nhụy đen kết hợp cùng hoa lá phụ xanh mát. Mang thông điệp may mắn, thành công.'),

(1, 'Bó Cẩm Tú Cầu Xanh Ngọc', 'birthday', 380000,
 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80',
 'Cẩm tú cầu Đà Lạt nở xòe to tròn đều, giấy gói tông xanh sage vintage. Thiết kế thanh lịch, trang nhã.'),

(3, 'Lẵng Hồng Đỏ Ecuador Kiêu Sa', 'love', 890000,
 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
 'Hồng đỏ nhập khẩu cánh dày nhung mịn, cắm trong giỏ mây mộc mạc cao cấp. Thể hiện tình yêu nồng nhiệt và sâu sắc.'),

(2, 'Bình Lan Hồ Điệp Mini Để Bàn', 'congrats', 650000,
 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
 'Lan hồ điệp tím trắng 2 cành ghép trong chậu gốm sứ Bát Tràng. Giữ tươi từ 3-4 tuần, rất trang trọng cho bàn làm việc.'),

(4, 'Bó Hoa Cúc Tana Thơ Mộng', 'birthday', 290000,
 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80',
 'Những đóa cúc Tana nhỏ xinh như những mặt trời tí hon. Phong cách tối giản mộc mạc nhưng cực kỳ được lòng các bạn nữ trẻ.'),

(1, 'Hộp Hoa Mẫu Đơn & Tulip Hồng', 'love', 1200000,
 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
 'Hộp quà hoa tươi thiết kế đặc biệt gồm hoa Mẫu Đơn Hà Lan và hoa Tulip hồng dịu dàng.');

-- Sample Demo Order & Approval Log for Live Presentation
INSERT INTO orders (order_code, customer_name, customer_phone, customer_email, flower_id, total_amount, gift_message, shipping_address, status)
VALUES ('SF-8924', 'Nguyễn Tuấn Anh', '0914123456', 'tuananh.dev@gmail.com', 1, 580000, 'Chúc em sinh nhật thật hạnh phúc!', 'Tòa nhà Landmark 81, Bình Thạnh, TP.HCM', 'PENDING_APPROVAL');

INSERT INTO approval_logs (order_id, catalog_photo_url, studio_photo_url, florist_note, status)
VALUES (1, 
 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80',
 'Dạ chào bạn, tiệm Phương Floral đã hoàn thiện bó hoa với hoa hồng Juliet mới về sáng nay. Bạn xem ảnh thật kiểm tra nhé!', 
 'WAITING_FOR_CUSTOMER');
