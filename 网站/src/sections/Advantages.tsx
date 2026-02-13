import { useEffect, useRef, useState } from 'react';
import { Check, Clock, Settings, Truck, Award, Headphones } from 'lucide-react';

const Advantages = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
        const newIndex = Math.min(5, Math.floor(scrollProgress * 6));
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const advantages = [
    {
      icon: Award,
      title: '国际认证',
      description: '产品通过GA165-2016《防弹透明材料》国家标准认证，以及EN 1063、UL 752等国际标准认证，质量可靠有保障。',
    },
    {
      icon: Settings,
      title: '定制解决方案',
      description: '根据客户的具体需求，提供从设计、生产到安装的一站式定制服务，满足不同场景的安全防护要求。',
    },
    {
      icon: Truck,
      title: '快速交付',
      description: '拥有先进的生产线和充足的库存，标准产品7天内交付，定制产品15-30天交付，确保项目进度。',
    },
    {
      icon: Check,
      title: '严格质检',
      description: '每块防弹玻璃都经过严格的弹道测试、光学测试和环境测试，确保产品性能稳定可靠。',
    },
    {
      icon: Clock,
      title: '售后保障',
      description: '提供5年质量保证，24小时响应客户需求，专业团队提供技术支持和维护服务。',
    },
    {
      icon: Headphones,
      title: '专业咨询',
      description: '拥有专业的技术顾问团队，为客户提供防弹玻璃选型、安装方案设计等全方位咨询服务。',
    },
  ];

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="relative w-full bg-[#f5f5f5]"
    >
      <div className="w-full section-padding pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Sticky Image */}
          <div className="relative">
            <div className="lg:sticky lg:top-32">
              <div
                className={`relative aspect-video rounded-2xl overflow-hidden transition-all duration-1000 ease-impact ${isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
                  }`}
              >
                <img
                  src="/images/company/workshop.jpg"
                  alt="防弹玻璃优势"
                  className="w-full h-full object-cover"
                  style={{
                    transform: `rotate(${(activeIndex - 2.5) * 0.5}deg)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a1a]/30 to-transparent" />
              </div>

              {/* Stats cards */}
              <div
                className={`grid grid-cols-3 gap-4 mt-6 transition-all duration-1000 ease-impact delay-300 ${isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
                  }`}
              >
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-[#e03000]">99%</div>
                  <div className="text-xs text-[#1a1a1a]/60">合格率</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-[#e03000]">7天</div>
                  <div className="text-xs text-[#1a1a1a]/60">快速交付</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-[#e03000]">5年</div>
                  <div className="text-xs text-[#1a1a1a]/60">质保期</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Advantages List */}
          <div>
            <div
              className={`mb-12 transition-all duration-1000 ease-impact ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
                }`}
            >
              <div className="inline-block px-4 py-2 bg-[#e03000]/10 text-[#e03000] text-sm font-medium rounded-full mb-6">
                我们的优势
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4">
                为什么选择我们
              </h2>
              <p className="text-lg text-[#1a1a1a]/60">
                多年行业经验，专业品质保障，为您提供最可靠的防弹玻璃解决方案
              </p>
            </div>

            {/* Advantages List */}
            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <div
                  key={advantage.title}
                  className={`group p-6 rounded-xl transition-all duration-500 ease-impact cursor-pointer ${activeIndex === index
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                    } ${isVisible
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-12 opacity-0'
                    }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${activeIndex === index
                        ? 'bg-[#e03000]'
                        : 'bg-[#e03000]/10 group-hover:bg-[#e03000]/20'
                        }`}
                    >
                      <advantage.icon
                        className={`w-6 h-6 transition-colors duration-300 ${activeIndex === index
                          ? 'text-white'
                          : 'text-[#e03000]'
                          }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold mb-2 transition-colors duration-300 ${activeIndex === index
                          ? 'text-[#e03000]'
                          : 'text-[#1a1a1a]'
                          }`}
                      >
                        {advantage.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed transition-all duration-500 ${activeIndex === index
                          ? 'text-[#1a1a1a]/70 max-h-40 opacity-100'
                          : 'text-[#1a1a1a]/50 max-h-0 lg:max-h-40 overflow-hidden lg:opacity-100 opacity-0'
                          }`}
                      >
                        {advantage.description}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index
                        ? 'bg-[#e03000] scale-100'
                        : 'bg-[#e03000]/20 scale-0'
                        }`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
