import React, { useState } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { Herb } from '../types';
import { getLocalizedHerbMonograph } from '../lib/myanmarHerbHelper';

interface HerbCatalogModalProps {
  herbs: Herb[];
  isOpen: boolean;
  onClose: () => void;
  onSelectHerb: (herb: Herb) => void;
  language: 'en' | 'my';
}

export const HerbCatalogModal: React.FC<HerbCatalogModalProps> = ({
  herbs,
  isOpen,
  onClose,
  onSelectHerb,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: language === 'my' ? 'အားလုံး' : 'All Disciplines' },
    { id: 'digestive', label: language === 'my' ? 'အစာခြေစနစ်' : 'Digestive' },
    { id: 'antimicrobial', label: language === 'my' ? 'ပိုးသတ်ဆေးဖက်ဝင်' : 'Antimicrobial' },
    { id: 'anti-inflammatory', label: language === 'my' ? 'ရောင်ရမ်းသက်သာ' : 'Anti-inflammatory' },
    { id: 'adaptogen', label: language === 'my' ? 'အသက်ရှူလမ်းကြောင်း/အားတိုး' : 'Adaptogen / Respiratory' },
    { id: 'circulatory', label: language === 'my' ? 'သွေးလည်ပတ်မှု' : 'Circulatory' },
  ];

  const filteredHerbs = herbs.filter((h) => {
    const matchesCategory = activeCategory === 'all' || h.category === activeCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      h.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.myanmarName.includes(searchTerm) ||
      h.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-border-subtle dark:border-neutral-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-border-subtle dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {language === 'my' ? 'ဆေးဖက်ဝင်အပင်ကျမ်း သုတဘဏ်' : 'Herbal Pharmacopoeia Repository'}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
              {language === 'my' ? 'အသိအမှတ်ပြု ဆေးဖက်ဝင်အပင်များ စာရင်း' : 'Accredited Medicinal Plants Directory'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            aria-label="Close catalog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-6 py-4 bg-neutral-50 dark:bg-neutral-950 border-b border-border-subtle dark:border-neutral-800 space-y-3">
          <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-xl px-4 py-2.5 border border-border-subtle dark:border-neutral-800 focus-within:border-black dark:focus-within:border-white">
            <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
            <input
              type="text"
              className="w-full bg-transparent border-0 p-0 text-xs font-medium text-black dark:text-white placeholder-neutral-400 focus:outline-none font-myanmar"
              placeholder={language === 'my' ? 'ဆေးပင်အမည်၊ မြန်မာအမည် (သို့) ဂုဏ်သတ္တိဖြင့် ရှာရန်...' : 'Search by scientific name, Myanmar name, or active property...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-border-subtle dark:border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Herb Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {filteredHerbs.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
              <p className="text-sm font-semibold font-myanmar">
                {language === 'my' ? 'ကိုက်ညီသော ဆေးပင် မတွေ့ရှိပါ' : 'No medicinal herbs found matching your search.'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold"
              >
                {language === 'my' ? 'အားလုံး ပြန်လည်ပြသပါ' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHerbs.map((herb) => {
                const localized = getLocalizedHerbMonograph(herb, language);
                return (
                  <div
                    key={herb.id}
                    onClick={() => onSelectHerb(herb)}
                    className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-border-subtle dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="h-36 rounded-xl overflow-hidden mb-3 bg-neutral-100 dark:bg-neutral-800 relative">
                        <img
                          src={herb.imageUrl}
                          alt={herb.scientificName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 bg-black/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-myanmar">
                          {localized.chemicalFamily}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white text-[10px] font-semibold px-2 py-0.5 rounded-full font-myanmar">
                          {localized.pharmaceuticalPart}
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 font-myanmar">
                        {localized.displayName}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-myanmar mb-2" lang="my">
                        {localized.secondaryName}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {localized.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-semibold text-black dark:text-white font-myanmar"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed font-myanmar">
                        {localized.primaryDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-subtle dark:border-neutral-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-black dark:text-white font-myanmar">
                        {language === 'my' ? 'ဆေးကျမ်းဖတ်ရှုရန်' : 'View Monograph'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
