import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { SkipLink } from './components/common/SkipLink';
import { ScrollToTop } from './utils/ScrollToTop';
import ScrollToTopButton from './components/common/ScrollToTopButton';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const WhyUsPage = React.lazy(() =>
  import('./pages/WhyUsPage').then(m => ({ default: m.WhyUsPage }))
);
const ProductsPage = React.lazy(() =>
  import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage }))
);
const SolutionsPage = React.lazy(() =>
  import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage }))
);
const PricingPage = React.lazy(() =>
  import('./pages/PricingPage').then(m => ({ default: m.PricingPage }))
);
const ResourcesPage = React.lazy(() =>
  import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/AboutPage').then(m => ({ default: m.AboutPage }))
);
const ContactPage = React.lazy(() =>
  import('./pages/ContactPage').then(m => ({ default: m.ContactPage }))
);

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <LoadingSpinner size="lg" text="Loading page..." />
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HashRouter>
          <SkipLink />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
            <Header />
            <main id="main-content" className="flex-grow" role="main">
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/why-us" element={<WhyUsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:slug" element={<ProductsPage />} />
                    <Route path="/products/:slug/:item" element={<ProductsPage />} />
                    <Route path="/solutions" element={<SolutionsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </HashRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
