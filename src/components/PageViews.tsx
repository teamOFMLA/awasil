import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import {
  COMPANY_INFO,
  EstimateTransferData,
  FAQ_ITEMS,
  InsulationSystemId,
  METHODOLOGY_CHECKPOINTS,
  METHODOLOGY_STEPS,
  PageRoute,
  ProjectItem,
  SERVICES_DATA,
} from '../data/companyData';
import { LayerExplorer } from './LayerExplorer';
import { ProjectsGallery } from './ProjectsGallery';
import { QuoteSection } from './QuoteSection';
import { SafeImage } from './SafeImage';

interface SharedViewProps {
  onNavigate: (page: PageRoute) => void;
  onSelectServiceForQuote: (systemId: InsulationSystemId) => void;
  onSelectProjectForQuote: (project: ProjectItem) => void;
  onLightboxChange?: (isOpen: boolean) => void;
  prefillEstimate: EstimateTransferData | null;
}

export function HomeView({
  onNavigate,
  onSelectServiceForQuote,
  onSelectProjectForQuote,
  onLightboxChange,
  prefillEstimate,
}: SharedViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = METHODOLOGY_STEPS[activeStepIndex] || METHODOLOGY_STEPS[0];
  const activeCheckpoints = METHODOLOGY_CHECKPOINTS[activeStep.step] || [];
  const compactFaqs = FAQ_ITEMS.slice(0, 4);

  return (
    <div>
      {/* 1. Bright Split Architectural Hero + Integrated Real Proof Metrics */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs sm:text-sm font-semibold text-[#B0852B]">
                جدة ومكة المكرمة · حلول العزل الهندسي المعتمدة
              </p>

              <h1 className="text-3xl sm:text-5xl font-bold leading-[1.2] text-[#0B162C]">
                حماية هندسية مستدامة للمباني من الرطوبة والحرارة
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                تنفذ شركة {COMPANY_INFO.brandName} أنظمة العزل المائي والحراري
                وعزل الفوم والهناجر والخزانات بمواد معتمدة، مع اختبار غمر فني
                وضمان يمتد لعشر سنوات.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-7 py-3.5 rounded-lg bg-[#0B162C] hover:bg-[#13294B] text-white font-bold text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]"
                >
                  اطلب معاينة وعرض سعر مجاني
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#C89B3C] text-[#0B162C] font-semibold text-sm flex items-center gap-2 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
                >
                  <span>استكشف خدمات العزل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Integrated Quiet Real Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-2 border-t border-slate-200">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0B162C] tabular-nums">
                    +15 عاماً
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">خبرة ميدانية</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0B162C] tabular-nums">
                    10 سنوات
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">ضمان مكتوب</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0B162C]">
                    جدة ومكة
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">تغطية كاملة</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0B162C] tabular-nums">
                    48 ساعة
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">اختبار غمر مائي</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <SafeImage
                  src="/src/assets/images/real/10.jpg"
                  alt="سطح مبنى معزول مائياً أثناء اختبار الغمر المعتمد في جدة"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clean 2+3 Services Overview */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                01. الخدمات الهندسية
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                أنظمة عزل مصممة لمناخ جدة ومكة المكرمة
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
            >
              <span>المواصفات وجدول المقارنة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {SERVICES_DATA.map((service, idx) => {
              const spanClass =
                idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
              return (
                <article
                  key={service.id}
                  className={`${spanClass} group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-slate-300`}
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                      <SafeImage
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-5 sm:p-6 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="font-bold text-[#B0852B] tabular-nums">
                          {service.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>ضمان {service.warrantyYears} سنوات</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0B162C]">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 truncate">
                      {service.shortTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(service.id)}
                      className="text-xs font-bold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
                    >
                      اطلب عرض سعر
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Light Interactive Layer Explorer + Calm 4-Step Execution Strip */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                02. التشخيص وطبقات العزل
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                استكشف طبقات العزل المناسبة لمشكلة مبناك
              </h2>
            </div>

            <LayerExplorer onSelectForQuote={onSelectServiceForQuote} />
          </div>

          {/* Calm Light 4-Step Methodology Strip */}
          <div className="pt-14 border-t border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#B0852B]">
                  03. منهجية العمل المعتمدة
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B162C]">
                  أربع خطوات واضحة حتى تسليم الضمان
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                اختر أي خطوة لعرض نقاط التحقق الخاصة بها
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {METHODOLOGY_STEPS.map((item, idx) => {
                const isSelected = idx === activeStepIndex;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    aria-pressed={isSelected}
                    className={`text-right rounded-xl p-5 border transition-colors duration-150 cursor-pointer space-y-2 focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
                      isSelected
                        ? 'bg-[#F8FAFC] border-[#C89B3C] ring-1 ring-[#C89B3C]/40'
                        : 'bg-white border-slate-200 hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span className="text-lg font-bold text-[#B0852B] tabular-nums block">
                      {item.step}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B162C]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-5 py-4 sm:px-6 sm:py-5 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {activeCheckpoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B0852B] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Curated Real Projects Preview */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                04. أعمال منفذة على أرض الواقع
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                مشاريع في جدة ومكة المكرمة
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
            >
              <span>تصفح كافة المشاريع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <ProjectsGallery
            limit={3}
            showFilters={false}
            onRequestSimilar={onSelectProjectForQuote}
            onLightboxChange={onLightboxChange}
          />
        </div>
      </section>

      {/* 5. Concise FAQs + Light Conversion Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Compact FAQ Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                05. استفسارات شائعة
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                إجابات سريعة قبل بدء التنفيذ
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                تفاصيل المعاينة المجانية، مدة التنفيذ، وشروط الضمان في جدة ومكة
                المكرمة.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
              {compactFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C89B3C]"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#0B162C]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#B0852B]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Quote Section */}
          <div className="pt-14 border-t border-slate-200">
            <QuoteSection prefillEstimate={prefillEstimate} />
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServicesView({
  onNavigate,
  onSelectServiceForQuote,
}: {
  onNavigate: (page: PageRoute) => void;
  onSelectServiceForQuote: (systemId: InsulationSystemId) => void;
}) {
  return (
    <div className="bg-[#F8FAFC] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <nav
            aria-label="مسار التنقل"
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#0B162C] transition-colors cursor-pointer"
            >
              الرئيسية
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#B0852B] font-semibold">
              الخدمات والأنظمة المعتمدة
            </span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B162C]">
            حلول العزل الهندسية في جدة ومكة المكرمة
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            ننفذ خمسة أنظمة عزل رئيسية مصممة لتحمل الرطوبة الساحلية العالية في
            جدة ودرجات الحرارة المرتفعة في مكة المكرمة، مع التزام كامل
            بالمواصفات والاختبار الفني.
          </p>
        </div>

        <div className="space-y-8">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-5 bg-slate-100 min-h-[240px]">
                <SafeImage
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="font-bold text-[#B0852B] tabular-nums">
                      {service.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>ضمان {service.warrantyYears} سنوات</span>
                    <span aria-hidden="true">·</span>
                    <span>السماكة: {service.thickness}</span>
                    <span aria-hidden="true">·</span>
                    <span>العمر الافتراضي: {service.lifespan}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#0B162C]">
                      {service.title}
                    </h2>
                    <p className="text-sm font-medium text-[#B0852B] mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {service.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-sm text-[#0F172A]"
                      >
                        <Check className="w-4 h-4 text-[#B0852B] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    الاستخدام الأمثل: {service.recommendedFor}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.id)}
                    className="px-5 py-2.5 rounded-lg bg-[#0B162C] hover:bg-[#13294B] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    اطلب عرض سعر للخدمة
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Technical Comparison Matrix */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#B0852B] mb-1">
                المقارنة الهندسية
              </p>
              <h2 className="text-2xl font-bold text-[#0B162C]">
                مقارنة تقنية شاملة لأنظمة العزل المعتمدة
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              قارن بين خصائص كل نظام لاختيار الحل الأنسب لمناخ جدة الساحلي أو
              حرارة مكة المرتفعة.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-4 px-6">النظام الهندسي</th>
                  <th className="py-4 px-5">مقاومة المياه</th>
                  <th className="py-4 px-5">العزل الحراري</th>
                  <th className="py-4 px-5">السماكة القياسية</th>
                  <th className="py-4 px-5">العمر الافتراضي</th>
                  <th className="py-4 px-5">الاستخدام الأمثل</th>
                  <th className="py-4 px-6">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {SERVICES_DATA.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-[#0B162C] whitespace-nowrap">
                      {item.index}. {item.shortTitle}
                    </td>
                    <td className="py-4 px-5 text-slate-700 whitespace-nowrap">
                      {item.waterResistance}
                    </td>
                    <td className="py-4 px-5 text-slate-700 whitespace-nowrap">
                      {item.thermalRating}
                    </td>
                    <td className="py-4 px-5 text-slate-700 tabular-nums whitespace-nowrap">
                      {item.thickness}
                    </td>
                    <td className="py-4 px-5 text-slate-700 tabular-nums whitespace-nowrap">
                      {item.lifespan}
                    </td>
                    <td className="py-4 px-5 text-slate-600 min-w-[220px]">
                      {item.recommendedFor}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectServiceForQuote(item.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0B162C] hover:bg-[#13294B] text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        اطلب عرض سعر
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutView({
  onNavigate,
}: {
  onNavigate: (page: PageRoute) => void;
}) {
  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Split About Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <div className="space-y-3">
              <nav
                aria-label="مسار التنقل"
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#0B162C] transition-colors cursor-pointer"
                >
                  الرئيسية
                </button>
                <span aria-hidden="true">/</span>
                <span className="text-[#B0852B] font-semibold">
                  عن {COMPANY_INFO.brandName}
                </span>
              </nav>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#0B162C] leading-snug">
                خبرة تمتد لأكثر من 15 عاماً في هندسة العزل بجدة ومكة
              </h1>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              تتخصص شركة {COMPANY_INFO.brandName} في حماية المنشآت السكنية
              والتجارية والصناعية من مخاطر التسرب المائي والإجهاد الحراري.
              نعتمد في مشاريعنا على مواد عزل عالمية معتمدة، وفريق فني مدرب
              ينفذ كل مشروع وفق ضوابط فنية دقيقة تشمل تجهيز السطح واختبار
              الجودة قبل التسليم.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-2xl font-bold text-[#0B162C] tabular-nums">
                  +15
                </div>
                <p className="text-xs text-slate-600 mt-1">عاماً من الخبرة</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0B162C] tabular-nums">
                  10
                </div>
                <p className="text-xs text-slate-600 mt-1">سنوات ضمان معتمد</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0B162C]">جدة ومكة</div>
                <p className="text-xs text-slate-600 mt-1">نطاق التنفيذ</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-lg bg-[#0B162C] hover:bg-[#13294B] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                احجز معاينة مجانية لموقعك
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-200 min-h-[320px]">
            <SafeImage
              src="/src/assets/images/real/3.jpg"
              alt="فني شركة بصمة إتقان أثناء تطبيق لفائف العزل المائي في الموقع"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Warranty & Quality Standards */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-[#B0852B] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>التزامات الجودة والضمان</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B162C]">
              ركائز العمل في شركة بصمة إتقان
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <span className="text-sm font-bold text-[#B0852B] tabular-nums">
                01
              </span>
              <h3 className="text-lg font-bold text-[#0B162C]">
                مواد عالمية معتمدة
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                نلتزم بتوريد وتطبيق مواد عزل أصلية مطابقة للمواصفات القياسية
                ومقاومة للظروف المناخية القاسية في المنطقة الغربية.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <span className="text-sm font-bold text-[#B0852B] tabular-nums">
                02
              </span>
              <h3 className="text-lg font-bold text-[#0B162C]">
                فحص واختبار قبل التسليم
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                لا يُسلّم أي مشروع عزل مائي إلا بعد إجراء اختبار الغمر بالماء
                والتحقق من سلامة كافة نقاط الصرف والفواصل.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <span className="text-sm font-bold text-[#B0852B] tabular-nums">
                03
              </span>
              <h3 className="text-lg font-bold text-[#0B162C]">
                شهادة ضمان 10 سنوات وصيانة دورية
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                يحصل العميل على ضمان مكتوب لمدة 10 سنوات، مع توفير خدمات الفحص
                والصيانة الدورية للمنشآت التجارية والمجمعات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
