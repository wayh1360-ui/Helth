import React from 'react';
import { PhoneCall, Bot, ArrowRight } from 'lucide-react';

interface PolarityBannerProps {
  onOpenAssistant: () => void;
  language: 'en' | 'my';
}

export const PolarityBanner: React.FC<PolarityBannerProps> = ({
  onOpenAssistant,
  language,
}) => {
  return (
    <section className="w-full bg-black dark:bg-neutral-900 comfort:bg-[#231f1a] text-white border-y border-neutral-800 comfort:border-[#ded4c1]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {language === 'my' 
              ? 'အရေးပေါ် ဆေးဘက်ဆိုင်ရာ အကူအညီနှင့် AI စိစစ်မှု' 
              : 'URGENT CLINICAL ASSISTANCE & AI TRIAGE'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
            {language === 'my' 
              ? 'ချက်ချင်း ဆေးဘက်ဆိုင်ရာ အကူအညီ လိုအပ်ပါသလား?' 
              : 'Need immediate healthcare guidance?'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 comfort:text-neutral-200 mt-2 font-myanmar" lang="my">
            {language === 'my'
              ? '၂၄ နာရီ လူနာတင်ယာဉ် ၁၉၂ သို့ ခေါ်ဆိုနိုင်ပြီး ဆေးပညာ AI ဖြင့် မြန်မာဘာသာ အပြည့်အစုံ မေးမြန်းနိုင်ပါသည်။'
              : 'Access 24/7 AI-guided triage, direct nationwide ambulance dispatch, and verified traditional herbal protocols.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            className="w-full sm:w-auto h-11 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            href="tel:192"
            id="polarity-dial-ambulance"
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            <span>{language === 'my' ? 'လူနာတင်ယာဉ် ၁၉၂ ခေါ်မည်' : 'Dial Ambulance 192'}</span>
          </a>

          <button
            className="w-full sm:w-auto h-11 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            onClick={onOpenAssistant}
            type="button"
            id="polarity-open-ai"
          >
            <Bot className="w-4 h-4 text-purple-300" />
            <span>{language === 'my' ? 'AI ဆရာဝန်နှင့် ဆွေးနွေးမည်' : 'Consult AI Doctor'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
