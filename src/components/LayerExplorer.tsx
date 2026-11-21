import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Layers, ShieldCheck, Wrench } from 'lucide-react';
import {
  ENGINEERING_PROBLEMS,
  InsulationSystemId,
  SYSTEM_LAYER_STACKS,
} from '../data/companyData';

interface LayerExplorerProps {
  onSelectForQuote: (systemId: InsulationSystemId) => void;
}

export function LayerExplorer({ onSelectForQuote }: LayerExplorerProps) {
  const [mode, setMode] = useState<'problem' | 'system'>('problem');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    ENGINEERING_PROBLEMS[0].id
  );
  const [selectedSystemId, setSelectedSystemId] = useState<InsulationSystemId>(
    ENGINEERING_PROBLEMS[0].recommendedSystemId
  );
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(1);

  const activeProblem = useMemo(
    () =>
      ENGINEERING_PROBLEMS.find((p) => p.id === selectedProblemId) ||
      ENGINEERING_PROBLEMS[0],
    [selectedProblemId]
  );

  const activeStack = useMemo(() => {
    return (
      SYSTEM_LAYER_STACKS.find((s) => s.systemId === selectedSystemId) ||
      SYSTEM_LAYER_STACKS[0]
    );
  }, [selectedSystemId]);

  const activeLayer =
    activeStack.layers[activeLayerIndex] || activeStack.layers[0];

  const handleSelectProblem = (problemId: string) => {
    setSelectedProblemId(problemId);
    const found = ENGINEERING_PROBLEMS.find((p) => p.id === problemId);
    if (found) {
      setSelectedSystemId(found.recommendedSystemId);
      setActiveLayerIndex(1);
    }
  };

  const handleSelectSystem = (systemId: InsulationSystemId) => {
    setSelectedSystemId(systemId);
    setActiveLayerIndex(1);
  };

  return (
    <div className="space-y-7">
      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="طريقة استكشاف أنظمة العزل"
          className="inline-flex items-center p-1 bg-slate-100 rounded-xl w-fit"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'problem'}
            onClick={() => setMode('problem')}
            className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
              mode === 'problem'
                ? 'text-[#0B162C]'
                : 'text-slate-600 hover:text-[#0B162C]'
            }`}
          >
            {mode === 'problem' && (
              <motion.span
                layoutId="explorer-mode-bg"
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#B0852B]" />
              <span>تشخيص حسب المشكلة</span>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'system'}
            onClick={() => setMode('system')}
            className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
              mode === 'system'
                ? 'text-[#0B162C]'
                : 'text-slate-600 hover:text-[#0B162C]'
            }`}
          >
            {mode === 'system' && (
              <motion.span
                layoutId="explorer-mode-bg"
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#B0852B]" />
              <span>استعراض طبقات الأنظمة</span>
            </span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-500">
          اضغط على أي طبقة في المقطع الهندسي لمعاينة دورها والسماكة القياسية.
        </p>
      </div>

      {/* Selector Strip */}
      {mode === 'problem' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ENGINEERING_PROBLEMS.map((problem) => {
            const isSelected = problem.id === selectedProblemId;
            return (
              <button
                key={problem.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelectProblem(problem.id)}
                className={`p-4 rounded-xl border text-right transition-colors duration-150 cursor-pointer flex flex-col justify-between gap-1.5 focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
                  isSelected
                    ? 'bg-[#0B162C] text-white border-[#0B162C]'
                    : 'bg-[#F8FAFC] text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-[#C89B3C]' : 'text-[#B0852B]'
                  }`}
                >
                  تحدي ميداني
                </span>
                <span className="text-sm font-bold leading-snug">
                  {problem.title}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {SYSTEM_LAYER_STACKS.map((stack) => {
            const isSelected = stack.systemId === activeStack.systemId;
            return (
              <button
                key={stack.systemId}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelectSystem(stack.systemId)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
                  isSelected
                    ? 'bg-[#0B162C] text-white border-[#0B162C]'
                    : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {stack.title}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Split Interactive Cross-Section & Light Specification Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Interactive Cross-Section Stack */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-xs font-semibold text-[#B0852B] mb-1">
              المقطع العرضي للنظام · السماكة الكلية {activeStack.totalThickness}
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B162C]">
              {activeStack.title}
            </h3>
          </div>

          {/* Interactive Layer Stack */}
          <div
            role="group"
            aria-label="طبقات العزل من الأعلى إلى الأساس"
            className="space-y-2.5"
          >
            {activeStack.layers.map((layer, index) => {
              const isSelected = index === activeLayerIndex;
              const isGoldSwatch = layer.swatchHex === '#C89B3C';
              return (
                <motion.button
                  key={`${activeStack.systemId}-${layer.level}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveLayerIndex(index)}
                  whileTap={{ scale: 0.995 }}
                  className={`w-full text-right rounded-xl p-4 border transition-all duration-150 cursor-pointer flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#C89B3C] ${
                    isSelected
                      ? 'ring-2 ring-[#C89B3C] border-[#0B162C] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={{
                    backgroundColor: layer.swatchHex,
                    color: layer.textLight ? '#FFFFFF' : '#0B162C',
                  }}
                >
                  <div className="space-y-1 min-w-0">
                    <div
                      className={`text-xs font-semibold ${
                        layer.textLight
                          ? 'text-slate-200'
                          : isGoldSwatch
                          ? 'text-[#0B162C]'
                          : 'text-slate-600'
                      }`}
                    >
                      {layer.level}
                    </div>
                    <div className="text-sm sm:text-base font-bold truncate">
                      {layer.name}
                    </div>
                  </div>
                  <div className="shrink-0 text-left">
                    <span
                      className={`text-xs font-bold tabular-nums px-2.5 py-1 rounded-md ${
                        layer.textLight
                          ? 'bg-white/15 text-white'
                          : 'bg-[#0B162C]/10 text-[#0B162C]'
                      }`}
                    >
                      {layer.thickness}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {mode === 'problem' && (
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 space-y-1.5">
              <p className="text-xs font-bold text-[#0B162C]">
                التشخيص الميداني:
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeProblem.symptom} {activeProblem.diagnosis}
              </p>
            </div>
          )}
        </div>

        {/* Light, Calm Selected Layer Engineering Specification Card */}
        <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 text-[#0B162C] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <motion.div
            key={`${activeStack.systemId}-${activeLayerIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="border-b border-slate-200 pb-4 space-y-1">
              <p className="text-xs font-semibold text-[#B0852B]">
                تفاصيل {activeLayer.level}
              </p>
              <h4 className="text-2xl font-bold text-[#0B162C] leading-snug">
                {activeLayer.name}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <span className="text-xs text-slate-500 block mb-1">
                  المادة القياسية المستخدمة
                </span>
                <span className="text-sm font-semibold text-[#0B162C] leading-relaxed block">
                  {activeLayer.material}
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <span className="text-xs text-slate-500 block mb-1">
                  السماكة المعتمدة
                </span>
                <span className="text-lg font-bold text-[#B0852B] tabular-nums block">
                  {activeLayer.thickness}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#B0852B] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#0B162C]">الوظيفة الهندسية:</strong>{' '}
                  {activeLayer.role}
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#B0852B] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#0B162C]">معيار الضمان:</strong>{' '}
                  {activeLayer.warrantyNote}
                </span>
              </div>

              {mode === 'problem' && (
                <div className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <Layers className="w-4 h-4 text-[#B0852B] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#0B162C]">النتيجة المتوقعة:</strong>{' '}
                    {activeProblem.outcome}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => onSelectForQuote(activeStack.systemId)}
              className="w-full py-3.5 px-5 rounded-lg bg-[#0B162C] hover:bg-[#13294B] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]"
            >
              <span>اطلب معاينة لهذا النظام</span>
              <ArrowLeft className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
