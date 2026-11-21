import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import {
  CITY_DISTRICTS,
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
  const featuredServices = SERVICES_DATA.slice(0, 4);
  const activeStep = METHODOLOGY_STEPS[activeStepIndex] || METHODOLOGY_STEPS[0];
  const activeCheckpoints = METHODOLOGY_CHECKPOINTS[activeStep.step] || [];

  return (
    <div>
      {/* 1. Hero Section — Single Dominant Architectural Focal Point */}
      <section className="relative bg-[#0B162C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            src="/src/assets/images/hero_jeddah_architecture_1795218542630.jpg"
            alt="مبنى سكني فاخر معزول حرارياً ومائياً في مدينة جدة"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-l from-[#0B162C]/95 via-[#0B162C]/75 to-[#0B162C]/40"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-semibold text-[#C89B3C]">
              جدة ومكة المكرمة · حلول العزل الهندسي المعتمدة
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-[1.2] text-white">
              حماية هندسية مستدامة للمباني من الرطوبة والحرارة
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              تنفذ شركة {COMPANY_INFO.brandName} أنظمة العزل المائي والحراري وعزل
              الفوم والهناجر والخزانات بأحدث المواد العالمية المعتمدة، مع ضمان
              فعلي يمتد لعشر سنوات.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 rounded-lg bg-[#C89B3C] hover:bg-[#b88c31] text-[#0B162C] font-bold text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                اطلب معاينة وعرض سعر مجاني
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 rounded-lg border border-white/25 hover:border-[#C89B3C] text-white font-semibold text-sm flex items-center gap-2 transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <span>استكشف خدمات العزل</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Width 4-Column Corporate Trust Strip */}
      <section
        aria-label="مؤشرات الثقة والاعتماد"
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#0B162C] tabular-nums">
                +15 عاماً
              </div>
              <p className="text-sm text-slate-600">
                خبرة ميدانية في مشاريع العزل السعودية
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#0B162C] tabular-nums">
                10 سنوات
              </div>
              <p className="text-sm text-slate-600">
                شهادة ضمان معتمدة على التنفيذ والمواد
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                جدة ومكة
              </div>
              <p className="text-sm text-slate-600">
                تغطية شاملة للأحياء والمناطق الصناعية
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#0B162C] tabular-nums">
                48 ساعة
              </div>
              <p className="text-sm text-slate-600">
                اختبار غمر مائي فني قبل تسليم كل مشروع
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Asymmetric Services Bento Overview */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                01. القدرات الهندسية
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0B162C]">
                أنظمة عزل متخصصة لطبيعة مناخ جدة ومكة
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              <span>استعراض جميع الخدمات والمواصفات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {featuredServices.map((service, idx) => {
              const spanClass =
                idx === 0
                  ? 'lg:col-span-7'
                  : idx === 1
                  ? 'lg:col-span-5'
                  : 'lg:col-span-6';
              return (
                <article
                  key={service.id}
                  className={`${spanClass} group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-slate-300`}
                >
                  <div>
                    <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                      <SafeImage
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="font-bold text-[#B0852B] tabular-nums">
                          {service.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>ضمان {service.warrantyYears} سنوات</span>
                        <span aria-hidden="true">·</span>
                        <span>{service.thickness}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0B162C]">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 truncate">
                      الأنسب لـ: {service.recommendedFor}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(service.id)}
                      className="text-xs font-bold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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

      {/* 4. Interactive Layer Stack & Problem Explorer */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold text-[#B0852B]">
              02. التشخيص والتركيب الهندسي
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0B162C]">
              اكتشف طبقات العزل والحل الأنسب لمشكلة مبناك
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              تصفح المقطع العرضي لكل نظام أو اختر التحدي الذي يواجهك في جدة أو
              مكة لمعرفة دور كل طبقة في حماية المنشأة.
            </p>
          </div>

          <LayerExplorer onSelectForQuote={onSelectServiceForQuote} />
        </div>
      </section>

      {/* 5. Interactive Engineering Methodology — 4 Steps */}
      <section className="py-16 sm:py-24 bg-[#0B162C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold text-[#C89B3C]">
                03. منهجية التنفيذ الهندسي
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                أربع مراحل قياسية تضمن جودة العزل لعشر سنوات
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              اختر أي مرحلة لاستعراض نقاط الفحص الفني الخاصة بها
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHODOLOGY_STEPS.map((item, idx) => {
              const isSelected = idx === activeStepIndex;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  aria-pressed={isSelected}
                  className={`text-right rounded-xl p-6 space-y-3 border transition-colors duration-150 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#13294B] border-[#C89B3C]'
                      : 'bg-[#13294B]/45 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-2xl font-bold text-[#C89B3C] tabular-nums block">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Step Checkpoints Panel */}
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#13294B]/80 border border-white/15 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-1 shrink-0">
              <p className="text-xs font-semibold text-[#C89B3C] tabular-nums">
                معايير التحقق — المرحلة {activeStep.step}
              </p>
              <h4 className="text-lg font-bold text-white">
                {activeStep.title}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {activeCheckpoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C89B3C] shrink-0 mt-1" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Featured Projects Preview */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                04. نماذج من أعمالنا
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0B162C]">
                مشاريع منفذة في جدة ومكة المكرمة
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              <span>تصفح كافة المشاريع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <ProjectsGallery
            limit={3}
            onRequestSimilar={onSelectProjectForQuote}
            onLightboxChange={onLightboxChange}
          />
        </div>
      </section>

      {/* 7. Jeddah & Makkah Geographic Coverage + Animated FAQs */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Regional Coverage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                05. التغطية الجغرافية المعتمدة
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                خدمة ميدانية سريعة في جدة ومكة المكرمة
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                نخصص فرق معاينة وتنفيذ مجهزة بالكامل لتغطية المشاريع السكنية
                والتجارية والصناعية في مختلف أحياء جدة ومكة.
              </p>
            </div>

            <div className="space-y-4">
              {(['جدة', 'مكة المكرمة'] as const).map((cityName) => (
                <div
                  key={cityName}
                  className="border border-slate-200 rounded-xl p-5 bg-[#F8FAFC] space-y-2.5"
                >
                  <div className="flex items-center gap-2 font-bold text-[#0B162C]">
                    <MapPin className="w-4 h-4 text-[#C89B3C]" />
                    <span>نطاق {cityName}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {CITY_DISTRICTS[cityName].slice(0, -1).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering FAQs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#B0852B]">
                استفسارات شائعة
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                إجابات هندسية قبل بدء مشروع العزل
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
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
        </div>
      </section>

      {/* 8. Bottom Conversion Section */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteSection prefillEstimate={prefillEstimate} />
        </div>
      </section>
    </div>
  );
}

export function ServicesView({
  onSelectServiceForQuote,
}: {
  onSelectServiceForQuote: (systemId: InsulationSystemId) => void;
}) {
  return (
    <div className="bg-[#F8FAFC] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold text-[#B0852B]">
            الخدمات والأنظمة المعتمدة
          </p>
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
              <div className="lg:col-span-5 bg-slate-100 min-h-[260px]">
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
                        <Check className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
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
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Split About Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#B0852B]">
                من نحن · {COMPANY_INFO.fullName}
              </p>
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
              src="/src/assets/images/waterproofing_membrane_work_1795218542643.jpg"
              alt="فريق شركة بصمة إتقان أثناء تنفيذ أعمال العزل المائي"
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
