import { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, Target } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [maskRadius, setMaskRadius] = useState(50);
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
        const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        const newRadius = 50 - scrollProgress * 30;
        setMaskRadius(Math.max(20, newRadius));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Award,
      title: '国际认证',
      description: '通过GA165-2016国标认证，产品质量达到国际先进水平',
    },
    {
      icon: Users,
      title: '专业团队',
      description: '拥有20年行业经验的研发和生产团队',
    },
    {
      icon: Globe,
      title: '全国服务',
      description: '业务覆盖全国，提供上门安装和售后服务',
    },
    {
      icon: Target,
      title: '定制方案',
      description: '根据客户需求提供个性化防弹玻璃解决方案',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#f5f5f5] py-24 lg:py-32"
    >
      <div className="w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div
            className={`relative transition-all duration-1000 ease-impact ${isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-12 opacity-0'
              }`}
          >
            <div
              className="relative aspect-video overflow-hidden"
              style={{
                borderRadius: `${maskRadius}px`,
                transition: 'border-radius 0.3s ease-out',
              }}
            >
              <img
                src="/images/company/factory.jpg"
                alt="宏瑞防弹玻璃工厂"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-8 bg-[#1a1a1a] text-white px-6 py-4 sm:px-8 sm:py-6 rounded-xl shadow-2xl">
              <div className="text-3xl sm:text-4xl font-bold text-[#e03000]">20+</div>
              <div className="text-xs sm:text-sm text-white/70">年专业经验</div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div
            className={`transition-all duration-1000 ease-impact delay-200 ${isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-12 opacity-0'
              }`}
          >
            <div className="inline-block px-4 py-2 bg-[#e03000]/10 text-[#e03000] text-sm font-medium rounded-full mb-6">
              关于我们
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-6">
              专业防弹玻璃
              <br />
              制造商
            </h2>

            <p className="text-lg text-[#1a1a1a]/70 leading-relaxed mb-8">
              新乡市宏瑞防弹玻璃股份有限公司专注于研发和生产符合国际标准的防弹玻璃，
              为金融、安防、军事等领域提供可靠的防护解决方案。我们拥有先进的生产设备
              和严格的质量控制体系，确保每一块防弹玻璃都达到最高标准。
            </p>

            <p className="text-base text-[#1a1a1a]/60 leading-relaxed mb-10">
              公司产品涵盖汽车防弹玻璃、建筑防弹玻璃、特种防弹玻璃等多个系列，
              防护等级从F64级到F56级，满足不同客户的安全需求。
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-4 transition-all duration-700 ease-impact ${isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                    }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-[#e03000]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#e03000]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/60">
                      {feature.description}
                    </p>
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

export default About;
