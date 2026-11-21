import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import {
  InsulationSystemId,
  PROJECTS_DATA,
  ProjectItem,
} from '../data/companyData';
import { SafeImage } from './SafeImage';

interface ProjectsGalleryProps {
  limit?: number;
  onRequestSimilar?: (project: ProjectItem) => void;
  onLightboxChange?: (isOpen: boolean) => void;
}

const FILTER_OPTIONS: { id: 'all' | InsulationSystemId; label: string }[] = [
  { id: 'all', label: 'جميع المشاريع' },
  { id: 'foam', label: 'فوم وحراري' },
  { id: 'waterproofing', label: 'عزل مائي' },
  { id: 'warehouse', label: 'هناجر ومستودعات' },
  { id: 'tanks', label: 'خزانات' },
];

export function ProjectsGallery({
  limit,
  onRequestSimilar,
  onLightboxChange,
}: ProjectsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | InsulationSystemId>(
    'all'
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    const base =
      activeFilter === 'all'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter((p) => p.category === activeFilter);
    return limit ? base.slice(0, limit) : base;
  }, [activeFilter, limit]);

  useEffect(() => {
    onLightboxChange?.(selectedIndex !== null);
  }, [selectedIndex, onLightboxChange]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredProjects.length
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredProjects.length) % filteredProjects.length
        );
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, filteredProjects.length]);

  const activeProject =
    selectedIndex !== null ? filteredProjects[selectedIndex] : null;

  return (
    <div className="space-y-8">
      {/* Interactive Category Filter Control */}
      <div
        role="group"
        aria-label="تصفية المشاريع حسب نوع العزل"
        className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl w-fit"
      >
        {FILTER_OPTIONS.map((option) => {
          const active = activeFilter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setActiveFilter(option.id);
                setSelectedIndex(null);
              }}
              className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
                active
                  ? 'text-[#0B162C] font-semibold'
                  : 'text-slate-600 hover:text-[#0B162C]'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="project-filter-bg"
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-slate-300"
          >
            <div>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`تكبير صورة ${project.title}`}
                className="relative block w-full aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C]"
              >
                <SafeImage
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B162C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-4">
                  <span className="text-xs font-medium text-white">
                    عرض التفاصيل المكبرة
                  </span>
                  <Maximize2 className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
              </button>

              <div className="p-6 space-y-3">
                {/* Zero-pill unboxed metadata line */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="text-[#B0852B] font-semibold">
                    {project.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {project.city}، {project.district}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {project.areaSqm.toLocaleString('en-US')} م²
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B162C] leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
              <span className="text-xs text-slate-600 truncate">
                {project.systemUsed}
              </span>
              {onRequestSimilar && (
                <button
                  type="button"
                  onClick={() => onRequestSimilar(project)}
                  className="text-xs font-semibold text-[#0B162C] hover:text-[#B0852B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  اطلب تنفيذ مماثل
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Accessible Animated Lightbox Modal */}
      <AnimatePresence>
        {activeProject && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-[#0B162C]/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-4xl w-full overflow-hidden border border-slate-200"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeProject.categoryLabel} · {activeProject.city}،{' '}
                    {activeProject.district} ·{' '}
                    <span className="tabular-nums">
                      {activeProject.areaSqm.toLocaleString('en-US')} م²
                    </span>
                  </p>
                  <h4
                    id="lightbox-title"
                    className="text-lg font-bold text-[#0B162C]"
                  >
                    {activeProject.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="إغلاق نافذة عرض المشروع"
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-slate-950 aspect-[16/10]">
                <SafeImage
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                <p className="text-sm text-slate-600">{activeProject.summary}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + filteredProjects.length) %
                          filteredProjects.length
                      )
                    }
                    aria-label="المشروع السابق"
                    className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-[#0B162C] hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex + 1) % filteredProjects.length
                      )
                    }
                    aria-label="المشروع التالي"
                    className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-[#0B162C] hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
