import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/c199a2ae-1f19-475e-ab37-9bd5411d4f01.png" 
                alt="Tour Der Wang Logo" 
                className="h-8 w-auto brightness-0 invert"
              />
              <div>
                <h2 className="text-lg font-bold">Tour Der Wang</h2>
                <p className="text-sm opacity-90">ที่นี่ วังสามหมอ</p>
              </div>
            </Link>
            <p className="text-sm opacity-90 leading-relaxed">
              Discover the hidden gems of Wang Sam Mo, Udon Thani. From ancient temples to local cuisine, 
              explore authentic Thai culture and create unforgettable memories.
            </p>
            <p className="text-sm opacity-90 leading-relaxed">
              ค้นพบอัญมณีที่ซ่อนอยู่ของวังสามหมอ อุดรธานี จากวัดโบราณไปจนถึงอาหารท้องถิ่น 
              สำรวจวัฒนธรรมไทยแท้และสร้างความทรงจำที่ไม่รู้ลืม
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links / ลิงก์ด่วน</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/attractions" className="text-sm hover:opacity-80 transition-opacity">
                Attractions / สถานที่ท่องเที่ยว
              </Link>
              <Link to="/restaurants" className="text-sm hover:opacity-80 transition-opacity">
                Restaurants / ร้านอาหาร
              </Link>
              <Link to="/services" className="text-sm hover:opacity-80 transition-opacity">
                Services / บริการ
              </Link>
              <Link to="/jobs" className="text-sm hover:opacity-80 transition-opacity">
                Jobs / หางาน
              </Link>
              <Link to="/about" className="text-sm hover:opacity-80 transition-opacity">
                About / เกี่ยวกับเรา
              </Link>
              <Link to="/privacy" className="text-sm hover:opacity-80 transition-opacity">
                Privacy Policy / นโยบายความเป็นส่วนตัว
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us / ติดต่อเรา</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 opacity-90" />
                <div className="text-sm">
                  <p>Wang Sam Mo Subdistrict</p>
                  <p>Udon Thani Province 41160</p>
                  <p className="text-xs opacity-75 mt-1">
                    ตำบลวังสามหมอ อำเภอเมืองอุดรธานี จังหวัดอุดรธานี 41160
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 opacity-90" />
                <div className="text-sm">
                  <p>+66 XX XXX XXXX</p>
                  <p className="text-xs opacity-75">Available 24/7 / เปิดให้บริการตลอด 24 ชั่วโมง</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 opacity-90" />
                <div className="text-sm">
                  <p>info@tourderwang.com</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-3">Follow Us / ติดตามเรา</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/tourderwang" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com/tourderwang" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            © 2024 Tour Der Wang. All rights reserved. / สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <p className="text-xs opacity-60 mt-2">
            Promoting sustainable tourism in Wang Sam Mo, Udon Thani / 
            ส่งเสริมการท่องเที่ยวอย่างยั่งยืนในวังสามหมอ อุดรธานี
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;