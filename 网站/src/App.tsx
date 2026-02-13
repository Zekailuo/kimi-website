import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import Advantages from './sections/Advantages';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ProductDetail from './sections/ProductDetail';
import ProductCards from './sections/ProductCards';
import { getProductById, getAllProducts } from './data/products';

// 在全局层面禁用滚动恢复 - 立即执行
(function disableScrollRestoration() {
  if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (typeof window !== 'undefined') {
    self.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.documentElement.style.scrollBehavior = 'auto';
  }
})();

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 禁用浏览器的恢复滚动位置功能
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // 强制滚动到顶部 - 使用 requestAnimationFrame 确保在下一帧执行
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

// Home page component
const HomePage = () => (
  <div className="relative min-h-screen bg-[#1a1a1a]">
    {/* Noise texture overlay */}
    <div className="noise-overlay" />

    {/* Navigation */}
    <Navbar variant="home" />

    {/* Main Content */}
    <main>
      <Hero />
      <About />
      <Products />
      <ProductCards />
      <Advantages />
      <Contact />
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

// Product detail page wrapper
const ProductPage = ({ productId }: { productId: string }) => {
  const product = getProductById(productId);

  // 在渲染内容前再次确保滚动位置
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  if (!product) return <div>Product not found</div>;
  return <ProductDetail product={product} />;
};

// Router wrapper to include ScrollToTop
const AppContent = () => {
  const products = getAllProducts();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Product detail pages */}
        {products.map((product) => (
          <Route
            key={product.id}
            path={`/product/${product.id}`}
            element={<ProductPage productId={product.id} />}
          />
        ))}
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
