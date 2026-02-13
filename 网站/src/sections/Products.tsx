import { useEffect, useRef, useState } from 'react';
import { Car, Building2, Shield } from 'lucide-react';

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePanel, setActivePanel] = useState<number | null>(null);
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

  const products = [
    {
      id: 1,
      icon: Car,
      title: '汽车防弹玻璃',
      subtitle: 'Vehicle Armor Glass',
      description:
        '专为高端轿车、商务车、装甲车设计的防弹玻璃，具有轻量化、高透光、抗冲击等特点。符合GA165-2016标准，防护等级可达F79级。',
      features: ['轻量化设计', '高透光率', '抗紫外线', '快速安装'],
      image: '/images/product-f79-1.jpg',
      color: '#e03000',
    },
    {
      id: 2,
      icon: Building2,
      title: '建筑防弹玻璃',
      subtitle: 'Architectural Armor Glass',
      description:
        '适用于银行、珠宝店、政府机构、高档商业建筑等场所。提供从F64级到F56级的多种防护等级选择，兼具美观与安全性。',
      features: ['大尺寸定制', '隔音隔热', '防砸防盗', '美观透明'],
      image: '/images/product-f54-2.jpg',
      color: '#0066cc',
    },
    {
      id: 3,
      icon: Shield,
      title: '特种防弹玻璃',
      subtitle: 'Specialty Armor Glass',
      description:
        '包括防爆防弹一体玻璃、防弹防紫外线玻璃、电加热防弹玻璃等特殊用途产品，满足军事、航空、船舶等特殊领域需求。',
      features: ['防爆防弹', '电加热除雾', '防紫外线', '定制化设计'],
      image: '/images/product-f56-1.jpg',
      color: '#00aa66',
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full bg-[#1a1a1a] py-24 lg:py-32"
    >
      {/* Section Header */}
      <div className="w-full section-padding mb-16">
        <div
          className={`transition-all duration-1000 ease-impact ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-[#e03000]/20 text-[#e03000] text-sm font-medium rounded-full mb-6">
            产品类别
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            全方位防护解决方案
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            我们提供多种类型的防弹玻璃产品，满足不同场景的安全防护需求
          </p>
        </div>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden lg:block w-full section-padding">
        <div className="flex gap-4 h-[500px]">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-glass ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{
                flex:
                  activePanel === product.id
                    ? '2.5'
                    : activePanel !== null
                    ? '0.75'
                    : '1',
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setActivePanel(product.id)}
              onMouseLeave={() => setActivePanel(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-glass ${
                    activePanel === product.id ? 'scale-100' : 'scale-110'
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activePanel === product.id
                      ? 'bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-transparent'
                      : 'bg-[#1a1a1a]/60'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500`}
                  style={{ backgroundColor: product.color }}
                >
                  <product.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title - Always horizontal */}
                <div
                  className={`transition-all duration-500 ease-glass`}
                >
                  <h3 className="text-2xl font-bold text-white whitespace-nowrap">
                    {product.title}
                  </h3>
                  <p
                    className={`text-sm text-white/60 mt-1 transition-all duration-500 ${
                      activePanel === product.id
                        ? 'opacity-100 max-h-10'
                        : 'opacity-0 max-h-0'
                    }`}
                  >
                    {product.subtitle}
                  </p>
                </div>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-glass ${
                    activePanel === product.id
                      ? 'max-h-96 opacity-100 mt-6'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* {feature} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden w-full section-padding">
        <div className="flex flex-col gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`relative rounded-2xl overflow-hidden transition-all duration-700 ease-impact ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Background Image */}
              <div className="relative aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: product.color }}
                >
                  <product.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  {product.subtitle}
                </p>

                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
