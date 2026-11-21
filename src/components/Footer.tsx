import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO, PageRoute } from '../data/companyData';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

const FOOTER_ROUTES: [PageRoute, string, string][] = [
  ['home', '/', 'الرئيسية'],
  ['services', '/services', 'الخدمات الهندسية'],
  ['projects', '/projects', 'معرض المشاريع'],
  ['about', '/about', 'عن الشركة والضمان'],
  ['contact', '/contact', 'طلب عرض سعر'],
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0B162C] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column with Official SVG Logo */}
          <div className="md:col-span-5 space-y-4">
            <img
              src={COMPANY_INFO.logoPath}
              alt={COMPANY_INFO.fullName}
              className="h-24 w-auto object-contain"
            />
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              شركة هندسية متخصصة في تنفيذ أنظمة العزل المائي والحراري وعزل الفوم
              وعزل الهناجر والخزانات في جدة ومكة المكرمة وفق معايير جودة صارمة
              وضمان معتمد يصل إلى 10 سنوات.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#C89B3C] hover:text-[#0B162C] text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white">أقسام الموقع</h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_ROUTES.map(([route, href, label]) => (
                <li key={route}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(route);
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Coverage Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white">
              مناطق الخدمة والتواصل
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <a
                  href={COMPANY_INFO.phoneHref}
                  dir="ltr"
                  className="text-white hover:text-[#C89B3C] transition-colors tabular-nums"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <a
                  href={COMPANY_INFO.emailHref}
                  dir="ltr"
                  className="text-white hover:text-[#C89B3C] transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
                <span>
                  المقر الرئيسي: جدة — ونغطي جميع أحياء جدة ومكة المكرمة
                </span>
              </li>
              <li className="text-xs text-slate-400 pt-1">
                {COMPANY_INFO.workingHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.fullName}. جميع الحقوق
            محفوظة.
          </p>
          <p>جدة · مكة المكرمة · المملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  );
}
