import React from 'react';
import { CheckCircle2, Leaf } from 'lucide-react';

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
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-base leading-none shadow-sm shadow-emerald-500/20">
                <Leaf className="w-4 h-4 text-white animate-pulse" />
              </div>
              <span className="font-black text-base tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                SHOW CARE MYANMAR
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              {language === 'my'
                ? 'သဘာဝဆေးဖက်ဝင်အပင်များ၊ အိမ်တွင်းကုသမှုအကြံပေးနှင့် အရေးပေါ် ရှေးဦးသူနာပြုစုနည်းများ စင်တာ။'
                : 'Natural medicinal herbs guide, home treatment advisor, and emergency first aid protocol center.'}
            </p>
          </div>

          <div className="shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 text-black dark:text-white border border-border-subtle dark:border-neutral-700 text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'my' ? 'တိုင်းရင်းဆေးနှင့် အိမ်တွင်းကျန်းမာရေး စံချိန်စံညွှန်းများ' : 'Accredited Health & Home Treatment Standards'}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <p className="font-myanmar">
            {language === 'my' 
              ? '© ၂၀၂၅-၂၀၂၆ SHOW CARE MYANMAR • အိမ်တွင်းကုသမှု စနစ်' 
              : '© 2025-2026 SHOW CARE MYANMAR. All Rights Reserved.'}
          </p>
          <p className="font-myanmar" lang="my">
            {language === 'my'
              ? 'မြန်မာနိုင်ငံ သဘာဝဆေးနှင့် ကျန်းမာရေး စင်တာ'
              : 'Myanmar Health & Home Care Platform'}
          </p>
        </div>
      </div>
    </footer>
  );
};
