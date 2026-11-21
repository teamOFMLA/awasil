import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO, PageRoute } from '../data/companyData';

interface NavbarProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onMenuOpenChange?: (isOpen: boolean) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'services', label: 'الخدمات' },
  { id: 'projects', label: 'المشاريع' },
  { id: 'about', label: 'عن الشركة' },
];

export function Navbar({
  activePage,
  onNavigate,
  onMenuOpenChange,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateMobileOpen = (next: boolean) => {
    setMobileOpen(next);
    onMenuOpenChange?.(next);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        updateMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleSelect = (page: PageRoute) => {
    onNavigate(page);
    updateMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home');
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-[#0B162C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C89B3C]"
        >
          {COMPANY_INFO.brandName}
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C89B3C] ${
                  isActive
                    ? 'text-[#0B162C] font-semibold'
                    : 'text-slate-600 hover:text-[#0B162C]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-bar"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-[#C89B3C]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#13294B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]"
          >
            اطلب عرض سعر
          </button>

          <button
            type="button"
            onClick={() => updateMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-[#0B162C] hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2"
        >
          <nav aria-label="قائمة الجوال" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0B162C] text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleSelect('contact')}
              className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-[#C89B3C] text-[#0B162C] hover:bg-[#b88c31] transition-colors cursor-pointer"
            >
              اطلب عرض سعر مجاني
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
