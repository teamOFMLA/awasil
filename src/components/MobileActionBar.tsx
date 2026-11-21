import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO, PageRoute } from '../data/companyData';

interface MobileActionBarProps {
  visible: boolean;
  activePage: PageRoute;
  onRequestQuote: (page: PageRoute) => void;
}

export function MobileActionBar({
  visible,
  activePage,
  onRequestQuote,
}: MobileActionBarProps) {
  if (!visible) return null;

  const isContactPage = activePage === 'contact';

  const handleQuoteTap = () => {
    if (isContactPage) {
      const el = document.getElementById('quote-form-panel');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    onRequestQuote('contact');
  };

  return (
    <div
      aria-label="إجراءات التواصل السريع للجوال"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 min-h-14 pb-[env(safe-area-inset-bottom)] bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-between gap-2"
    >
      <a
        href={COMPANY_INFO.phoneHref}
        className="flex-1 min-h-[44px] rounded-lg border border-slate-200 text-[#0B162C] text-xs font-bold flex items-center justify-center gap-1.5 active:bg-slate-50 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
      >
        <Phone className="w-3.5 h-3.5 text-[#0B162C] shrink-0" />
        <span>اتصال</span>
      </a>

      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[44px] rounded-lg bg-[#0B162C] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:bg-[#13294B] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
        <span>واتساب</span>
      </a>

      <button
        type="button"
        onClick={handleQuoteTap}
        className="flex-[1.2] min-h-[44px] rounded-lg bg-[#C89B3C] text-[#0B162C] text-xs font-bold flex items-center justify-center gap-1.5 active:bg-[#b88c31] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B162C]"
      >
        <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
        <span>{isContactPage ? 'نموذج الطلب' : 'طلب معاينة'}</span>
      </button>
    </div>
  );
}
