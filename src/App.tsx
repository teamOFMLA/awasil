import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { Navbar } from './components/Navbar';
import { AboutView, HomeView, ServicesView } from './components/PageViews';
import { ProjectsGallery } from './components/ProjectsGallery';
import { QuoteSection } from './components/QuoteSection';
import {
  CITY_DISTRICTS,
  COMPANY_INFO,
  EstimateTransferData,
  InsulationSystemId,
  PageRoute,
  ProjectItem,
} from './data/companyData';

const PAGE_TITLES: Record<PageRoute, string> = {
  home: `${COMPANY_INFO.brandName} للعوازل | حلول العزل المائي والحراري في جدة ومكة`,
  services: `الخدمات الهندسية | ${COMPANY_INFO.brandName} للعوازل`,
  projects: `معرض المشاريع المنجزة | ${COMPANY_INFO.brandName}`,
  about: `عن الشركة والضمان | ${COMPANY_INFO.brandName}`,
  contact: `طلب عرض سعر ومعاينة مجانية | ${COMPANY_INFO.brandName}`,
};

const ROUTE_TO_PATH: Record<PageRoute, string> = {
  home: '/',
  services: '/services',
  projects: '/projects',
  about: '/about',
  contact: '/contact',
};

function parseRouteFromLocation(): PageRoute {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '') as PageRoute;
  if (path && path in PAGE_TITLES) {
    return path;
  }
  const hash = window.location.hash.replace('#', '') as PageRoute;
  if (hash && hash in PAGE_TITLES) {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>(() =>
    typeof window !== 'undefined' ? parseRouteFromLocation() : 'home'
  );
  const [prefillEstimate, setPrefillEstimate] =
    useState<EstimateTransferData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    document.title = PAGE_TITLES[activePage];

    const currentUrl = window.location.origin + ROUTE_TO_PATH[activePage];
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', currentUrl);
  }, [activePage]);

  useEffect(() => {
    const onLocationChange = () => {
      setActivePage(parseRouteFromLocation());
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const navigateTo = (page: PageRoute) => {
    setActivePage(page);
    setIsLightboxOpen(false);
    const targetPath = ROUTE_TO_PATH[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForQuote = (systemId: InsulationSystemId) => {
    setPrefillEstimate({
      systemId,
      city: 'جدة',
      district: CITY_DISTRICTS['جدة'][0],
      propertyType:
        systemId === 'warehouse'
          ? 'صناعي / هنجر'
          : systemId === 'tanks'
          ? 'خزان / مسبح'
          : 'سكني',
      areaSqm:
        systemId === 'warehouse' ? 1000 : systemId === 'tanks' ? 120 : 350,
    });
    navigateTo('contact');
  };

  const handleSelectProjectForQuote = (project: ProjectItem) => {
    setPrefillEstimate({
      systemId: project.category,
      city: project.city,
      district: CITY_DISTRICTS[project.city][0],
      propertyType:
        project.category === 'warehouse'
          ? 'صناعي / هنجر'
          : project.category === 'tanks'
          ? 'خزان / مسبح'
          : 'سكني',
      areaSqm: project.areaSqm,
    });
    navigateTo('contact');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0B162C] focus:text-white focus:text-xs focus:font-bold"
        >
          تخطي إلى المحتوى الرئيسي
        </a>

        <Navbar
          activePage={activePage}
          onNavigate={navigateTo}
          onMenuOpenChange={setIsMobileMenuOpen}
        />

        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {activePage === 'home' && (
                <HomeView
                  onNavigate={navigateTo}
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                  onSelectProjectForQuote={handleSelectProjectForQuote}
                  onLightboxChange={setIsLightboxOpen}
                  prefillEstimate={prefillEstimate}
                />
              )}

              {activePage === 'services' && (
                <ServicesView
                  onNavigate={navigateTo}
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                />
              )}

              {activePage === 'projects' && (
                <div className="bg-[#F8FAFC] py-10 sm:py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="max-w-3xl space-y-3">
                      <nav
                        aria-label="مسار التنقل"
                        className="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <button
                          type="button"
                          onClick={() => navigateTo('home')}
                          className="hover:text-[#0B162C] transition-colors cursor-pointer"
                        >
                          الرئيسية
                        </button>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#B0852B] font-semibold">
                          سجل المشاريع
                        </span>
                      </nav>
                      <h1 className="text-3xl sm:text-4xl font-bold text-[#0B162C]">
                        معرض مشاريع العزل المنجزة في جدة ومكة
                      </h1>
                      <p className="text-base text-slate-600 leading-relaxed">
                        استعرض نماذج من مشاريع الفلل السكنية والمباني التجارية
                        والمستودعات والخزانات المصنفة حسب نظام العزل المستخدم.
                      </p>
                    </div>
                    <ProjectsGallery
                      onRequestSimilar={handleSelectProjectForQuote}
                      onLightboxChange={setIsLightboxOpen}
                    />
                  </div>
                </div>
              )}

              {activePage === 'about' && <AboutView onNavigate={navigateTo} />}

              {activePage === 'contact' && (
                <div className="bg-[#F8FAFC] py-10 sm:py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="max-w-3xl space-y-3">
                      <nav
                        aria-label="مسار التنقل"
                        className="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <button
                          type="button"
                          onClick={() => navigateTo('home')}
                          className="hover:text-[#0B162C] transition-colors cursor-pointer"
                        >
                          الرئيسية
                        </button>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#B0852B] font-semibold">
                          طلب عرض سعر ومعاينة
                        </span>
                      </nav>
                      <h1 className="text-3xl sm:text-4xl font-bold text-[#0B162C]">
                        تواصل مع الفريق الهندسي لشركة بصمة إتقان
                      </h1>
                      <p className="text-base text-slate-600 leading-relaxed">
                        أكمل البيانات أدناه ليتم تجهيز ملخص منسق وإرساله مباشرة
                        عبر واتساب لجدولة المعاينة المجانية في جدة أو مكة
                        المكرمة.
                      </p>
                    </div>
                    <QuoteSection prefillEstimate={prefillEstimate} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigateTo} />

        <MobileActionBar
          visible={!isMobileMenuOpen && !isLightboxOpen}
          activePage={activePage}
          onRequestQuote={navigateTo}
        />
      </div>
    </MotionConfig>
  );
}
