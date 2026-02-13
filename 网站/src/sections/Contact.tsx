import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: '公司地址',
      content: '河南省新乡市高新技术产业开发区',
    },
    {
      icon: Phone,
      title: '联系电话',
      content: '13640923911',
    },
    {
      icon: Mail,
      title: '电子邮箱',
      content: '506107509@qq.com',
    },
    {
      icon: Clock,
      title: '工作时间',
      content: '周一至周六 8:00-18:00',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#1a1a1a]"
    >
      <div className="w-full section-padding py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0">
          {/* Left Column - Image & Info */}
          <div
            className={`relative transition-all duration-1000 ease-impact ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl lg:rounded-none lg:rounded-r-2xl overflow-hidden">
              <img
                src="/images/contact-factory.jpg"
                alt="联系我们"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/50 to-transparent" />
              
              {/* Contact Info Overlay */}
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-[#e03000]/20 text-[#e03000] text-sm font-medium rounded-full mb-4">
                    联系我们
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                    获取专业咨询
                  </h2>
                  <p className="text-white/70 max-w-md">
                    我们的专业团队随时为您提供防弹玻璃选型、安装方案设计等全方位咨询服务
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.title}
                      className={`flex items-start gap-3 transition-all duration-700 ease-impact ${
                        isVisible
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className="w-10 h-10 bg-[#e03000]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-[#e03000]" />
                      </div>
                      <div>
                        <div className="text-sm text-white/50 mb-1">
                          {info.title}
                        </div>
                        <div className="text-sm text-white font-medium">
                          {info.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`flex items-center justify-center transition-all duration-1000 ease-impact delay-200 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-12 opacity-0'
            }`}
          >
            <div
              className={`w-full max-w-lg p-8 rounded-2xl transition-all duration-500 ${
                focusedField
                  ? 'glass-card glow-red'
                  : 'glass-card'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                在线咨询
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#e03000]/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#e03000]" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    提交成功
                  </h4>
                  <p className="text-white/60">
                    我们会尽快与您联系，感谢您的咨询！
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        姓名
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#e03000] transition-colors duration-300"
                        placeholder="您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        电话
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#e03000] transition-colors duration-300"
                        placeholder="联系电话"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#e03000] transition-colors duration-300"
                      placeholder="您的邮箱地址"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      留言
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#e03000] transition-colors duration-300 resize-none"
                      placeholder="请描述您的需求..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#e03000] text-white font-medium rounded-lg hover:bg-[#c02800] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed liquid-fill"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        提交中...
                      </>
                    ) : (
                      <>
                        提交咨询
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
