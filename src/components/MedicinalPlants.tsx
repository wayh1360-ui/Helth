import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Leaf,
  Info,
  Edit3
} from 'lucide-react';
import { Herb } from '../types';
import { getLocalizedHerbMonograph } from '../lib/myanmarHerbHelper';

interface MedicinalPlantsProps {
  herbs: Herb[];
  onSelectHerb: (herb: Herb) => void;
  onOpenCatalog: () => void;
  language: 'en' | 'my';
  filterText?: string;
  onManageSection?: () => void;
}

export const MedicinalPlants: React.FC<MedicinalPlantsProps> = ({
  herbs,
  onSelectHerb,
  onOpenCatalog,
  language,
  filterText = '',
  onManageSection,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState(filterText);

  const categories = [
    { id: 'all', labelEn: 'All Herbs', labelMy: 'အားလုံး' },
    { id: 'digestive', labelEn: 'Digestive', labelMy: 'အစာခြေစနစ်' },
    { id: 'respiratory', labelEn: 'Respiratory', labelMy: 'အသက်ရှူလမ်းကြောင်း' },
    { id: 'antimicrobial', labelEn: 'Antimicrobial', labelMy: 'ပိုးသတ်ဆေး' },
    { id: 'anti-inflammatory', labelEn: 'Anti-inflammatory', labelMy: 'ရောင်ရမ်းကျစေသော' },
    { id: 'adaptogen', labelEn: 'Adaptogen', labelMy: 'အားတိုးဆေး' },
    { id: 'circulatory', labelEn: 'Circulatory', labelMy: 'သွေးလည်ပတ်မှု' },
  ];

  const filteredHerbs = herbs.filter((herb) => {
    const matchesCategory = activeCategory === 'all' || herb.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      herb.scientificName.toLowerCase().includes(q) ||
      herb.englishName.toLowerCase().includes(q) ||
      herb.myanmarName.includes(q) ||
      herb.clinicalIndication.toLowerCase().includes(q) ||
      herb.tags.some(t => t.toLowerCase().includes(q))
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="medicinal-plants" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-black dark:text-white comfort:text-[#231f1a] text-xs font-semibold mb-2 border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1]">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold">
              {language === 'my' 
                ? 'ဆေးဖက်ဝင်အပင်ကျမ်း • အသိအမှတ်ပြု မျိုးစိတ် ၁၂၀ ကျော်'
                : 'HERBAL PHARMACOPOEIA • 120+ ACCREDITED SPECIES'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black dark:text-white comfort:text-[#231f1a] tracking-tight">
            {language === 'my' ? 'ဆေးဖက်ဝင်အပင်များ သုတဘဏ်' : 'Medicinal Plants Directory'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] mt-1 font-myanmar" lang="my">
            {language === 'my'
              ? 'တိုင်းရင်းဆေးဖက်ဝင် အပင်များနှင့် သုတေသနပြု ဓာတုဗေဒ အချက်အလက်များ'
              : 'Botanically vetted monographs, therapeutic properties and clinical administration.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {onManageSection && (
            <button
              onClick={onManageSection}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 comfort:text-emerald-900 text-xs font-bold transition-colors cursor-pointer border border-emerald-500/30"
              type="button"
              title="Admin: Edit/Add Medicinal Plants"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'my' ? 'အပင်များ ပြင်ဆင်ရန်' : 'Update Section'}</span>
            </button>
          )}

          <button
            onClick={onOpenCatalog}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] hover:bg-neutral-200 dark:hover:bg-neutral-700 text-black dark:text-white comfort:text-[#231f1a] text-xs font-bold transition-colors cursor-pointer border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1]"
            type="button"
            id="view-all-herbs-btn"
          >
            <span className="font-myanmar">{language === 'my' ? 'ဆေးဖက်ဝင်အပင် ၁၂၀+ ကတ်တလောက်ဖွင့်ရန်' : 'Open Full 120+ Catalog'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder={language === 'my' ? 'ဆေးပင်အမည်၊ ဓာတုဗေဒ (သို့) ကုသနိုင်သော ရောဂါဖြင့် ရှာရန်...' : 'Filter herbs by name, chemical family, or medical condition...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-900 comfort:bg-[#f2e9d8] pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm text-black dark:text-white comfort:text-[#231f1a] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white font-myanmar"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] border-transparent shadow-xs'
                    : 'bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                type="button"
              >
                <span className="font-myanmar">{language === 'my' ? cat.labelMy : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Botanical Cards Grid (No Flip Card Clutter) */}
      {filteredHerbs.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-900/50 comfort:bg-[#f2e9d8]/50 rounded-3xl border border-dashed border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
          <p className="text-sm font-semibold text-neutral-500 font-myanmar">
            {language === 'my' ? 'ကိုက်ညီသော ဆေးဖက်ဝင်အပင် မတွေ့ရှိပါ' : 'No medicinal plants match your filter.'}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] text-xs font-bold"
            type="button"
          >
            {language === 'my' ? 'အားလုံး ပြန်လည်ပြသပါ' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredHerbs.map((herb) => {
            const localized = getLocalizedHerbMonograph(herb, language);
            return (
              <div
                key={herb.id}
                onClick={() => onSelectHerb(herb)}
                className="group bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] rounded-3xl overflow-hidden border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                {/* Botanical Plant Image */}
                <div className="w-full h-48 overflow-hidden relative bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8]">
                  <img
                    src={herb.imageUrl}
                    alt={herb.englishName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase font-myanmar">
                    {language === 'my' 
                      ? (categories.find(c => c.id === herb.category)?.labelMy || herb.category)
                      : herb.category}
                  </span>
                  {herb.verified && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs font-myanmar">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{language === 'my' ? 'စိစစ်ပြီး' : 'Vetted'}</span>
                    </span>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Part & Verification Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] font-myanmar">
                        {localized.pharmaceuticalPart}
                      </span>
                      <span className="text-[11px] italic text-neutral-400 dark:text-neutral-500 truncate">
                        {herb.scientificName}
                      </span>
                    </div>

                    {/* Primary Name */}
                    <h3 className="text-lg font-bold text-black dark:text-white comfort:text-[#231f1a] tracking-tight font-myanmar leading-snug">
                      {localized.displayName}
                    </h3>
                    
                    {/* Secondary Name */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 comfort:text-[#645a4e] font-medium mt-0.5 font-myanmar">
                      {localized.secondaryName}
                    </p>

                    {/* Concise Medical Indication with Clean Spacing */}
                    <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] mt-3 line-clamp-2 leading-relaxed font-myanmar">
                      {localized.primaryDescription}
                    </p>
                  </div>

                  {/* Card Footer with Direct Action */}
                  <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 comfort:border-[#ded4c1] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-neutral-400 font-myanmar">
                      {language === 'my' ? 'တရားဝင် ဆေးကျမ်း' : 'Official Monograph'}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 comfort:text-emerald-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-myanmar">
                      <span>{language === 'my' ? 'ဖတ်ရှုရန်' : 'View'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
