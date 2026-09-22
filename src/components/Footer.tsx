import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'my';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="w-full bg-neutral-100 dark:bg-neutral-900 border-t border-border-subtle dark:border-neutral-800 mt-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border-subtle dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold text-base leading-none">
                +
              </span>
              <span className="font-extrabold text-base tracking-tight text-black dark:text-white">
                TMHIP Myanmar
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              {language === 'my'
                ? 'ရိုးရာတိုင်းရင်းဆေး အသိအမှတ်ပြု ဆေးဖက်ဝင်အပင်များ၊ ဓာတုဗေဒသုတေသနနှင့် အရေးပေါ် ရှေးဦးသူနာပြုစုနည်းများ စင်တာ။'
                : 'Official repository for cataloged indigenous traditional botanical formulations, clinical contraindications, and verified public health standards.'}
            </p>
          </div>

          <div className="shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 text-black dark:text-white border border-border-subtle dark:border-neutral-700 text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'my' ? 'တိုင်းရင်းဆေးပညာဦးစီးဌာန စံချိန်စံညွှန်းများ' : 'Accredited by Department of Traditional Medicine'}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <p className="font-myanmar">
            {language === 'my' 
              ? '© ၂၀၂၅-၂၀၂၆ TMHIP • ဆေးပညာ AI စနစ် ပူးတွဲပါရှိသည်' 
              : '© 2025-2026 TMHIP. OpenRouter AI Enabled.'}
          </p>
          <p className="font-myanmar" lang="my">
            {language === 'my'
              ? 'တိုင်းရင်းဆေးပညာနှင့် ကျန်းမာရေး သတင်းအချက်အလက် စင်တာ'
              : 'Traditional Medicine & Health Information Platform'}
          </p>
        </div>
      </div>
    </footer>
  );
};
