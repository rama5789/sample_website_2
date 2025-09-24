import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './utils/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ProductsPage } from './pages/ProductsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PricingPage } from './pages/PricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/why-us" element={<WhyUsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/solutions" element={<SolutionsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
