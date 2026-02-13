import { useEffect, useRef, useState } from 'react';
import { Check, FileText, Award, Phone } from 'lucide-react';
import Navbar from './Navbar';

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductFeature {
  title: string;
  description: string;
}

interface ProductApplication {
  icon: string;
  title: string;
}

interface ProductData {
  id: string;
  name: string;
  level: string;
  subtitle: string;
  description: string;
  image: string;
  specs: ProductSpec[];
  features: ProductFeature[];
  applications: ProductApplication[];
  certifications: string[];
}

interface ProductDetailProps {
  product: ProductData;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications'>('specs');
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

  // Scroll to top on component mount - instant scroll without animation
  useEffect(() => {
    // 禁用平滑滚动，立即跳到顶部
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // 恢复平滑滚动
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
  }, []);

  const tabs = [
    { id: 'specs', label: '技术参数' },
    { id: 'features', label: '产品特点' },
    { id: 'applications', label: '应用场景' },
  ] as const;

  return (
    <div className="relative min-h-screen bg-[#1a1a1a]">
      {/* Navigation - 使用完整的Navbar */}
      <Navbar variant="detail" />

      {/* Hero Section */}
      <section ref={sectionRef} className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div
              className={`transition-all duration-1000 ease-impact ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 to-transparent" />

                {/* Level Badge */}
                <div className="absolute top-4 left-4 bg-[#e03000] text-white px-4 py-2 rounded-lg font-bold">
                  {product.level}
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div
              className={`transition-all duration-1000 ease-impact delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              <div className="inline-block px-4 py-2 bg-[#e03000]/20 text-[#e03000] text-sm font-medium rounded-full mb-6">
                防护等级产品
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {product.name}
              </h1>

              <p className="text-xl text-white/60 mb-6">{product.subtitle}</p>

              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:13640923911"
                  className="px-8 py-3 bg-[#e03000] text-white font-medium rounded-lg hover:bg-[#c02800] transition-colors duration-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  立即咨询
                </a>
                <a
                  href="tel:13640923911"
                  className="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  电话咨询
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="w-full section-padding">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#e03000] text-white'
                    : 'bg-white text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-8 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#e03000]" />
                  技术参数
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#f5f5f5] rounded-xl"
                    >
                      <span className="text-[#1a1a1a]/60">{spec.label}</span>
                      <span className="font-semibold text-[#1a1a1a]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-[#e03000]/10 rounded-xl flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-[#e03000]" />
                    </div>
                    <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-[#1a1a1a]/60 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.applications.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 bg-[#e03000]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{app.icon}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#1a1a1a]">{app.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="w-full section-padding">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">认证标准</h3>
            <p className="text-white/60">符合国家和国际防弹玻璃标准</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {product.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full"
              >
                <Award className="w-5 h-5 text-[#e03000]" />
                <span className="text-white font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#e03000]">
        <div className="w-full section-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            需要{product.name}？
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            联系我们的专业团队，获取详细的产品资料和报价方案
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:13640923911"
              className="px-8 py-3 bg-white text-[#e03000] font-medium rounded-lg hover:bg-white/90 transition-colors duration-300"
            >
              立即咨询
            </a>
            <a
              href="tel:13640923911"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              电话咨询
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
