import { Shield, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: '首页', href: '#hero' },
    { name: '关于我们', href: '#about' },
    { name: '产品类别', href: '#products' },
    { name: '我们的优势', href: '#advantages' },
    { name: '联系我们', href: '#contact' },
  ];

  const products = [
    { name: '汽车防弹玻璃', href: '#products' },
    { name: '建筑防弹玻璃', href: '#products' },
    { name: '特种防弹玻璃', href: '#products' },
    { name: '定制解决方案', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#1a1a1a] border-t border-white/5">
      <div className="w-full section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#e03000] rounded-lg flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">
                  宏瑞防弹玻璃
                </div>
                <div className="text-white/50 text-xs">
                  HONGRUI ARMOR GLASS
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              新乡市宏瑞防弹玻璃股份有限公司，专业研发和生产符合国际标准的防弹玻璃产品，为金融、安防、军事等领域提供可靠的防护解决方案。
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="w-10 h-10 bg-white/5 hover:bg-[#e03000] rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="w-10 h-10 bg-white/5 hover:bg-[#e03000] rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="w-10 h-10 bg-white/5 hover:bg-[#e03000] rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">快速链接</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-[#e03000] text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">产品中心</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(product.href);
                    }}
                    className="text-white/60 hover:text-[#e03000] text-sm transition-colors duration-300"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">联系方式</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e03000] flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  河南省新乡市高新技术产业开发区
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#e03000] flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  13640923911
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#e03000] flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  506107509@qq.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © 2024 新乡市宏瑞防弹玻璃股份有限公司 版权所有
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-300">
              隐私政策
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-300">
              服务条款
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#e03000] hover:bg-[#c02800] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="返回顶部"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </footer>
  );
};

export default Footer;
