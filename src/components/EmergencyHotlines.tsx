import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Flame, 
  ShieldAlert, 
  HeartPulse, 
  Cross, 
  MapPin, 
  Clock, 
  AlertCircle,
  Building2,
  CheckCircle2,
  Phone,
  Edit3
} from 'lucide-react';
import { HOTLINES_DATA } from '../data/hotlines';
import { getManagedHotlines } from '../lib/contentManager';
import { EmergencyHotline } from '../types';

interface EmergencyHotlinesProps {
  language: 'en' | 'my';
  onManageSection?: () => void;
}

export const EmergencyHotlines: React.FC<EmergencyHotlinesProps> = ({ language, onManageSection }) => {
  const [hotlines, setHotlines] = useState<EmergencyHotline[]>(() => getManagedHotlines());

  // Listen for real-time section updates from Admin
  useEffect(() => {
    const handleUpdate = () => {
      setHotlines(getManagedHotlines());
    };
    window.addEventListener('tmhip_content_updated', handleUpdate);
    return () => window.removeEventListener('tmhip_content_updated', handleUpdate);
  }, []);
  const regionalHospitals = [
    { nameEn: 'Yangon General Hospital (YGH)', nameMy: 'ရန်ကုန် ပြည်သူ့ဆေးရုံကြီး', phone: '01-256112', region: 'Yangon', regionMy: 'ရန်ကုန်' },
    { nameEn: 'New Yangon General Hospital', nameMy: 'ရန်ကုန် အထူးကုဆေးရုံသစ်ကြီး', phone: '01-384490', region: 'Yangon', regionMy: 'ရန်ကုန်' },
    { nameEn: 'Mandalay General Hospital', nameMy: 'မန္တလေး ပြည်သူ့ဆေးရုံကြီး', phone: '02-4039011', region: 'Mandalay', regionMy: 'မန္တလေး' },
    { nameEn: 'Naypyitaw 1000-Bedded Hospital', nameMy: 'နေပြည်တော် ခုတင် (၁၀၀၀) ဆေးရုံကြီး', phone: '067-420096', region: 'Naypyitaw', regionMy: 'နေပြည်တော်' },
    { nameEn: 'Taunggyi Sao San Htun Hospital', nameMy: 'တောင်ကြီး စဝ်စံထွန်းဆေးရုံကြီး', phone: '081-21345', region: 'Shan State', regionMy: 'ရှမ်းပြည်နယ်' },
    { nameEn: 'Mawlamyine General Hospital', nameMy: 'မော်လမြိုင် ပြည်သူ့ဆေးရုံကြီး', phone: '057-22288', region: 'Mon State', regionMy: 'မွန်ပြည်နယ်' },
  ];

  return (
    <section id="emergency-hotlines" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-950/40 text-red-800 dark:text-red-300 comfort:text-red-900 text-xs font-semibold mb-2 border border-red-500/20">
            <PhoneCall className="w-3.5 h-3.5 text-red-600 dark:text-red-400 animate-pulse" />
            <span className="font-bold">
              {language === 'my'
                ? '၂၄ နာရီ တစ်နိုင်ငံလုံး အရေးပေါ် ဖုန်းလိုင်းများ'
                : '24/7 NATIONWIDE EMERGENCY DISPATCH'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black dark:text-white comfort:text-[#231f1a] tracking-tight">
            {language === 'my' ? 'အရေးပေါ် ဖုန်းနံပါတ်များ' : 'Emergency Hotlines & Hospitals'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] mt-1 font-myanmar" lang="my">
            {language === 'my'
              ? 'အရေးပေါ် လူနာတင်ယာဉ်၊ မီးသတ်ကယ်ဆယ်ရေး၊ အဆိပ်သင့်ထိန်းချုပ်ရေးနှင့် ပြည်သူ့ဆေးရုံကြီးများသို့ တိုက်ရိုက်ခေါ်ဆိုနိုင်ပါသည်'
              : 'Direct 1-tap toll-free dispatch and major regional referral hospitals.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onManageSection && (
            <button
              onClick={onManageSection}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-800 dark:text-sky-300 comfort:text-sky-900 text-xs font-bold transition-colors cursor-pointer border border-sky-500/30 shrink-0"
              type="button"
              title="Admin: Edit Emergency Hotlines & Phones"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-600" />
              <span>{language === 'my' ? 'ဖုန်းနံပါတ်များ ပြင်ဆင်ရန်' : 'Update Section'}</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{language === 'my' ? 'ဖုန်းလိုင်းများ ၂၄ နာရီ အဆင်သင့်ရှိသည်' : 'All Dispatch Lines Active 24/7'}</span>
          </div>
        </div>
      </div>

      {/* Main Hotlines Grid (Clean, Direct Click-to-Call Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {hotlines.map((hotline) => {
          const isPrimary192 = hotline.number === '192';
          return (
            <div
              key={hotline.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between shadow-2xs hover:shadow-md ${
                isPrimary192
                  ? 'bg-red-500/10 border-red-500/30 dark:bg-red-950/30'
                  : 'bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${
                    isPrimary192
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-black dark:text-white comfort:text-[#231f1a]'
                  }`}>
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isPrimary192
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {isPrimary192 ? (language === 'my' ? 'အဓိက' : 'Priority') : '24/7'}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-myanmar">
                  {language === 'my' ? hotline.myanmarName : hotline.name}
                </div>

                <div className="text-sm font-bold text-black dark:text-white comfort:text-[#231f1a] mt-1 font-myanmar" lang="my">
                  {language === 'my' ? hotline.name : hotline.myanmarName}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <span className={`${hotline.number.length > 5 ? 'text-lg' : 'text-2xl'} font-black tracking-tight text-black dark:text-white comfort:text-[#231f1a]`}>
                  {hotline.number}
                </span>

                <a
                  href={`tel:${hotline.number}`}
                  className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                    isPrimary192
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee]'
                  }`}
                  aria-label={`Dial ${hotline.number}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'my' ? 'ခေါ်မည်' : 'Call'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Referral Hospitals Section */}
      <div className="bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] rounded-3xl p-6 sm:p-8 border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] shadow-xs">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-black dark:text-white comfort:text-[#231f1a]">
              {language === 'my' ? 'မြန်မာနိုင်ငံ အဓိက ပြည်သူ့ဆေးရုံကြီးများ' : 'Major Regional Referral Hospitals'}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 comfort:text-[#645a4e] font-myanmar">
              {language === 'my' ? 'အထူးကုနှင့် အရေးပေါ် လူနာလက်ခံ ဌာနများသို့ တိုက်ရိုက်ဆက်သွယ်ရန်' : 'Emergency trauma centers and 24/7 reception desks'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionalHospitals.map((hosp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 comfort:bg-[#f2e9d8]/50 border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] flex items-center justify-between gap-3 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 comfort:text-emerald-950 font-myanmar">
                  {language === 'my' ? hosp.regionMy : hosp.region}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-black dark:text-white comfort:text-[#231f1a] font-myanmar mt-0.5">
                  {language === 'my' ? hosp.nameMy : hosp.nameEn}
                </h4>
                <div className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 comfort:text-[#4a4035] mt-1">
                  {hosp.phone}
                </div>
              </div>

              <a
                href={`tel:${hosp.phone}`}
                className="h-8 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] text-xs font-bold flex items-center gap-1.5 hover:opacity-85 transition-opacity shrink-0 shadow-2xs"
              >
                <Phone className="w-3 h-3" />
                <span>{language === 'my' ? 'ခေါ်မည်' : 'Call'}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
