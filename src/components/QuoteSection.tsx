import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  CITY_DISTRICTS,
  COMPANY_INFO,
  EstimateTransferData,
  InsulationSystemId,
  SERVICES_DATA,
} from '../data/companyData';

interface QuoteSectionProps {
  prefillEstimate: EstimateTransferData | null;
}

interface FormErrors {
  name?: string;
  phone?: string;
  area?: string;
}

export function QuoteSection({ prefillEstimate }: QuoteSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<'جدة' | 'مكة المكرمة'>('جدة');
  const [district, setDistrict] = useState(CITY_DISTRICTS['جدة'][0]);
  const [systemId, setSystemId] = useState<InsulationSystemId>('foam');
  const [propertyType, setPropertyType] =
    useState<EstimateTransferData['propertyType']>('سكني');
  const [area, setArea] = useState<string>('350');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prefillEstimate) return;
    setSystemId(prefillEstimate.systemId);
    setCity(prefillEstimate.city);
    setDistrict(prefillEstimate.district);
    setPropertyType(prefillEstimate.propertyType);
    setArea(String(prefillEstimate.areaSqm));
    setSubmittedSummary(null);
  }, [prefillEstimate]);

  const selectedService = useMemo(
    () => SERVICES_DATA.find((s) => s.id === systemId) || SERVICES_DATA[0],
    [systemId]
  );

  const handleCityChange = (nextCity: 'جدة' | 'مكة المكرمة') => {
    setCity(nextCity);
    setDistrict(CITY_DISTRICTS[nextCity][0]);
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'الرجاء إدخال الاسم الكامل';
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!/^(05\d{8}|\+?9665\d{8})$/.test(cleanPhone)) {
      nextErrors.phone = 'أدخل رقم جوال سعودي صحيح (مثال: 05XXXXXXXX)';
    }
    const numericArea = Number(area);
    if (!area || Number.isNaN(numericArea) || numericArea < 10) {
      nextErrors.area = 'الرجاء إدخال مساحة صحيحة لا تقل عن 10 م²';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      'السلام عليكم، أرغب في طلب عرض سعر ومعاينة مجانية من شركة بصمة إتقان:',
      `• الاسم: ${name.trim()}`,
      `• رقم الجوال: ${phone.trim()}`,
      `• المدينة والحي: ${city} — ${district}`,
      `• الخدمة المطلوبة: ${selectedService.title}`,
      `• نوع العقار: ${propertyType}`,
      `• المساحة التقريبية: ${area} م²`,
    ];

    if (notes.trim()) {
      lines.push(`• تفاصيل إضافية: ${notes.trim()}`);
    }

    setSubmittedSummary(lines.join('\n'));
    setCopied(false);
  };

  const whatsappHref = submittedSummary
    ? `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
        submittedSummary
      )}`
    : `https://wa.me/${COMPANY_INFO.whatsappNumber}`;

  const handleCopy = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Direct Contact & Coverage Info */}
      <div className="lg:col-span-5 bg-[#0B162C] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold text-[#C89B3C] mb-2">
              التواصل المباشر والمعاينة
            </p>
            <h3 className="text-2xl font-bold text-white leading-snug">
              احصل على استشارة هندسية وعرض سعر معتمد لمشروعك
            </h3>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              فريقنا الهندسي في جدة ومكة المكرمة جاهز لمعاينة الموقع مجاناً
              واقتراح نظام العزل الأنسب بضمان 10 سنوات.
            </p>
          </div>

          <div className="space-y-5 border-t border-white/10 pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">
                  الهاتف المباشر والاستشارات
                </p>
                <a
                  href={COMPANY_INFO.phoneHref}
                  dir="ltr"
                  className="text-base font-bold text-white hover:text-[#C89B3C] transition-colors tabular-nums"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">نطاق التغطية</p>
                <p className="text-sm font-medium text-white">
                  جدة (المقر الرئيسي) ومكة المكرمة — جميع الأحياء والمناطق
                  الصناعية
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">ساعات العمل</p>
                <p className="text-sm font-medium text-white">
                  {COMPANY_INFO.workingHours}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-white/10">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-lg border border-white/20 hover:border-[#C89B3C] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#C89B3C]" />
            <span>محادثة واتساب مباشرة</span>
          </a>
        </div>
      </div>

      {/* Form or Confirmed WhatsApp Summary Card */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        {submittedSummary ? (
          <div className="h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-700">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-[#0B162C]">
                    تم تجهيز ملخص طلبك بنجاح
                  </h4>
                  <p className="text-sm text-slate-600">
                    اضغط على زر واتساب أدناه لإرسال المواصفات الجاهزة مباشرة إلى
                    فريق المعاينة في {city}.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  معاينة نص الرسالة الجاهزة:
                </p>
                <pre className="whitespace-pre-wrap font-sans text-sm text-[#0F172A] leading-relaxed">
                  {submittedSummary}
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-lg bg-[#C89B3C] hover:bg-[#b88c31] text-[#0B162C] font-bold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الطلب عبر واتساب الآن</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3.5 px-5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#0B162C] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'تم النسخ' : 'نسخ الملخص'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSubmittedSummary(null)}
                className="py-3.5 px-4 rounded-lg text-slate-600 hover:text-[#0B162C] text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                <span>تعديل</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#0B162C]">
                نموذج طلب عرض سعر ومعاينة مجانية
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                أدخل تفاصيل العقار ليتم تجهيز ملخص هندسي منسق وإرساله مباشرة عبر
                واتساب.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quote-name"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  الاسم الكامل
                </label>
                <input
                  id="quote-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: عبدالعزيز الغامدي"
                  aria-invalid={Boolean(errors.name)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] focus:outline-none focus:border-[#C89B3C]"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quote-phone"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  رقم الجوال
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full px-3.5 py-2.5 text-sm text-right bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] tabular-nums focus:outline-none focus:border-[#C89B3C]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quote-city"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  المدينة
                </label>
                <select
                  id="quote-city"
                  value={city}
                  onChange={(e) =>
                    handleCityChange(e.target.value as 'جدة' | 'مكة المكرمة')
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] focus:outline-none focus:border-[#C89B3C]"
                >
                  <option value="جدة">جدة</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="quote-district"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  الحي / المنطقة
                </label>
                <select
                  id="quote-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] focus:outline-none focus:border-[#C89B3C]"
                >
                  {CITY_DISTRICTS[city].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="quote-service"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  نوع العزل
                </label>
                <select
                  id="quote-service"
                  value={systemId}
                  onChange={(e) =>
                    setSystemId(e.target.value as InsulationSystemId)
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] focus:outline-none focus:border-[#C89B3C]"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.shortTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="quote-property"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  نوع العقار
                </label>
                <select
                  id="quote-property"
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(
                      e.target.value as EstimateTransferData['propertyType']
                    )
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] focus:outline-none focus:border-[#C89B3C]"
                >
                  <option value="سكني">سكني</option>
                  <option value="تجاري">تجاري</option>
                  <option value="صناعي / هنجر">صناعي / هنجر</option>
                  <option value="خزان / مسبح">خزان / مسبح</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="quote-area"
                  className="block text-sm font-semibold text-[#0B162C] mb-1.5"
                >
                  المساحة (م²)
                </label>
                <input
                  id="quote-area"
                  type="number"
                  min={10}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  aria-invalid={Boolean(errors.area)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] tabular-nums focus:outline-none focus:border-[#C89B3C]"
                />
                {errors.area && (
                  <p className="text-xs text-red-600 mt-1">{errors.area}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="quote-notes"
                className="block text-sm font-semibold text-[#0B162C] mb-1.5"
              >
                تفاصيل إضافية (اختياري)
              </label>
              <textarea
                id="quote-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: السطح مبلط حالياً أو يوجد تسرب حول فتحات التكييف..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] focus:outline-none focus:border-[#C89B3C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-lg bg-[#0B162C] hover:bg-[#13294B] text-white font-bold text-sm transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]"
            >
              تجهيز ملخص الطلب والإرسال عبر واتساب
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
