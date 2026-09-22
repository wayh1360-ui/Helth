import React, { useState } from 'react';
import { 
  HeartPulse, 
  Flame, 
  Wind, 
  Activity, 
  Bone, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert,
  ChevronRight,
  CheckCircle2,
  Info,
  Edit3
} from 'lucide-react';
import { EmergencyProtocol } from '../types';

interface SymptomsFirstAidProps {
  protocols: EmergencyProtocol[];
  language: 'en' | 'my';
  onSelectProtocol?: (protocol: EmergencyProtocol) => void;
  onManageSection?: () => void;
}

export const SymptomsFirstAid: React.FC<SymptomsFirstAidProps> = ({
  protocols,
  language,
  onSelectProtocol,
  onManageSection,
}) => {
  const [activeCategory, setActiveCategory] = useState<'heat-fevers' | 'respiratory' | 'gastrointestinal' | 'musculoskeletal'>('heat-fevers');

  const categories = [
    {
      id: 'heat-fevers' as const,
      name: 'Heatstroke & Envenomation',
      myanmarName: 'အပူလျှပ်ခြင်း၊ မီးလောင်နှင့် မြွေကိုက်',
      count: 3,
      icon: <Flame className="w-4 h-4" />,
    },
    {
      id: 'respiratory' as const,
      name: 'Respiratory & Choking',
      myanmarName: 'အသက်ရှူလမ်းကြောင်းနှင့် ရင်ကျပ်',
      count: 2,
      icon: <Wind className="w-4 h-4" />,
    },
    {
      id: 'gastrointestinal' as const,
      name: 'Gastrointestinal & Poisoning',
      myanmarName: 'အစာအိမ်နှင့် အဆိပ်သင့်ခြင်း',
      count: 1,
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: 'musculoskeletal' as const,
      name: 'Trauma & Fractures',
      myanmarName: 'အရိုးကျိုးနှင့် ထိခိုက်ဒဏ်ရာ',
      count: 1,
      icon: <Bone className="w-4 h-4" />,
    },
  ];

  const activeProtocols = protocols.filter(p => p.category === activeCategory);

  return (
    <section id="symptoms-firstaid" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Section Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-950/40 text-red-800 dark:text-red-300 comfort:text-red-900 text-xs font-semibold mb-2 border border-red-500/20">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            <span className="font-bold">
              {language === 'my' 
                ? 'အရေးပေါ် ရှေးဦးသူနာပြုစုနည်း စံနှုန်းများ'
                : 'LIFE-SAFETY FIRST AID & EMERGENCY PROTOCOLS'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black dark:text-white comfort:text-[#231f1a] tracking-tight">
            {language === 'my' ? 'ရောဂါလက္ခဏာများနှင့် ရှေးဦးသူနာပြုစုနည်း' : 'Symptoms & Standardized First Aid Guide'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] mt-1 font-myanmar" lang="my">
            {language === 'my'
              ? 'အရေးပေါ် အသက်ကယ်အဆင့်များ၊ ရှောင်ကြဉ်ရမည့် မှားယွင်းသော အလေ့အထများနှင့် အန္တရာယ် သတိပေးချက်များ'
              : 'Evidence-based triage, step-by-step stabilization, and strict clinical cautions.'}
          </p>
        </div>

        {onManageSection && (
          <button
            onClick={onManageSection}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-800 dark:text-red-300 comfort:text-red-900 text-xs font-bold transition-colors cursor-pointer border border-red-500/30 shrink-0 self-start md:self-end"
            type="button"
            title="Admin: Edit First Aid Protocols"
          >
            <Edit3 className="w-3.5 h-3.5 text-red-600" />
            <span>{language === 'my' ? 'ရှေးဦးပြုစုနည်းများ ပြင်ဆင်ရန်' : 'Update Section'}</span>
          </button>
        )}
      </div>

      {/* Emergency Alert Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-black text-white dark:bg-neutral-900 dark:text-white comfort:bg-[#231f1a] comfort:text-[#faf6ee] border border-neutral-800 comfort:border-[#ded4c1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold leading-tight">
              {language === 'my' 
                ? 'အသက်အန္တရာယ် စိုးရိမ်ရသော ပြင်းထန်အရေးပေါ် လူနာများအတွက်' 
                : 'Life-Threatening Clinical Red Flags?'}
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-300 comfort:text-neutral-200 font-myanmar mt-0.5">
              {language === 'my'
                ? 'သတိလစ်ခြင်း၊ အသက်ရှူရပ်ခြင်း၊ ပြင်းထန်စွာ သွေးထွက်ခြင်း၊ မြွေကိုက်ခံရခြင်းများတွင် လူနာတင်ယာဉ် ၁၉၂ သို့ ချက်ချင်း ခေါ်ဆိုပါ။'
                : 'Do not delay transport. Dial nationwide Emergency Ambulance (192) or Fire Rescue (191) immediately.'}
            </div>
          </div>
        </div>

        <a
          href="tel:192"
          className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{language === 'my' ? '၁၉၂ ချက်ချင်းခေါ်ပါ' : 'Call 192 Now'}</span>
        </a>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] border-transparent shadow-xs'
                  : 'bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              type="button"
            >
              {cat.icon}
              <span className="font-myanmar">{language === 'my' ? cat.myanmarName : cat.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-neutral-700 text-white dark:bg-neutral-300 dark:text-black' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Protocols Step-by-Step Direct Grid (Clean, Sequential, No Flip Cards) */}
      <div className="space-y-6">
        {activeProtocols.map((protocol) => (
          <div
            key={protocol.id}
            className="bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] rounded-3xl p-5 sm:p-7 border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] shadow-xs"
          >
            {/* Header of Protocol */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] flex items-center justify-center font-bold text-xs">
                    {protocol.number}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-800 dark:text-red-300 comfort:text-red-900 uppercase tracking-wider border border-red-500/20">
                    {protocol.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white comfort:text-[#231f1a] font-myanmar leading-snug">
                  {language === 'my' ? protocol.myanmarTitle : protocol.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 comfort:text-[#645a4e] font-medium mt-0.5 font-myanmar">
                  {language === 'my' ? protocol.title : protocol.myanmarTitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="tel:192"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs font-myanmar"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'my' ? 'လူနာတင်ယာဉ် ၁၉၂' : 'Ambulance 192'}</span>
                </a>
              </div>
            </div>

            {/* Direct 4-Step Clinical Procedure Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {protocol.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-neutral-50/70 dark:bg-neutral-950/50 comfort:bg-[#f2e9d8]/50 border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] flex flex-col justify-between shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
                >
                  <div>
                    {/* Step Number & Title */}
                    <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-neutral-200 dark:border-neutral-800 comfort:border-[#ded4c1]">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                        {language === 'my' ? (['၁', '၂', '၃', '၄', '၅', '၆'][sIdx] || sIdx + 1) : (sIdx + 1)}
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-black dark:text-white comfort:text-[#231f1a] font-myanmar">
                        {step.title}
                      </div>
                    </div>

                    {/* Step Medical Instruction with High-Legibility Spacing */}
                    <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] leading-relaxed font-myanmar">
                      {step.instruction}
                    </p>
                  </div>

                  {/* Clean Flattened Caution Callout (No Nested Card Clutter) */}
                  {step.caution && (
                    <div className="mt-3.5 pt-2.5 border-t border-amber-500/25">
                      <div className="flex items-start gap-1.5 text-xs text-amber-900 dark:text-amber-300 comfort:text-amber-950">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <p className="font-myanmar leading-relaxed text-[11px] sm:text-xs">
                          <span className="font-bold mr-1 text-amber-800 dark:text-amber-400">
                            {language === 'my' ? 'ရှောင်ကြဉ်ရန်:' : 'Do not:'}
                          </span>
                          {step.caution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
