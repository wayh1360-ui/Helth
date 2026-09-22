import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Droplet, 
  Shield, 
  Moon, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  Bot, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info, 
  BookOpen, 
  Sparkles, 
  HeartPulse, 
  Settings, 
  Edit3,
  Layers,
  Heart,
  ShieldAlert
} from 'lucide-react';
import { SENIOR_HEALTH_DATA } from '../data/seniorHealth';
import { getManagedSeniorTopics } from '../lib/contentManager';
import { SeniorHealthTopic, Herb } from '../types';

interface SeniorHealthHubProps {
  language: 'en' | 'my';
  onOpenHerb: (herbId: string) => void;
  onOpenAssistantWithPrompt: (prompt: string) => void;
  onManageSection?: () => void;
}

export const SeniorHealthHub: React.FC<SeniorHealthHubProps> = ({
  language,
  onOpenHerb,
  onOpenAssistantWithPrompt,
  onManageSection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [topics, setTopics] = useState<SeniorHealthTopic[]>(() => getManagedSeniorTopics());
  const [expandedTopicIds, setExpandedTopicIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    const initialTopics = getManagedSeniorTopics();
    if (initialTopics.length > 0) initial.add(initialTopics[0].id);
    return initial;
  });
  const [activeTopicTabs, setActiveTopicTabs] = useState<Record<string, 'remedies' | 'vitals_lifestyle' | 'precautions'>>({});

  // Listen for real-time section updates from Admin
  useEffect(() => {
    const handleUpdate = () => {
      setTopics(getManagedSeniorTopics());
    };
    window.addEventListener('tmhip_content_updated', handleUpdate);
    return () => window.removeEventListener('tmhip_content_updated', handleUpdate);
  }, []);

  const toggleTopic = (id: string) => {
    setExpandedTopicIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllTopics = (expand: boolean) => {
    if (expand) {
      setExpandedTopicIds(new Set(filteredTopics.map(t => t.id)));
    } else {
      setExpandedTopicIds(new Set());
    }
  };

  const setTopicTab = (topicId: string, tab: 'remedies' | 'vitals_lifestyle' | 'precautions') => {
    setActiveTopicTabs(prev => ({ ...prev, [topicId]: tab }));
  };

  // Audio Speech synthesis for 40+ accessibility (Presbyopia / eye strain)
  const handleSpeakText = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower, more clear for older adults
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const categories = [
    { id: 'all', labelEn: 'All 40+ Topics', labelMy: 'အကြောင်းအရာ အားလုံး' },
    { id: 'cardiovascular', labelEn: 'Blood Pressure & Heart', labelMy: 'သွေးတိုးနှင့် နှလုံး' },
    { id: 'metabolic', labelEn: 'Blood Sugar & Diabetes', labelMy: 'ဆီးချို / သွေးချို' },
    { id: 'musculoskeletal', labelEn: 'Joints & Knee Pain', labelMy: 'ဒူးနာနှင့် အရိုးအဆစ်' },
    { id: 'neurological', labelEn: 'Sleep & Brain Vitality', labelMy: 'အိပ်စက်ခြင်းနှင့် မှတ်ဉာဏ်' },
  ];

  const filteredTopics = selectedCategory === 'all' 
    ? topics 
    : topics.filter((t) => t.category === selectedCategory);

  const getMetricLabel = (metric: string) => {
    if (language !== 'my') return metric;
    if (metric.includes('Blood Pressure')) return 'သွေးပေါင်ချိန် စံနှုန်း (mmHg)';
    if (metric.includes('Blood Glucose') || metric.includes('Sugar')) return 'အစာမစားမီ သွေးတွင်းသကြားဓာတ် (mg/dL)';
    if (metric.includes('Joint Pain') || metric.includes('Pain Scale')) return 'အရိုးအဆစ် နာကျင်မှု အတိုင်းအတာ (၁-၁၀)';
    if (metric.includes('Sleep')) return 'ညစဉ် နှစ်ခြိုက်စွာ အိပ်ပျော်ချိန် (နာရီ)';
    return metric;
  };

  return (
    <div className="w-full bg-neutral-50/50 dark:bg-neutral-950/50 comfort:bg-[#f7f1e4]/50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Header Hero Banner for 40+ & Elders */}
        <div className="bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 comfort:text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{language === 'my' ? 'အသက် ၄၀ ကျော်နှင့် သက်ကြီးကျန်းမာရေး' : 'Clinical Longevity & Chronic Care (40+)'}</span>
                </div>

                {onManageSection && (
                  <button
                    type="button"
                    onClick={onManageSection}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 comfort:bg-[#f2e9d8] text-neutral-800 dark:text-neutral-200 text-xs font-bold transition border border-neutral-300 dark:border-neutral-700 cursor-pointer"
                    title="Admin: Edit 40+ Care Content"
                  >
                    <Edit3 className="w-3 h-3 text-amber-600" />
                    <span>{language === 'my' ? 'အချက်အလက် ပြင်ဆင်ရန်' : 'Update Section'}</span>
                  </button>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-black dark:text-white comfort:text-[#231f1a] tracking-tight leading-tight">
                {language === 'my' 
                  ? 'အသက် ၄၀ ကျော် ကျန်းမာရေးနှင့် တိုင်းရင်းဆေး စောင့်ရှောက်မှု' 
                  : '40+ Vitality, Chronic Care & Herbal Health'}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 comfort:text-[#645a4e] mt-2 max-w-3xl leading-relaxed font-myanmar">
                {language === 'my'
                  ? 'အသက် ၄၀ ကျော်အရွယ်တွင် အဖြစ်များသော သွေးတိုး၊ ဆီးချို၊ ဒူးနာအဆစ်နာ၊ အိပ်မပျော်ခြင်းများကို တိုင်းရင်းဆေးနှင့် ခေတ်မီဆေးပညာ ပေါင်းစပ်၍ ဘေးထွက်ဆိုးကျိုးကင်းစွာ ထိန်းသိမ်းစောင့်ရှောက်နည်းများ။'
                  : 'Clinically vetted guidance for hypertension, glycemic balance, joint preservation, and restorative sleep designed specifically for adults over 40.'}
              </p>
            </div>

            {/* Quick Emergency Banner for 40+ High Risk */}
            <div className="shrink-0 p-4 rounded-2xl bg-red-500/10 dark:bg-red-950/30 border border-red-500/25 text-red-900 dark:text-red-200 max-w-xs">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-red-700 dark:text-red-400 mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{language === 'my' ? 'အရေးပေါ် လက္ခဏာများ' : 'Red Flag Alert'}</span>
              </div>
              <p className="text-xs leading-relaxed font-myanmar">
                {language === 'my'
                  ? 'သွေးပေါင် ၁၈၀ ကျော်ခြင်း၊ မျက်နှာရွဲ့ခြင်း၊ ရင်ဘတ်အလွန်အောင့်ပါက ချက်ချင်း လူနာတင်ယာဉ် ၁၉၂ သို့ ခေါ်ပါ။'
                  : 'BP > 180, facial droop, or crushing chest pain require immediate ER ambulance 192.'}
              </p>
              <a
                href="tel:192"
                className="mt-2.5 inline-flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'my' ? '၁၉၂ အရေးပေါ် ချက်ချင်းခေါ်ပါ' : 'Call 192 Ambulance'}</span>
              </a>
            </div>
          </div>

          {/* Condition Category Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1]'
                }`}
                type="button"
              >
                {language === 'my' ? cat.labelMy : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Topic List Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white comfort:text-[#231f1a] font-myanmar">
              {language === 'my' 
                ? `အသက် ၄၀+ ဆေးပညာလမ်းညွှန် (${filteredTopics.length}) ခု` 
                : `40+ Clinical Health Guides (${filteredTopics.length})`}
            </h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-myanmar hidden sm:inline">
              {language === 'my' ? '• အသေးစိတ် ဖတ်ရှုရန် ကတ်တစ်ခုချင်း နှိပ်နိုင်ပါသည်' : '• Tap any topic card to view full guide'}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => toggleAllTopics(true)}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer font-myanmar border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1]"
              type="button"
            >
              {language === 'my' ? 'အားလုံး ဖွင့်ဖတ်မည်' : 'Expand All'}
            </button>
            <button
              onClick={() => toggleAllTopics(false)}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer font-myanmar border border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1]"
              type="button"
            >
              {language === 'my' ? 'အားလုံး ခေါက်သိမ်းမည်' : 'Collapse All'}
            </button>
          </div>
        </div>

        {/* Clean, Non-Mesh Medical Topic Cards */}
        <div className="grid grid-cols-1 gap-5">
          {filteredTopics.map((topic) => {
            const isSpeaking = speakingId === topic.id;
            const isExpanded = expandedTopicIds.has(topic.id);
            const activeTab = activeTopicTabs[topic.id] || 'remedies';

            const fullTextToRead = language === 'my' 
              ? `${topic.titleMy}။ ${topic.subtitleMy}။ တိုင်းရင်းဆေးနည်းများ - ${topic.herbalRemedies.map(r => `${r.nameMy}၊ ${r.actionMy}။ ${r.prepMy}`).join('။ ')}။`
              : `${topic.titleEn}. ${topic.subtitleEn}. Herbal treatments: ${topic.herbalRemedies.map(r => `${r.nameEn}: ${r.actionEn}`).join('. ')}`;

            const topicCategoryLabel = categories.find(c => c.id === topic.category);

            return (
              <div
                key={topic.id}
                className="bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] rounded-3xl overflow-hidden shadow-xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all"
                id={`topic-${topic.id}`}
              >
                {/* Topic Header: Interactive Summary Card */}
                <div 
                  onClick={() => toggleTopic(topic.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 comfort:hover:bg-[#f2e9d8]/40 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 comfort:text-amber-950 font-myanmar border border-amber-500/20">
                        {language === 'my' ? (topicCategoryLabel?.labelMy || topic.category) : (topicCategoryLabel?.labelEn || topic.category)}
                      </span>
                      {topic.vitalGuide && (
                        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 font-myanmar hidden sm:inline">
                          {language === 'my' ? `စံနှုန်း: ${topic.vitalGuide.normal}` : `Target: ${topic.vitalGuide.normal}`}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white comfort:text-[#231f1a] tracking-tight font-myanmar">
                      {language === 'my' ? topic.titleMy : topic.titleEn}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 comfort:text-[#645a4e] mt-1 font-myanmar line-clamp-2 leading-relaxed">
                      {language === 'my' ? topic.subtitleMy : topic.subtitleEn}
                    </p>

                    {/* Quick Preview Chips (Clean glance at remedies) */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      <span className="text-[11px] text-neutral-400 font-myanmar mr-1">
                        {language === 'my' ? 'အကြံပြုဆေးပင်များ:' : 'Herbs:'}
                      </span>
                      {topic.herbalRemedies.map((remedy, rIdx) => (
                        <span 
                          key={rIdx}
                          className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-xs font-semibold text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] font-myanmar"
                        >
                          🌿 {language === 'my' ? remedy.nameMy : remedy.nameEn}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Chevron Button */}
                  <div className="flex items-center gap-2 self-start md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800 comfort:border-[#ded4c1] w-full md:w-auto justify-between md:justify-end">
                    <div className="flex items-center gap-2">
                      {/* Read Aloud Audio Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeakText(fullTextToRead, topic.id);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                          isSpeaking
                            ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                            : 'bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] border-border-subtle dark:border-neutral-700 comfort:border-[#ded4c1] hover:text-black dark:hover:text-white'
                        }`}
                        type="button"
                        title={isSpeaking ? 'Stop reading' : 'Read aloud with audio'}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-neutral-500" />}
                        <span className="font-myanmar text-[11px] sm:text-xs">
                          {isSpeaking ? (language === 'my' ? 'ရပ်တန့်' : 'Stop') : (language === 'my' ? 'အသံဖြင့် နားထောင်' : 'Listen')}
                        </span>
                      </button>

                      {/* Ask AI Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAssistantWithPrompt(
                            language === 'my' 
                              ? `${topic.titleMy} အတွက် အိမ်တွင်း တိုင်းရင်းဆေး အသုံးပြုပုံနှင့် သတိပြုရန် ရှင်းပြပါ`
                              : `What are the evidence-based herbal remedies and lifestyle steps for ${topic.titleEn}?`
                          );
                        }}
                        className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] text-[11px] sm:text-xs font-bold flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer shadow-xs"
                        type="button"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span className="font-myanmar">{language === 'my' ? 'AI မေးမည်' : 'Ask AI'}</span>
                      </button>
                    </div>

                    {/* Expand/Collapse Toggle Button */}
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 comfort:text-emerald-950 pl-2">
                      <span className="font-myanmar hidden sm:inline">
                        {isExpanded 
                          ? (language === 'my' ? 'ခေါက်သိမ်းရန်' : 'Collapse')
                          : (language === 'my' ? 'အသေးစိတ် ဖတ်ရန်' : 'View Guide')}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 comfort:bg-[#f2e9d8] flex items-center justify-center">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Guide with Clean Tabbed Navigation (Zero Mesh) */}
                {isExpanded && (
                  <div className="border-t border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] p-5 sm:p-7 bg-neutral-50/50 dark:bg-neutral-950/40 comfort:bg-[#f7f1e4]/40">
                    
                    {/* Clean Sub-Tabs */}
                    <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800 comfort:border-[#ded4c1]">
                      <button
                        onClick={() => setTopicTab(topic.id, 'remedies')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer font-myanmar ${
                          activeTab === 'remedies'
                            ? 'bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-border-subtle dark:border-neutral-800'
                        }`}
                        type="button"
                      >
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span>{language === 'my' ? 'တိုင်းရင်းဆေးနည်းများနှင့် ဖျော်စပ်ပုံ' : 'Herbal Remedies & Prep'}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200">
                          {topic.herbalRemedies.length}
                        </span>
                      </button>

                      <button
                        onClick={() => setTopicTab(topic.id, 'vitals_lifestyle')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer font-myanmar ${
                          activeTab === 'vitals_lifestyle'
                            ? 'bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-border-subtle dark:border-neutral-800'
                        }`}
                        type="button"
                      >
                        <Activity className="w-4 h-4 text-amber-500" />
                        <span>{language === 'my' ? 'စံနှုန်းနှင့် နေထိုင်စားသောက်မှု' : 'Vitals & Daily Lifestyle'}</span>
                      </button>

                      <button
                        onClick={() => setTopicTab(topic.id, 'precautions')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer font-myanmar ${
                          activeTab === 'precautions'
                            ? 'bg-black text-white dark:bg-white dark:text-black comfort:bg-[#231f1a] comfort:text-[#faf6ee] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-border-subtle dark:border-neutral-800'
                        }`}
                        type="button"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        <span>{language === 'my' ? 'ဆရာဝန် သတိပေးချက်နှင့် ရှောင်ရန်' : 'Precautions & Warnings'}</span>
                      </button>
                    </div>

                    {/* Tab 1 Content: Herbal Formulations & Preparation */}
                    {activeTab === 'remedies' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {topic.herbalRemedies.map((remedy, idx) => (
                            <div
                              key={idx}
                              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1] flex flex-col justify-between shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-100 dark:border-neutral-800 comfort:border-[#ded4c1]">
                                  <h4 className="font-bold text-sm sm:text-base text-black dark:text-white comfort:text-[#231f1a] flex items-center gap-2 font-myanmar">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                                    <span>{language === 'my' ? remedy.nameMy : remedy.nameEn}</span>
                                  </h4>
                                  <button
                                    type="button"
                                    onClick={() => onOpenHerb(remedy.herbId)}
                                    className="px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 comfort:text-emerald-950 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    <span className="font-myanmar">{language === 'my' ? 'ဆေးကျမ်း' : 'Monograph'}</span>
                                  </button>
                                </div>

                                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] leading-relaxed mb-4 font-myanmar">
                                  {language === 'my' ? remedy.actionMy : remedy.actionEn}
                                </p>

                                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 comfort:bg-[#f2e9d8]/60 border border-neutral-200 dark:border-neutral-800 comfort:border-[#ded4c1]">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 comfort:text-amber-950 block mb-1 font-myanmar">
                                    {language === 'my' ? 'ဖျော်စပ်နှင့် သောက်သုံးနည်း:' : 'Dosage & Preparation:'}
                                  </span>
                                  <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 comfort:text-[#231f1a] font-myanmar leading-relaxed">
                                    {language === 'my' ? remedy.prepMy : remedy.prepEn}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 2 Content: Vitals & Lifestyle Guidance */}
                    {activeTab === 'vitals_lifestyle' && (
                      <div className="space-y-6">
                        {topic.vitalGuide && (
                          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
                            <div className="text-xs sm:text-sm font-bold text-black dark:text-white comfort:text-[#231f1a] mb-3 font-myanmar flex items-center gap-2">
                              <Activity className="w-4 h-4 text-emerald-600" />
                              <span>{language === 'my' ? 'အရေးကြီး တိုင်းတာစစ်ဆေးမှု စံနှုန်းများ' : 'Clinical Vital Thresholds'}: {getMetricLabel(topic.vitalGuide.metric)}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 comfort:text-emerald-950 font-myanmar">
                                <span className="block font-bold text-[11px] uppercase tracking-wider mb-1 text-emerald-800 dark:text-emerald-400">
                                  {language === 'my' ? 'ပုံမှန်အဆင့် (Target)' : 'Target / Normal'}
                                </span>
                                <div className="font-bold text-base">{topic.vitalGuide.normal}</div>
                              </div>

                              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 comfort:text-amber-950 font-myanmar">
                                <span className="block font-bold text-[11px] uppercase tracking-wider mb-1 text-amber-800 dark:text-amber-400">
                                  {language === 'my' ? 'သတိပြုရန် အဆင့်' : 'Elevated / Caution'}
                                </span>
                                <div className="font-bold text-base">{topic.vitalGuide.warning}</div>
                              </div>

                              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-900 dark:text-red-200 comfort:text-red-950 font-myanmar">
                                <span className="block font-bold text-[11px] uppercase tracking-wider mb-1 text-red-800 dark:text-red-400">
                                  {language === 'my' ? 'အန္တရာယ်ရှိ အဆင့်' : 'Urgent / Crisis'}
                                </span>
                                <div className="font-bold text-base">{topic.vitalGuide.crisis}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-border-subtle dark:border-neutral-800 comfort:border-[#ded4c1]">
                          <span className="text-xs sm:text-sm font-bold text-black dark:text-white comfort:text-[#231f1a] block mb-3 font-myanmar">
                            {language === 'my' ? 'နေ့စဉ် နေထိုင်စားသောက်မှု လမ်းညွှန်ချက်များ' : 'Lifestyle & Dietary Guidelines'}
                          </span>
                          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 comfort:text-[#4a4035] font-myanmar">
                            {(language === 'my' ? topic.lifestyleTipsMy : topic.lifestyleTipsEn).map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Tab 3 Content: Precautions & Contraindications */}
                    {activeTab === 'precautions' && (
                      <div className="p-5 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 text-red-900 dark:text-red-200 comfort:text-red-950">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-400 block mb-3 font-myanmar flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span>{language === 'my' ? 'ဆရာဝန် သတိပေးချက်နှင့် ရှောင်ကြဉ်ရန်များ' : 'Clinical Precautions & Contraindications'}</span>
                        </span>
                        <ul className="space-y-2.5 text-xs sm:text-sm font-myanmar">
                          {(language === 'my' ? topic.precautionsMy : topic.precautionsEn).map((p, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2"></span>
                              <span className="leading-relaxed">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
