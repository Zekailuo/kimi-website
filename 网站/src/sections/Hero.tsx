import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#1a1a1a] overflow-hidden flex items-center"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(224, 48, 0, 0.08) 0%, transparent 50%), #1a1a1a`,
      }}
    >
      {/* Content Container */}
      <div className="w-full section-padding pt-24 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center py-12 lg:py-0">
            <div className="overflow-hidden">
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight transition-all duration-1000 ease-impact ${isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
                  }`}
              >
                防弹玻璃
                <br />
                <span className="text-[#e03000]">解决方案</span>
              </h1>
            </div>

            <div className="overflow-hidden mt-6">
              <p
                className={`text-lg sm:text-xl text-white/70 max-w-lg transition-all duration-1000 ease-impact delay-300 ${isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
                  }`}
              >
                为汽车、建筑及安全领域提供尖端防护。
                <br className="hidden sm:block" />
                专业制造符合国际标准的防弹玻璃产品。
              </p>
            </div>

            <div
              className={`flex flex-wrap gap-4 mt-10 transition-all duration-1000 ease-impact delay-500 ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
                }`}
            >
              <button
                onClick={scrollToProducts}
                className="group px-8 py-4 bg-[#e03000] text-white font-medium rounded-lg hover:bg-[#c02800] transition-all duration-300 flex items-center gap-3"
              >
                探索我们的解决方案
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToAbout}
                className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                了解更多
              </button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 mb-20 sm:mb-0 transition-all duration-1000 ease-impact delay-700 ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
                }`}
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#e03000]">
                  20+
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 mt-1 uppercase tracking-wider">行业经验</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#e03000]">
                  6
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 mt-1 uppercase tracking-wider">防护等级</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#e03000]">
                  1000+
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 mt-1 uppercase tracking-wider">成功案例</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end lg:mt-24">
            <div
              className={`relative w-full max-w-md lg:max-w-lg xl:max-w-xl transition-all duration-1200 ease-glass delay-300 overflow-hidden rounded-2xl ${isVisible
                ? 'clip-path-full opacity-100'
                : 'clip-path-zero opacity-0'
                }`}
              style={{
                clipPath: isVisible
                  ? 'inset(0 0 0 0)'
                  : 'inset(0 100% 0 0)',
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/images/hero-glass.jpg"
                  alt="防弹玻璃产品"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div
                className={`absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#e03000] text-white px-5 py-3 sm:px-6 sm:py-4 rounded-xl shadow-2xl transition-all duration-1000 ease-impact delay-1000 ${isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
                  }`}
              >
                <div className="text-xl sm:text-2xl font-bold">GA165-2016</div>
                <div className="text-xs sm:text-sm text-white/80">国标认证</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-impact delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm">向下滚动</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
