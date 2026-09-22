import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, VolumeX, Globe } from 'lucide-react';
import { Herb } from '../types';
import { getLocalizedHerbMonograph } from '../lib/myanmarHerbHelper';

interface HerbMonographModalProps {
  herb: Herb | null;
  onClose: () => void;
  language: 'en' | 'my';
}

export const HerbMonographModal: React.FC<HerbMonographModalProps> = ({
  herb,
  onClose,
  language,
}) => {
  // Allow user to switch language directly inside the monograph modal
  const [modalLang, setModalLang] = useState<'en' | 'my'>(language);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    setModalLang(language);
  }, [language]);

  // Clean up any ongoing speech synthesis when closing or unmounting
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [herb]);

  if (!herb) return null;

  const isMyanmar = modalLang === 'my';

  // Comprehensive localized data selector ensuring 100% full Myanmar monographs
  const {
    displayName,
    secondaryName,
    pharmaceuticalPart,
    chemicalFamily,
    primaryDescription,
    dosage,
    preparation,
    clinicalIndication,
    tags,
    activeCompounds,
    traditionalUses,
    contraindications,
  } = getLocalizedHerbMonograph(herb, modalLang);

  // Audio Speech synthesis toggle
  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = isMyanmar
      ? `${herb.myanmarName}။ ${primaryDescription}။ ပုံမှန်သောက်သုံးရန် - ${dosage}။ ဆေးဖော်စပ်ပုံ - ${preparation}။`
      : `${herb.englishName}, scientifically known as ${herb.scientificName}. ${primaryDescription}. Standard dosage: ${dosage}. Preparation: ${preparation}.`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = isMyanmar ? 'my-MM' : 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Status Bar */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          <img
            src={herb.imageUrl}
            alt={herb.scientificName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* Top Controls: Language Switcher, Audio, and Close Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            {/* Inline Monograph Language Switcher */}
            <div className="flex items-center bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-md">
              <Globe className="w-3.5 h-3.5 text-neutral-300 ml-2 mr-1" />
              <button
                type="button"
                onClick={() => setModalLang('my')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold font-myanmar transition-all cursor-pointer ${
                  modalLang === 'my'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                မြန်မာ
              </button>
              <button
                type="button"
                onClick={() => setModalLang('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  modalLang === 'en'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Speech Narration Button */}
              <button
                type="button"
                onClick={toggleSpeech}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-md ${
                  isSpeaking
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-black/60 backdrop-blur-md text-white hover:bg-black/90 border border-white/20'
                }`}
                title={isSpeaking ? (isMyanmar ? 'အသံရပ်တန့်မည်' : 'Stop Narration') : (isMyanmar ? 'အသံဖြင့် နားထောင်မည်' : 'Listen to Monograph')}
                aria-label="Toggle narration"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black transition-colors cursor-pointer shadow-md"
                aria-label="Close monograph"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Botanical Badges & Botanical Titles */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-white text-black px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-myanmar shadow-sm">
                {isMyanmar ? 'တရားဝင် ဆေးကျမ်းမှတ်တမ်း' : 'OFFICIAL MONOGRAPH'}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-neutral-200 border border-white/20 font-myanmar">
                {chemicalFamily}
              </span>
              {herb.verified && (
                <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm font-myanmar">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isMyanmar ? 'စိစစ်ပြီး' : 'Vetted'}</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-myanmar text-white leading-snug">
              {displayName}
            </h2>

            <p className="text-xs sm:text-sm font-medium text-neutral-200 font-myanmar mt-0.5 flex flex-wrap items-center gap-1.5">
              <span>{secondaryName}</span>
              <span className="text-neutral-400">•</span>
              <span className="text-emerald-300 font-semibold">{pharmaceuticalPart}</span>
            </p>
          </div>
        </div>

        {/* Monograph Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 font-myanmar"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Overview / Therapeutic Summary */}
          <div className="rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 font-myanmar">
              {isMyanmar ? 'ကုသမှုဆိုင်ရာ အကျဉ်းချုပ် (Therapeutic Summary)' : 'Therapeutic Summary'}
            </h3>
            <p className="text-sm sm:text-[15px] text-neutral-900 dark:text-neutral-100 font-myanmar leading-[1.8]" lang={isMyanmar ? 'my' : 'en'}>
              {primaryDescription}
            </p>
          </div>

          {/* Active Biochemical Compounds */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2.5 font-myanmar">
              {isMyanmar ? 'အဓိက ဇီဝဓာတု ဒြပ်ပေါင်းများ (Active Phytochemicals)' : 'Key Bioactive Phytochemicals'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeCompounds.map((comp, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 font-myanmar"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Traditional Formulations & Preparations */}
          <div>
            <h3 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2.5 font-myanmar">
              {isMyanmar ? 'ရိုးရာတိုင်းရင်းဆေး သုံးစွဲပုံ နည်းလမ်းများ' : 'Traditional Indigenous Applications'}
            </h3>
            <ul className="space-y-2">
              {traditionalUses.map((use, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 font-myanmar leading-[1.75]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Dosages & Preparation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5 font-myanmar">
                {isMyanmar ? 'ပုံမှန် သောက်သုံးရန် ပမာဏ (Standard Dosage)' : 'Standard Dosage'}
              </span>
              <p className="text-xs sm:text-[13px] font-medium text-neutral-800 dark:text-neutral-200 leading-[1.8] font-myanmar">
                {dosage}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5 font-myanmar">
                {isMyanmar ? 'ဆေးဖော်စပ်ပုံ နည်းလမ်း (Preparation Method)' : 'Preparation Method'}
              </span>
              <p className="text-xs sm:text-[13px] font-medium text-neutral-800 dark:text-neutral-200 leading-[1.8] font-myanmar">
                {preparation}
              </p>
            </div>
          </div>

          {/* Contraindications & Clinical Cautions */}
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
            <div className="flex items-center gap-2 text-xs font-bold text-red-900 dark:text-red-300 uppercase tracking-wider mb-2 font-myanmar">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              <span>{isMyanmar ? 'အထူးရှောင်ရန်နှင့် ဆေးဝါးဓာတ်ပြုမှုများ' : 'Contraindications & Drug Interactions'}</span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {contraindications.map((contra, i) => (
                <li key={i} className="text-xs sm:text-[13px] text-red-800 dark:text-red-300 leading-[1.75] list-disc list-inside font-myanmar">
                  {contra}
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Indication / Pharmacological Mechanism */}
          <div className="p-4 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 dark:border dark:border-neutral-800">
            <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-1.5 font-myanmar">
              {isMyanmar ? 'ဆေးဝါးဗေဒဆိုင်ရာ အာနိသင် (Pharmacological Mechanism)' : 'Pharmacological Mechanism'}
            </div>
            <p className="text-xs sm:text-[13px] font-medium text-neutral-200 leading-[1.8] font-myanmar">
              {clinicalIndication}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/80">
          <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-myanmar">
            {isMyanmar ? 'ကျန်းမာရေးဝန်ကြီးဌာန • TMHIP စံချိန်စံညွှန်း မှတ်တမ်း' : 'Ministry of Health • TMHIP Standardized Record'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-bold transition-opacity cursor-pointer font-myanmar"
          >
            {isMyanmar ? 'ဆေးကျမ်း ပိတ်မည်' : 'Close Monograph'}
          </button>
        </div>
      </div>
    </div>
  );
};
