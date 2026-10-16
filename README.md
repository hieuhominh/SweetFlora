# 🌸 SweetFlora – Full-Stack Web MVP (React + PostgreSQL + Docker)

Dự án MVP cho Checkpoint 3 (CP3) - EXE101 môn Khởi nghiệp kinh doanh.  
Nhóm thực hiện: **Chưa Biết Nhưng Làm** (Thành viên: Phước Thịnh, Duy Minh, Tố Như, Phan Phúc).

---

## 🏗️ Kiến Trúc Hệ Thống (Tech Stack)

* **Frontend:** **React 18 + Vite** (Giao diện tiệm hoa thủ công nghệ thuật, font *Playfair Display* & *Plus Jakarta Sans*).
* **Backend:** **Node.js (Express)** cung cấp RESTful API đầy đủ cho danh mục hoa, giỏ hàng, và quy trình duyệt ảnh thật.
* **Database:** **PostgreSQL 15** (chứa schema & dữ liệu mẫu: `florists`, `flowers`, `orders`, `approval_logs`).
* **Containerization:** **Docker & Docker Compose** (đóng gói 3 container: database, backend api, frontend nginx).

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Chạy bằng Docker (Khuyên dùng khi nộp bài & demo)

1. Mở ứng dụng **Docker Desktop** trên máy tính.
2. Mở Terminal tại thư mục `c:\Users\ASUS\Desktop\EXE\sweetflora-app\` và gõ:

```bash
docker-compose up -d --build
```

3. Truy cập hệ thống:
   * **Web App (React Frontend):** [http://localhost:3000](http://localhost:3000)
   * **REST API Backend:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
   * **PostgreSQL Database:** `localhost:5432` (User: `postgres`, Password: `postgrespassword`, DB: `sweetflora`)

4. Để dừng các container:
```bash
docker-compose down
```

---

### Cách 2: Chạy trực tiếp trên máy (Không cần mở Docker)

Nếu máy bạn chưa bật Docker Desktop, hệ thống đã được tích hợp sẵn cơ chế **Resilient Fallback** để bạn vẫn chạy và demo mượt mà 100%:

**Bước 1: Chạy Backend (Terminal 1)**
```bash
cd backend
npm run dev
```
*(Server chạy tại: http://localhost:5000)*

**Bước 2: Chạy Frontend React (Terminal 2)**
```bash
cd frontend
npm run dev
```
*(React App chạy tại: http://localhost:3000)*

---

## 🎯 Các Tính Năng Trọng Tâm Để Demo Cho Giảng Viên (CP3)

1. **Bộ lọc theo ngân sách (Budget Filtering):**
   * Bấm nhanh các nút: *"Dưới 400.000đ"*, *"400.000đ - 700.000đ"*, *"Trên 700.000đ"* để lọc hoa tương thích nhu cầu khách hàng CP2.
2. **Quy trình Duyệt Ảnh Thật (Real-Photo Approval Simulator - CP3 Star Feature):**
   * Bấm nút **"✨ Bật Mô Phỏng Duyệt Hoa Thực Tế"**.
   * So sánh song song: **Ảnh mẫu trên web** vs **Ảnh thật Florist vừa cắm xong tại tiệm**.
   * Có đồng hồ đếm ngược 5 phút và lời nhắn riêng của thợ cắm hoa.
   * Khách bấm **[Đồng Ý Duyệt Hoa & Cho Shipper Đi Giao]** ➔ Tạo mã vận đơn hỏa tốc `VN-EXP-202688`.
   * Hoặc bấm **[Yêu cầu chỉnh nơ / hoa phụ]** ➔ Gửi yêu cầu florist sửa tại chỗ.
3. **Giao diện dành cho Shop hoa (Florist Portal):**
   * Bấm nút **"🧑‍🌾 Góc Florist Demo"** để demo cho giảng viên thấy florist chụp ảnh hoa thật tại tiệm và gửi cho khách qua app thế nào.
4. **Quy chuẩn bao bì chống dập nát (Packaging Requirement):**
   * Phần giới thiệu trực quan hộp carton định vị chống sốc 3 lớp giải quyết rủi ro vận chuyển đã chỉ ra ở CP2.
