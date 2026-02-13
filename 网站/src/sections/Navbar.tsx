import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  variant?: 'home' | 'detail';
}

const Navbar = ({ variant = 'home' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#hero' },
    { name: '关于我们', href: '#about' },
    { name: '产品类别', href: '#products' },
    { name: '我们的优势', href: '#advantages' },
    { name: '联系我们', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    if (variant === 'detail') {
      // 如果是详情页，先跳转到首页，再滚动
      navigate('/');
      setTimeout(() => {
        scrollToSection(href);
      }, 100);
    } else {
      scrollToSection(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-impact ${
        isScrolled || variant === 'detail'
          ? 'bg-[#1a1a1a]/90 backdrop-blur-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-[#e03000] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              宏瑞防弹玻璃
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-white/80 hover:text-white text-sm font-medium underline-expand transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="tel:13640923911"
              className="px-6 py-2.5 bg-[#e03000] text-white text-sm font-medium rounded-lg hover:bg-[#c02800] transition-colors duration-300"
            >
              立即咨询
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-md transition-all duration-500 ease-impact overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-padding py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-white/80 hover:text-white text-base font-medium py-2 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
            >
              {link.name}
            </button>
          ))}
          <a
            href="tel:13640923911"
            className="px-6 py-3 bg-[#e03000] text-white text-center font-medium rounded-lg hover:bg-[#c02800] transition-colors duration-300 mt-2"
          >
            立即咨询
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
