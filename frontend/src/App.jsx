import React, { useState, useEffect } from 'react';

const FALLBACK_FLOWERS = [
  {
    id: 1,
    name: "Bó Hồng Juliet & Cúc Mẫu Đơn Pastel",
    price: 580000,
    category: "love",
    florist_name: "Phương Floral Boutique (Quận 3)",
    image_url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
    description: "Bó hoa phối trộn giữa hồng Juliet nhập khẩu, cúc mẫu đơn và hoa baby trắng tinh khôi. Phù hợp tặng sinh nhật, kỷ niệm hoặc tỏ tình lãng mạn."
  },
  {
    id: 2,
    name: "Bó Baby Cầu Vồng Tươi Mát",
    price: 320000,
    category: "birthday",
    florist_name: "Tiệm Hoa Nắng Mai (Bình Thạnh)",
    image_url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
    description: "Hoa baby nhuộm màu pastel tự nhiên, tươi lâu trên 7 ngày. Nhẹ nhàng, ngọt ngào, món quà bất ngờ cho bạn bè, em gái."
  },
  {
    id: 3,
    name: "Giỏ Hoa Hướng Dương Rực Rỡ",
    price: 450000,
    category: "congrats",
    florist_name: "Dalat Rose Studio (TP. Thủ Đức)",
    image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    description: "Hoa hướng dương Đà Lạt cành to, nhụy đen kết hợp cùng hoa lá phụ xanh mát. Mang thông điệp may mắn, thành công."
  },
  {
    id: 4,
    name: "Bó Cẩm Tú Cầu Xanh Ngọc",
    price: 380000,
    category: "birthday",
    florist_name: "Phương Floral Boutique (Quận 3)",
    image_url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
    description: "Cẩm tú cầu Đà Lạt nở xòe to tròn đều, giấy gói tông xanh sage vintage. Thiết kế thanh lịch, trang nhã."
  },
  {
    id: 5,
    name: "Lẵng Hồng Đỏ Ecuador Kiêu Sa",
    price: 890000,
    category: "love",
    florist_name: "Dalat Rose Studio (TP. Thủ Đức)",
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    description: "Hồng đỏ nhập khẩu cánh dày nhung mịn, cắm trong giỏ mây mộc mạc cao cấp. Thể hiện tình yêu nồng nhiệt và sâu sắc."
  },
  {
    id: 6,
    name: "Bình Lan Hồ Điệp Mini Để Bàn",
    price: 650000,
    category: "congrats",
    florist_name: "Tiệm Hoa Nắng Mai (Bình Thạnh)",
    image_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    description: "Lan hồ điệp tím trắng 2 cành ghép trong chậu gốm sứ Bát Tràng. Giữ tươi từ 3-4 tuần, rất trang trọng cho bàn làm việc."
  },
  {
    id: 7,
    name: "Bó Hoa Cúc Tana Thơ Mộng",
    price: 290000,
    category: "birthday",
    florist_name: "Nàng Thơ Florist (Quận 1)",
    image_url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
    description: "Những đóa cúc Tana nhỏ xinh như những mặt trời tí hon. Phong cách tối giản mộc mạc nhưng cực kỳ được lòng các bạn nữ trẻ."
  },
  {
    id: 8,
    name: "Hộp Hoa Mẫu Đơn & Tulip Hồng",
    price: 1200000,
    category: "love",
    florist_name: "Phương Floral Boutique (Quận 3)",
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    live_image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    description: "Hộp quà hoa tươi thiết kế đặc biệt gồm hoa Mẫu Đơn Hà Lan và hoa Tulip hồng dịu dàng."
  }
];

export default function App() {
  const [flowers, setFlowers] = useState(FALLBACK_FLOWERS);
  const [category, setCategory] = useState('all');
  const [budget, setBudget] = useState('all');
  const [search, setSearch] = useState('');
  
  // Modals state
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isFloristOpen, setIsFloristOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Approval flow state
  const [isApproved, setIsApproved] = useState(false);
  const [trackingCode, setTrackingCode] = useState('VN-EXP-202688');
  const [floristNote, setFloristNote] = useState("Dạ chào bạn, tiệm Phương Floral đã hoàn thiện bó hoa với hoa hồng Juliet nhập mới sáng nay. Bạn xem ảnh thật kiểm tra nhé!");
  const [livePhoto, setLivePhoto] = useState("https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80");
  const [timerSeconds, setTimerSeconds] = useState(285);

  // Cart state
  const [cart, setCart] = useState([]);
  const [giftNote, setGiftNote] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Fetch from backend API
  useEffect(() => {
    fetch(`/api/flowers?category=${category}&budget=${budget}&search=${search}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data) {
          setFlowers(data.data);
        }
      })
      .catch(() => {
        // Local fallback filtering
        let list = FALLBACK_FLOWERS;
        if (category !== 'all') list = list.filter(f => f.category === category);
        if (budget === 'low') list = list.filter(f => f.price < 400000);
        else if (budget === 'mid') list = list.filter(f => f.price >= 400000 && f.price <= 700000);
        else if (budget === 'high') list = list.filter(f => f.price > 700000);
        if (search) list = list.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
        setFlowers(list);
      });
  }, [category, budget, search]);

  // Timer countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const formatVND = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

  const handleApprove = async () => {
    try {
      const res = await fetch('/api/orders/1/approve', { method: 'POST' });
      const data = await res.json();
      if (data && data.tracking_code) setTrackingCode(data.tracking_code);
    } catch {
      setTrackingCode('VN-EXP-' + Math.floor(100000 + Math.random() * 900000));
    }
    setIsApproved(true);
    showToast("✓ Bạn đã duyệt hoa thành công! Đơn hàng bắt đầu giao.");
  };

  const handleRequestEdit = () => {
    const edit = prompt("Vui lòng nhập ghi chú chỉnh sửa gửi Florist:", "Dạ shop đổi giúp mình nơ màu hồng phấn sang nơ lụa màu kem với ạ!");
    if (edit) {
      setFloristNote(`[Khách yêu cầu]: "${edit}" - Florist đang chỉnh sửa tại tiệm.`);
      showToast("Đã gửi yêu cầu chỉnh sửa đến Florist! Shop sẽ phản hồi trong 3 phút.");
    }
  };

  const handleFloristSubmit = (e) => {
    e.preventDefault();
    setIsFloristOpen(false);
    showToast("📸 Đã gửi ảnh hoa thật cho khách duyệt qua app thành công!");
    setTimeout(() => setIsApprovalOpen(true), 600);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    setCart([...cart, { ...selectedProduct, giftNote }]);
    setSelectedProduct(null);
    setGiftNote('');
    showToast(`🛒 Đã thêm "${selectedProduct.name}" vào giỏ hàng!`);
  };

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    showToast("🎉 Đặt hàng thành công! Vui lòng chờ shop cắm hoa và gửi ảnh duyệt.");
    setTimeout(() => setIsApprovalOpen(true), 1200);
  };

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="sweetflora-app">
      {/* Top Banner */}
      <aside className="top-announcement">
        <div className="container announcement-content">
          <span>✨ <strong>Cam kết độc quyền SweetFlora:</strong> Shop chụp ảnh hoa thật gửi bạn duyệt trước khi giao • Bảo hiểm hoa tươi 100%</span>
          <div className="announcement-right">
            <span class="badge-hot">Dịp 20/10</span>
            <span>📍 Giao hỏa tốc 2H tại TP.HCM & Hà Nội</span>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="site-header">
        <div className="container header-container">
          <a href="#" className="brand-logo">
            <span className="logo-icon">🌸</span>
            <div>
              <span className="logo-name">SweetFlora</span>
              <span className="logo-tagline">Artisanal Florist Marketplace (React + Postgres)</span>
            </div>
          </a>

          <div className="header-search">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm hoa theo loại hoa, dịp tặng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <nav className="header-nav">
            <button className="btn-portal" onClick={() => setIsFloristOpen(true)}>
              🧑‍🌾 Góc Florist Demo
            </button>
            <button className="btn-cart" onClick={() => setIsCartOpen(true)}>
              🛒 Giỏ hàng
              <span className="cart-count">{cart.length}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">🌿 Đặt hoa không còn nỗi lo "khác ảnh mẫu"</span>
            <h1 className="hero-title">
              Trao gửi yêu thương, <br />
              <em>chuẩn xác từng cánh hoa.</em>
            </h1>
            <p className="hero-description">
              Nền tảng kết nối trực tiếp bạn với các thợ cắm hoa địa phương tài năng. 
              <strong> Xem và duyệt ảnh chụp thực tế bó hoa đã cắm trước khi shipper bấm chuông.</strong>
            </p>

            {/* Budget Filter */}
            <div className="budget-filter-card">
              <div className="filter-header">
                <span className="filter-title">🎯 Chọn nhanh theo ngân sách của bạn:</span>
                <span className="filter-subtitle">
                  {budget === 'all' && 'Tất cả mức giá'}
                  {budget === 'low' && 'Dưới 400.000đ'}
                  {budget === 'mid' && '400.000đ - 700.000đ'}
                  {budget === 'high' && 'Trên 700.000đ'}
                </span>
              </div>
              <div className="budget-buttons">
                {['all', 'low', 'mid', 'high'].map(b => (
                  <button 
                    key={b}
                    className={`btn-budget ${budget === b ? 'active' : ''}`}
                    onClick={() => setBudget(b)}
                  >
                    {b === 'all' && 'Tất cả'}
                    {b === 'low' && 'Dưới 400.000đ'}
                    {b === 'mid' && '400.000đ - 700.000đ'}
                    {b === 'high' && 'Trên 700.000đ'}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-item"><span>📸</span> Duyệt ảnh thật 100%</div>
              <div className="trust-item"><span>🛡️</span> Bảo hiểm hoàn tiền 2H</div>
              <div className="trust-item"><span>⏱️</span> Giao chuẩn giờ hẹn</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-featured">
              <div className="card-tag-approval">✨ Đang chờ bạn duyệt</div>
              <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80" alt="Juliet" className="hero-img" />
              <div className="hero-card-info">
                <div className="card-shop">
                  <span>💐</span>
                  <div>
                    <strong>Phương Floral Boutique</strong>
                    <small>Quận 3, TP.HCM • Đã kiểm duyệt</small>
                  </div>
                </div>
                <h4 className="card-name">Bó Hồng Juliet & Cúc Mẫu Đơn Pastel</h4>
                <div className="card-meta">
                  <span className="card-price">580.000 đ</span>
                  <button className="btn-test-approval" onClick={() => setIsApprovalOpen(true)}>
                    🔍 Xem thử duyệt ảnh thật
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callout Simulator Banner */}
      <div className="container">
        <div className="interactive-callout">
          <div className="callout-content">
            <h3>💡 Tính Năng Ngôi Sao CP3: Trải nghiệm duyệt ảnh hoa thực tế</h3>
            <p>Mở màn hình mô phỏng quy trình kiểm tra ảnh studio so với ảnh mẫu và phê duyệt đơn hàng.</p>
          </div>
          <button className="btn-primary-large" onClick={() => setIsApprovalOpen(true)}>
            ✨ Bật Mô Phỏng Duyệt Hoa Thực Tế
          </button>
        </div>
      </div>

      {/* Flower Catalog */}
      <section className="products-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-tag">Bộ sưu tập hoa tươi</span>
              <h2 className="section-title">Mẫu hoa thiết kế được yêu thích nhất</h2>
            </div>
            <div className="category-pills">
              {['all', 'birthday', 'love', 'congrats'].map(cat => (
                <button 
                  key={cat} 
                  className={`pill ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat === 'all' && 'Tất cả'}
                  {cat === 'birthday' && 'Sinh nhật'}
                  {cat === 'love' && 'Tình yêu & 20/10'}
                  {cat === 'congrats' && 'Chúc mừng'}
                </button>
              ))}
            </div>
          </div>

          <div className="flower-grid">
            {flowers.map(flower => (
              <div key={flower.id} className="flower-card">
                <div className="card-img-wrap">
                  <img src={flower.image_url} alt={flower.name} />
                  <span className="card-badge-proof">📸 Duyệt ảnh thật</span>
                </div>
                <div className="card-content">
                  <span className="card-shop-name">💐 {flower.florist_name || 'Florist Đối Tác'}</span>
                  <h4 className="flower-title">{flower.name}</h4>
                  <div className="card-bottom">
                    <span className="flower-price">{formatVND(flower.price)}</span>
                    <button className="btn-detail" onClick={() => setSelectedProduct(flower)}>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Section */}
      <section className="container">
        <div className="packaging-box">
          <div>
            <span className="section-tag">Quy cách đóng gói (Packaging)</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '14px' }}>
              Hộp Carton Chống Sốc Chuyên Dụng
            </h2>
            <p style={{ marginBottom: '16px', color: 'var(--color-text-body)' }}>
              Để hoa không bị gãy cành hay dập nát khi vận chuyển bằng xe máy, SweetFlora áp dụng quy chuẩn bao bì bảo vệ 3 lớp:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>📦 <strong>Khung định vị đế bó hoa:</strong> Giữ hoa đứng thẳng, chống rung lắc qua ổ gà.</li>
              <li>💧 <strong>Túi giữ ẩm gốc hoa 24h:</strong> Đảm bảo cánh hoa luôn căng mọng tươi mát.</li>
              <li>💌 <strong>Bộ thiệp thiết kế & bì thư ép kim:</strong> In lời chúc cá nhân hóa trang trọng.</li>
              <li>🛡️ <strong>Chính sách bảo hiểm:</strong> Đổi mới hoặc hoàn tiền 100% nếu phát hiện hoa dập nát.</li>
            </ul>
          </div>
          <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" alt="Packaging" style={{ borderRadius: '16px', width: '100%', height: '300px', objectFit: 'cover' }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#FFF', marginBottom: '8px' }}>🌸 SweetFlora</h3>
            <p>Nền tảng Marketplace Hoa tươi hàng đầu với tính năng duyệt ảnh hoa thực tế trước khi giao hàng.</p>
            <small>© 2026 SweetFlora - EXE101 Project by Nhóm Chưa Biết Nhưng Làm</small>
          </div>
          <div>
            <h4>Về Dự Án CP3</h4>
            <ul style={{ listStyle: 'none', marginTop: '10px' }}>
              <li>Thành viên: Phước Thịnh, Duy Minh, Tố Như, Phan Phúc</li>
              <li>Công nghệ: React + PostgreSQL + Docker</li>
              <li>Giảng viên: Thanhntl2@fpt.edu.vn</li>
            </ul>
          </div>
          <div>
            <h4>Cam Kết Chất Lượng</h4>
            <ul style={{ listStyle: 'none', marginTop: '10px' }}>
              <li>Duyệt ảnh thật 100% trước khi ship</li>
              <li>Bảo hiểm hoàn tiền 2H</li>
              <li>Hoa tươi cắt cành Đà Lạt</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ==================== MODALS ==================== */}

      {/* 1. Real-Photo Approval Modal */}
      {isApprovalOpen && (
        <div className="modal-overlay" onClick={() => setIsApprovalOpen(false)}>
          <div className="modal-card modal-large" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsApprovalOpen(false)}>&times;</button>
            <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px' }}>
              🔴 BƯỚC DUYỆT ẢNH HOA THỰC TẾ TRƯỚC KHI GIAO (LIVE DEMO)
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EDE8E1', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>Đơn hàng #SF-8924: Bó Hồng Juliet & Cúc Mẫu Đơn</h3>
                <small style={{ color: 'var(--color-text-body)' }}>Shop: <strong>Phương Floral Boutique (Quận 3)</strong></small>
              </div>
              <span className="countdown-badge">⏱️ Duyệt trong: {timeFormatted}</span>
            </div>

            <div className="comparison-container">
              <div className="comparison-side">
                <div className="comp-badge original">1. Ảnh Mẫu Trên Website</div>
                <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80" alt="Catalog" className="comp-img" />
                <p style={{ textAlign: 'center', fontSize: '0.8rem', padding: '8px', color: '#8E827B' }}>Mẫu hoa bạn đã chọn.</p>
              </div>
              <div className="comparison-side verified">
                <div className="comp-badge live">📸 2. ẢNH THỰC TẾ VỪA CẮM XONG TẠI TIỆM</div>
                <img src={livePhoto} alt="Live Studio" className="comp-img" />
                <p style={{ textAlign: 'center', fontSize: '0.8rem', padding: '8px', color: 'var(--color-sage)', fontWeight: 700 }}>
                  ✓ Đã kiểm định độ nở hoa & độ tươi
                </p>
              </div>
            </div>

            <div className="florist-note-box">
              <span style={{ fontSize: '1.4rem' }}>💬</span>
              <div>
                <strong>Lời nhắn từ thợ cắm hoa:</strong>
                <p style={{ marginTop: '4px' }}>"{floristNote}"</p>
              </div>
            </div>

            {!isApproved ? (
              <div className="approval-actions">
                <button className="btn-secondary" onClick={handleRequestEdit}>
                  ✏️ Yêu cầu chỉnh nơ / hoa phụ
                </button>
                <button className="btn-primary-large btn-approve" onClick={handleApprove}>
                  ✅ Đồng Ý Duyệt Hoa & Cho Shipper Đi Giao
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px', background: '#F0FDF4', borderRadius: '12px' }}>
                <h4 style={{ color: '#166534', fontSize: '1.3rem' }}>🎉 Bạn Đã Duyệt Đơn Hàng Thành Công!</h4>
                <p style={{ margin: '8px 0', color: '#15803D' }}>Đơn hàng đang được đặt vào hộp bảo vệ định vị. Shipper hỏa tốc sẽ giao tới bạn trong 45 phút.</p>
                <p>Mã vận đơn: <strong>{trackingCode}</strong> • Tài xế: <strong>Nguyễn Văn Hưng (0982.xxx.xxx)</strong></p>
                <button className="btn-secondary" style={{ marginTop: '12px' }} onClick={() => setIsApproved(false)}>
                  Thử Lại Demo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Florist Portal Modal */}
      {isFloristOpen && (
        <div className="modal-overlay" onClick={() => setIsFloristOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsFloristOpen(false)}>&times;</button>
            <div style={{ color: 'var(--color-sage)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px' }}>
              🧑‍🌾 GIAO DIỆN DÀNH CHO SHOP HOA ĐỐI TÁC (FLORIST PORTAL)
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)' }}>Gửi Ảnh Thực Tế Bó Hoa Đã Cắm Cho Khách Duyệt</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-body)', margin: '8px 0 16px' }}>
              Giúp shop minh bạch hình ảnh, bảo vệ quyền lợi và không lo khách khiếu nại hoa khác mẫu.
            </p>

            <form onSubmit={handleFloristSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Mã đơn hàng khách đặt:</label>
                <input type="text" readOnly value="#SF-8924 (Khách: Nguyễn Tuấn Anh)" style={{ width: '100%', padding: '8px', background: '#F8F5F0', border: '1px solid #EDE8E1', borderRadius: '6px' }} />
              </div>
              <div 
                style={{ border: '2px dashed #C94A64', padding: '24px', textAlign: 'center', borderRadius: '10px', background: '#FFF8F9', cursor: 'pointer' }}
                onClick={() => {
                  setLivePhoto("https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80");
                  showToast("Đã tải ảnh chụp góc thứ 2 của bó hoa!");
                }}
              >
                <span style={{ fontSize: '2rem' }}>📷</span>
                <p style={{ fontWeight: 600, margin: '6px 0' }}>Bấm để chụp hoặc chọn ảnh thực tế tại tiệm</p>
                <small style={{ color: 'var(--color-primary)' }}>Đã kết nối camera điện thoại của Florist</small>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Lời nhắn gửi kèm:</label>
                <textarea 
                  rows="3" 
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #EDE8E1' }}
                  value={floristNote}
                  onChange={(e) => setFloristNote(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary-large btn-approve" style={{ width: '100%' }}>
                🚀 Gửi Ảnh Hoa Qua App Cho Khách Duyệt Ngay
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card" style={{ maxWidth: '720px' }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <img src={selectedProduct.image_url} alt="" style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  {selectedProduct.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: '6px 0' }}>{selectedProduct.name}</h3>
                <small style={{ color: '#8E827B' }}>Cung cấp bởi: <strong>{selectedProduct.florist_name}</strong></small>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '10px 0' }}>
                  {formatVND(selectedProduct.price)}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-body)', marginBottom: '14px' }}>
                  {selectedProduct.description}
                </p>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    ✍️ Lời chúc thiệp viết tay (Miễn phí):
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ví dụ: Chúc em sinh nhật vui vẻ..." 
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #EDE8E1', borderRadius: '6px' }}
                  />
                </div>

                <button className="btn-primary-large btn-approve" style={{ width: '100%' }} onClick={handleAddToCart}>
                  🛒 Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Cart Modal */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCartOpen(false)}>&times;</button>
            <h3 style={{ fontFamily: 'var(--font-heading)' }}>Giỏ Hàng Của Bạn</h3>
            
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '30px', color: '#8E827B' }}>Giỏ hàng chưa có bó hoa nào.</p>
            ) : (
              <div style={{ margin: '16px 0' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #EDE8E1' }}>
                    <div>
                      <strong>{item.name}</strong><br />
                      <small style={{ color: 'var(--color-primary)' }}>Thiệp: {item.giftNote || 'Không có'}</small>
                    </div>
                    <strong>{formatVND(item.price)}</strong>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '1.2rem', fontWeight: 700 }}>
                  <span>Tổng thanh toán:</span>
                  <span style={{ color: 'var(--color-primary-dark)' }}>
                    {formatVND(cart.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </div>
                <button className="btn-primary-large btn-approve" style={{ width: '100%', marginTop: '16px' }} onClick={handleCheckout}>
                  Tiến Hành Đặt Hàng & Nhận Mã Theo Dõi
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
