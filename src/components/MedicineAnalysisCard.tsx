import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Pill, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Archive, 
  Info,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { MedicineAnalysisResult } from '../types';

interface MedicineAnalysisCardProps {
  result: MedicineAnalysisResult;
  language: 'en' | 'my';
  onConsultAiDoctor?: (query: string) => void;
  compact?: boolean;
}

export const MedicineAnalysisCard: React.FC<MedicineAnalysisCardProps> = ({
  result,
  language,
  onConsultAiDoctor,
  compact = false
}) => {
  const [isLargeFont, setIsLargeFont] = useState(true);

  const handlePrint = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    window.print();
  };

  return (
    <div 
      className={`rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-5 transition-all text-left shadow-sm ${
        isLargeFont ? 'text-base' : 'text-sm'
      }`}
    >
      {/* Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-emerald-200 dark:border-emerald-800/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase mb-1.5 font-myanmar">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'my' ? 'ဆေးဝါး စစ်ဆေးအတည်ပြုချက်' : 'Verified Clinical Assessment'}</span>
            {result.confidence && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-200 dark:bg-emerald-800 rounded text-[10px]">
                {result.confidence}
              </span>
            )}
          </div>
          <h3 className={`font-black text-black dark:text-white font-myanmar ${isLargeFont ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
            {language === 'my' && result.myanmarName ? result.myanmarName : result.medicineName}
          </h3>
          {result.genericName && (
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">
              {result.genericName} {result.category ? `• ${result.category}` : ''}
            </p>
          )}
        </div>

        {/* Action Buttons: Print */}
        <div className="flex items-center gap-2 self-start shrink-0">

          {!compact && (
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-black dark:text-white border border-border-subtle dark:border-neutral-700 transition-colors shadow-xs cursor-pointer"
              title="Print instructions"
              type="button"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Core Section 1: What is this medicine for? */}
      <div className="mt-3.5 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-100 dark:border-emerald-900 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold mb-1.5 font-myanmar text-sm sm:text-base">
          <Pill className="w-4 h-4 shrink-0" />
          <h4>
            {language === 'my' ? '၁။ ဤဆေးသည် အဘယ်အတွက် သောက်ရပါသနည်း' : '1. What Is This Medicine For?'}
          </h4>
        </div>
        <p className="text-black dark:text-neutral-100 font-myanmar leading-relaxed text-xs sm:text-sm">
          {language === 'my' && result.myanmarPurpose ? result.myanmarPurpose : result.purpose}
        </p>
      </div>

      {/* Core Section 2: How to take it */}
      <div className="mt-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-100 dark:border-emerald-900 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold font-myanmar text-sm sm:text-base">
            <Clock className="w-4 h-4 shrink-0" />
            <h4>
              {language === 'my' ? '၂။ မည်သို့ သောက်သုံးရမည်နည်း (သောက်ဆေးညွှန်း)' : '2. How to Take It'}
            </h4>
          </div>

          {(result.myanmarTiming || result.timing) && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold text-xs font-myanmar border border-amber-300 dark:border-amber-800">
              {language === 'my' && result.myanmarTiming ? result.myanmarTiming : result.timing}
            </span>
          )}
        </div>

        <div className="space-y-1.5 font-myanmar text-xs sm:text-sm">
          {((language === 'my' && result.myanmarInstructions && result.myanmarInstructions.length > 0)
            ? result.myanmarInstructions 
            : result.instructions
          ).map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-black dark:text-neutral-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Section 3: Safety Warnings for Elderly */}
      <div className="mt-3 p-3 sm:p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 shadow-xs">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold mb-1.5 font-myanmar text-sm sm:text-base">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <h4>
            {language === 'my' ? '၃။ သက်ကြီးရွယ်အိုများ အထူးသတိပြုရန်' : '3. Important Precautions for Seniors'}
          </h4>
        </div>
        <ul className="space-y-1.5 text-amber-950 dark:text-amber-200 font-myanmar text-xs sm:text-sm">
          {((language === 'my' && result.myanmarPrecautions && result.myanmarPrecautions.length > 0)
            ? result.myanmarPrecautions 
            : result.precautions
          ).map((caution, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="text-amber-600 font-black">•</span>
              <span>{caution}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Storage Advice */}
      {(result.storageAdvice || result.myanmarStorageAdvice) && (
        <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/80 text-xs text-neutral-700 dark:text-neutral-300 font-myanmar flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>
              <strong>{language === 'my' ? 'သိမ်းဆည်းရန်- ' : 'Storage: '}</strong>
              {language === 'my' && result.myanmarStorageAdvice ? result.myanmarStorageAdvice : result.storageAdvice}
            </span>
          </div>
        </div>
      )}

      {/* Footer / Follow-up Consult */}
      {onConsultAiDoctor && (
        <div className="mt-3.5 pt-3 border-t border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-2 flex-wrap">
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-myanmar flex items-center gap-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'my' ? 'အသေးစိတ် မေးမြန်းလိုပါက အောက်တွင် မေးခွန်းရေးနိုင်ပါသည်' : 'You can ask follow-up questions below'}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              const query = language === 'my' 
                ? `${result.myanmarName || result.medicineName} အကြောင်း၊ ဘေးထွက်ဆိုးကျိုးများနှင့် အခြားဆေးများနှင့် တွဲသောက်နိုင်သလား အသေးစိတ် ရှင်းပြပေးပါ`
                : `Please explain more about ${result.medicineName}, its side effects and drug interactions.`;
              onConsultAiDoctor(query);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold text-xs font-myanmar transition-all cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{language === 'my' ? 'ဤဆေးအကြောင်း ဆက်လက်မေးရန်' : 'Ask Follow-up on this Medicine'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
