import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  BookOpen, 
  HeartPulse, 
  Bot, 
  ArrowRight,
  Sparkles,
  Activity,
  CheckCircle2,
  Phone,
  Newspaper
} from 'lucide-react';
import { Herb, EmergencyProtocol, ActiveSection } from '../types';

interface HeroSectionProps {
  language: 'en' | 'my';
  onSearch: (query: string, category: string) => void;
  onSelectHerb: (herb: Herb) => void;
  onSelectProtocol: (protocol: EmergencyProtocol) => void;
  onSwitchSection: (section: ActiveSection) => void;
  allHerbs: Herb[];
  allProtocols: EmergencyProtocol[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onSearch,
  onSelectHerb,
  onSelectProtocol,
  onSwitchSection,
  allHerbs,
  allProtocols,
}) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const trimmedQuery = query.trim().toLowerCase();

  const matchedHerbs = trimmedQuery.length > 1 ? allHerbs.filter(h => 
    h.scientificName.toLowerCase().includes(trimmedQuery) ||
    h.englishName.toLowerCase().includes(trimmedQuery) ||
    h.myanmarName.includes(trimmedQuery) ||
    h.tags.some(t => t.toLowerCase().includes(trimmedQuery))
  ) : [];

  const matchedProtocols = trimmedQuery.length > 1 ? allProtocols.filter(p =>
    p.title.toLowerCase().includes(trimmedQuery) ||
    p.myanmarTitle.includes(trimmedQuery)
  ) : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    onSearch(query, 'all');
    setShowDropdown(false);
  };

  const handleQuickChip = (val: string) => {
    setQuery(val);
    onSearch(val, 'all');
  };

  const sectionCards: {
    id: ActiveSection;
    titleEn: string;
    titleMy: string;
    descEn: string;
    descMy: string;
    tagEn: string;
    tagMy: string;
    icon: React.ReactNode;
    colorClass: string;
    accentClass: string;
  }[] = [
    {
      id: 'senior',
      titleEn: '40+ Senior Care & Longevity',
      titleMy: '၄၀+ သက်ကြီးကျန်းမာရေး စောင့်ရှောက်မှု',
      descEn: 'Hypertension, glycemic balance, joint preservation & stroke FAST guidelines.',
      descMy: 'သွေးတိုး၊ ဆီးချို၊ ဒူးနာ၊ အိပ်မပျော်ခြင်း နှင့် လေဖြတ် FAST စောင့်ရှောက်နည်းများ။',
      tagEn: 'Doctor Vetted',
      tagMy: 'အထူးကဏ္ဍ',
      icon: <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      colorClass: 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500',
      accentClass: 'text-amber-800 dark:text-amber-300',
    },
    {
      id: 'plants',
      titleEn: '120+ Botanical Herb Catalog',
      titleMy: 'ဆေးဖက်ဝင်အပင်များ ကျမ်း',
      descEn: 'Standardized monographs, active compounds, preparation methods & indications.',
      descMy: 'အသိအမှတ်ပြု ဆေးဖက်ဝင်အပင် ၁၂၀ ကျော်၏ ဓာတုဗေဒ အချက်အလက်နှင့် သောက်သုံးပုံများ။',
      tagEn: 'Pharmacopoeia',
      tagMy: 'အပင် ၁၂၀+',
      icon: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      colorClass: 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500',
      accentClass: 'text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'symptoms',
      titleEn: 'First Aid Emergency Protocols',
      titleMy: 'ရှေးဦးသူနာပြုစုနည်း လမ်းညွှန်',
      descEn: 'Standardized rapid actions for severe burns, venomous snakebites & heatstroke.',
      descMy: 'မီးလောင်၊ မြွေကိုက်၊ အပူလျှပ်၊ နှလုံးရပ် အသက်ကယ် အဆင့်ဆင့် လမ်းညွှန်ချက်များ။',
      tagEn: 'Life Safety',
      tagMy: 'အရေးပေါ်',
      icon: <HeartPulse className="w-5 h-5 text-red-600 dark:text-red-400" />,
      colorClass: 'bg-red-500/10 border-red-500/30 hover:border-red-500',
      accentClass: 'text-red-800 dark:text-red-300',
    },
    {
      id: 'hotlines',
      titleEn: 'Emergency Hotlines & Dispatch',
      titleMy: 'အရေးပေါ် ဖုန်းနံပါတ်များ',
      descEn: 'One-tap direct dial for Ambulance 192, Fire Rescue 191 & major hospitals.',
      descMy: 'လူနာတင်ယာဉ် ၁၉၂၊ မီးသတ် ၁၉၁ နှင့် မြန်မာနိုင်ငံ အဓိက ဆေးရုံကြီးများသို့ တိုက်ရိုက်ခေါ်ဆိုရန်။',
      tagEn: '24/7 Toll-Free',
      tagMy: '၂၄ နာရီ',
      icon: <Phone className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      colorClass: 'bg-sky-500/10 border-sky-500/30 hover:border-sky-500',
      accentClass: 'text-sky-800 dark:text-sky-300',
    },
    {
      id: 'assistant',
      titleEn: 'AI Doctor & Medicine Scanner',
      titleMy: 'AI ဆရာဝန်နှင့် ဆေးဝါးဓာတ်ပုံစစ်ဆေးစက်',
      descEn: 'Snap photo of medicine bottles/blisters to get elderly dosage guide & audio instructions.',
      descMy: 'သက်ကြီးရွယ်အိုများအတွက် ဆေးဝါးဓာတ်ပုံရိုက်၍ အမည်၊ သောက်သုံးပုံနှင့် သတိပြုရန်များကို အသံဖြင့် ရှင်းပြပေးခြင်း။',
      tagEn: 'Photo AI',
      tagMy: 'ဓာတ်ပုံစစ်ဆေး',
      icon: <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      colorClass: 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500',
      accentClass: 'text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'posts',
      titleEn: 'Bulletins & Dynamic Posts',
      titleMy: 'ကျန်းမာရေး သတင်းလွှာများ',
      descEn: 'Dynamic articles, health advisories and photos synced directly from Supabase.',
      descMy: 'Supabase မှ တိုက်ရိုက်ဆောင်းပါးများ၊ ကျန်းမာရေး သတင်းလွှာနှင့် ဓာတ်ပုံများ။',
      tagEn: 'Live Feed',
      tagMy: 'သတင်းလွှာ',
      icon: <Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      colorClass: 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500',
      accentClass: 'text-blue-800 dark:text-blue-300',
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-black comfort:bg-[#faf6ee] border-b border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* Top Header & Search Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-black dark:text-white comfort:text-[#231f1a] text-xs font-semibold tracking-wide uppercase mb-3 border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                {language === 'my' 
                  ? 'အမျိုးသား ဆေးဖက်ဝင်အပင်များ ကျမ်းနှင့် ကုထုံးလမ်းညွှန်' 
                  : 'National Herbal Pharmacopoeia & Clinical Guide'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white comfort:text-[#231f1a] leading-[1.15]">
              {language === 'my' 
                ? 'မြန်မာ့တိုင်းရင်းဆေးပညာနှင့် အရေးပေါ်ကျန်းမာရေး သုတဘဏ်' 
                : 'Traditional Herbal Medicine & Clinical Health Repository'}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 comfort:text-[#645a4e] mt-3 max-w-xl leading-relaxed font-myanmar">
              {language === 'my'
                ? 'ရိုးရာတိုင်းရင်းဆေး အသိအမှတ်ပြု ဆေးဖက်ဝင်အပင် ၁၂၀ ကျော်၏ အာနိသင်များ၊ သောက်သုံးပုံနှင့် အရေးပေါ် အသက်ကယ် ရှေးဦးသူနာပြုစုနည်းများကို စနစ်တကျ စိစစ်ဖတ်ရှုနိုင်ပါသည်။'
                : 'Search evidence-based traditional remedies, botanically verified medicinal herbs, and standardized life-safety emergency protocols.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5 pt-3 border-t border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] w-full">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'my' ? 'ဝန်ကြီးဌာန စံနှုန်း' : 'Accredited Monograph'}</span>
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035]">
                <HeartPulse className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>{language === 'my' ? '၁၉၂ လူနာတင်ယာဉ်' : '192 Ambulance'}</span>
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035]">
                <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{language === 'my' ? '၄၀+ သက်ကြီးစောင့်ရှောက်မှု' : '40+ Senior Care'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Clean Search Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] rounded-3xl p-5 sm:p-6 shadow-sm border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
                <span className="text-sm font-bold text-black dark:text-white comfort:text-[#231f1a]">
                  {language === 'my' ? 'ဆေးပညာနှင့် ရှေးဦးပြုစုနည်း ရှာဖွေမှု' : 'Clinical Knowledge Search'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e]">
                  {language === 'my' ? 'တိုက်ရိုက်စနစ်' : 'Live Index'}
                </span>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-3 relative">
                <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] rounded-2xl px-3.5 py-2.5 border border-transparent focus-within:border-black dark:focus-within:border-white focus-within:bg-white dark:focus-within:bg-neutral-900 transition-all">
                  <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                  <input
                    className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm font-medium text-black dark:text-white comfort:text-[#231f1a] placeholder-neutral-500 focus:outline-none font-myanmar"
                    placeholder={
                      language === 'my'
                        ? 'ဆေးပင်အမည်၊ သွေးတိုး၊ ဆီးချို၊ ဒူးနာ၊ ရှေးဦးပြုစုနည်း...'
                        : 'Search symptoms, herbs, or first aid protocols...'
                    }
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="text-neutral-400 hover:text-black dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Instant preview dropdown */}
                {showDropdown && (matchedHerbs.length > 0 || matchedProtocols.length > 0) && (
                  <div className="absolute top-12 left-0 right-0 z-30 bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1] rounded-2xl shadow-xl max-h-72 overflow-y-auto p-2">
                    {matchedHerbs.length > 0 && (
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1 block">
                          {language === 'my' ? 'ဆေးဖက်ဝင်အပင်များ' : 'Medicinal Plants'}
                        </span>
                        {matchedHerbs.slice(0, 4).map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            onClick={() => {
                              onSelectHerb(h);
                              setShowDropdown(false);
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 comfort:hover:bg-[#f2e9d8] flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-black dark:text-white comfort:text-[#231f1a] mr-1.5">{h.englishName}</span>
                              <span className="text-neutral-500 font-myanmar">({h.myanmarName})</span>
                            </div>
                            <span className="italic text-[11px] text-neutral-400">{h.scientificName}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {matchedProtocols.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1 block">
                          {language === 'my' ? 'ရှေးဦးပြုစုနည်းများ' : 'First Aid Protocols'}
                        </span>
                        {matchedProtocols.slice(0, 3).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              onSelectProtocol(p);
                              setShowDropdown(false);
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 comfort:hover:bg-[#f2e9d8] flex items-center justify-between text-xs font-myanmar"
                          >
                            <span className="font-semibold text-black dark:text-white comfort:text-[#231f1a]">
                              {language === 'my' ? p.myanmarTitle : p.title}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-200 dark:bg-neutral-700">
                              {p.badge}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'my' ? 'ရှာဖွေပါ' : 'Lookup Protocol or Herb'}</span>
                </button>
              </form>

              {/* Quick frequent queries chips */}
              <div className="mt-3 pt-3 border-t border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 font-myanmar">
                  {language === 'my' ? 'အမြန်ရှာဖွေရန် အညွှန်းများ:' : 'Frequent Searches:'}
                </span>
                <div className="flex flex-wrap gap-1.5 font-myanmar">
                  {(language === 'my'
                    ? ['သွေးတိုး (BP)', 'ဆီးချိုထိန်း', 'ဒူးနာ၊ အရိုးအဆစ်', 'လေဖြတ် FAST', 'မီးလောင်', 'မြွေကိုက်', 'ချင်း (Ginger)']
                    : ['Blood Pressure', 'Diabetes Control', 'Joint Pain', 'Stroke FAST', 'Burns', 'Snakebite', 'Ginger Root']
                  ).map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickChip(chip)}
                      className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] text-[11px] font-medium transition-colors cursor-pointer"
                      type="button"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 40+ Senior Health Highlight Banner (Clean & Authoritative) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wide">
                  {language === 'my' ? '၄၀+ သီးသန့် ကဏ္ဍ' : 'Special Feature for 40+'}
                </span>
                <span className="text-xs text-amber-900 dark:text-amber-300 comfort:text-amber-950 font-semibold font-myanmar">
                  {language === 'my' ? 'အထူးကုဆရာဝန်နှင့် တိုင်းရင်းဆေးပညာရှင်များ အကြံပြုချက်' : 'Senior Health & Longevity'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white comfort:text-[#231f1a] mt-1">
                {language === 'my' 
                  ? 'အသက် ၄၀ ကျော်များအတွက် သွေးတိုး၊ ဆီးချို၊ အဆစ်အမြစ်နှင့် နှလုံးကျန်းမာရေး' 
                  : '40+ Vitality & Chronic Care: Hypertension, Diabetes & Joint Health'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 comfort:text-[#645a4e] font-myanmar mt-0.5">
                {language === 'my'
                  ? 'အသံဖြင့် ဖတ်ပြပေးသောစနစ် (Audio Read-Aloud)၊ စာလုံးအရွယ်အစား (A- A+) နှင့် မျက်စိအေး (Comfort) စနစ်များ ပါဝင်ပါသည်။'
                  : 'Equipped with Voice Audio Read-Aloud, A- to A+ font scaling, and Eye-Comfort reading mode.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchSection('senior')}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shrink-0 shadow-xs"
            type="button"
          >
            <span className="font-myanmar">{language === 'my' ? '၄၀+ ကျန်းမာရေးကဏ္ဍ ဖွင့်ပါ' : 'Open 40+ Health Hub'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Pristine, Non-Mesh Section Cards (Direct, Clean, Professional) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 comfort:text-[#645a4e] font-myanmar">
              {language === 'my' ? 'အဓိက ကျန်းမာရေး ကဏ္ဍများ' : 'Explore Platform Sections'}
            </h3>
            <span className="text-xs text-neutral-400 font-myanmar">
              {language === 'my' ? 'ကဏ္ဍတစ်ခုကို နှိပ်၍ တိုက်ရိုက်ဖတ်ရှုနိုင်ပါသည်' : 'Click any section to view details'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectionCards.map((card) => (
              <div
                key={card.id}
                onClick={() => onSwitchSection(card.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md ${card.colorClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] flex items-center justify-center shadow-xs border border-border-subtle dark:border-neutral-800">
                      {card.icon}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/80 dark:bg-black/80 text-black dark:text-white shadow-2xs">
                      {language === 'my' ? card.tagMy : card.tagEn}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-black dark:text-white comfort:text-[#231f1a] font-myanmar">
                    {language === 'my' ? card.titleMy : card.titleEn}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] font-myanmar mt-1.5 leading-relaxed line-clamp-3">
                    {language === 'my' ? card.descMy : card.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-bold">
                  <span className={`font-myanmar ${card.accentClass}`}>
                    {language === 'my' ? 'ဖွင့်ရန်' : 'Explore'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
