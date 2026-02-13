import { useEffect, useRef, useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../data/products';

const ProductCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const products = getAllProducts();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'F56级':
        return '#1a1a1a';
      case 'FJ79级':
        return '#8B0000';
      case 'F79级':
        return '#e03000';
      case 'F54级':
        return '#0066cc';
      case 'F64级':
      default:
        return '#00aa66';
    }
  };

  return (
    <section
      id="product-levels"
      ref={sectionRef}
      className="relative w-full bg-[#f5f5f5] pt-24 pb-12 lg:pt-32 lg:pb-16"
    >
      <div className="w-full section-padding">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-impact ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
        >
          <div className="inline-block px-4 py-2 bg-[#e03000]/10 text-[#e03000] text-sm font-medium rounded-full mb-6">
            防护等级
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4">
            选择适合的防护等级
          </h2>
          <p className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto">
            我们提供从F64到F56多种防护等级，满足不同场景的安全需求
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 ease-impact hover:-translate-y-2 cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Level Badge */}
              <div
                className="absolute -top-3 right-6 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
                style={{ backgroundColor: getLevelColor(product.level) }}
              >
                {product.level}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${getLevelColor(product.level)}15` }}
              >
                <Shield
                  className="w-7 h-7"
                  style={{ color: getLevelColor(product.level) }}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-[#1a1a1a]/50 mb-2">{product.subtitle}</p>
              <p className="text-sm text-[#1a1a1a]/60 mb-6 line-clamp-2">
                {product.shortDescription}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#e03000] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                查看详情
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#e03000]/20 transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#1a1a1a]/40">
            点击卡片查看详细技术参数和产品特点
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
