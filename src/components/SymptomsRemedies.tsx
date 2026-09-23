import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  Plus, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Leaf, 
  ShieldAlert, 
  Stethoscope, 
  ChevronRight, 
  X, 
  Save, 
  Trash2,
  HelpCircle,
  Pill,
  HeartPulse,
  Thermometer
} from 'lucide-react';
import { CustomSymptomRemedy } from '../types';
import { getManagedSymptoms } from '../lib/contentManager';

export interface SymptomsRemediesProps {
  language: 'en' | 'my';
  onConsultAdvisor?: (prompt: string) => void;
}

const CUSTOM_STORAGE_KEY = 'tmhip_custom_symptom_remedies';

const PRESET_SYMPTOMS: CustomSymptomRemedy[] = [
  {
    id: 'sym-1',
    symptomName: 'Runny Nose / Cold',
    symptomNameMy: 'နှာစီးခြင်း နှင့် အအေးမိခြင်း',
    category: 'respiratory',
    categoryMy: 'အသက်ရှူလမ်းကြောင်း',
    description: 'Nasal congestion, watery rhinorrhea, sneezes, and mild throat irritation.',
    descriptionMy: 'နှာရည်ယိုခြင်း၊ နှာပိတ်ခြင်း၊ နှာချေခြင်းနှင့် လည်ချောင်း ယားယံခြင်း။',
    remedies: [
      'Ginger-Honey Tea: Boiled fresh ginger slice tea with 1 tsp wild honey taken 2-3 times daily.',
      'Basil Steam Inhalation: Inhale steam from boiling water infused with fresh holy basil (ပင်စိမ်း) leaves.',
      'Saltwater Gargle: Warm saltwater gargle twice daily to reduce pharyngeal inflammation.',
      'Warm Hydration & Rest: Drink plenty of lukewarm boiled water; keep body warm.'
    ],
    remediesMy: [
      'ချင်း-ပျားရည် ရေနွေးကြမ်း: ချင်းလက်တစ်ဆစ်ကို ပါးပါးလှီး၍ ရေဆူဆူတွင် ပြုတ်ပြီး ပျားရည်စစ်စစ် ၁ ဇွန်း ရော၍ တစ်နေ့ ၂-၃ ကြိမ် နွေးနွေးလေး သောက်သုံးပါ။',
      'ပင်စိမ်းရွက် ရေနွေးငွေ့ ရှူခြင်း: ပင်စိမ်းရွက် ၇-၁၀ ရွက်ကို ရေနွေးဆူဆူတွင် ခတ်၍ ရေနွေးငွေ့ကို ၅ မိနစ်ခန့် ရှူပေးပါက နှာပိတ်ခြင်း သက်သာစေပါသည်။',
      'ဆားနွေးရေဖြင့် လည်ချောင်း ပလုတ်ကျင်းခြင်း: ရေနွေးနွေးထဲသို့ ဆားအနည်းငယ်ထည့်၍ ပလုတ်ကျင်းပေးပါ။',
      'ရေနွေးနွေး များများသောက်ပြီး ခန္ဓာကိုယ်ကို နွေးထွေးစွာ ထားရှိပါ။'
    ],
    precautions: [
      'If high fever (>38.5°C) persists over 3 days or yellow-green purulent sputum develops, consult a doctor.',
      'Do not take unprescribed antibiotics for viral common cold.'
    ],
    precautionsMy: [
      'အဖျား ၃ ရက်ထက်ပို၍ ဖျားခြင်း၊ အသက်ရှူရ ခက်ခဲခြင်း ရှိပါက ဆရာဝန်နှင့် ချက်ချင်း ပြသပါ။',
      'ဗိုင်းရပ်စ်ကြောင့် ဖြစ်သော အအေးမိခြင်းအတွက် ပဋိဇီဝဆေး (Antibiotics) များကို ဆရာဝန်ညွှန်ကြားချက်မရှိဘဲ မသောက်ပါနှင့်။'
    ]
  },
  {
    id: 'sym-2',
    symptomName: 'Coughing',
    symptomNameMy: 'ချောင်းဆိုးခြင်း',
    category: 'respiratory',
    categoryMy: 'အသက်ရှူလမ်းကြောင်း',
    description: 'Dry or productive cough, bronchial irritation, and throat discomfort.',
    descriptionMy: 'ချောင်းခြောက်ဆိုးခြင်း၊ သလိပ်ကပ်ခြင်းနှင့် ရင်ကျပ် လည်ချောင်းနာခြင်း။',
    remedies: [
      'Holy Basil & Honey: Fresh basil leaf juice mixed with pure honey relieves persistent dry cough.',
      'Ginger & Lime Syrup: Fresh ginger juice with lime juice and honey soothes airway constriction.',
      'Warm Saltwater Rinse: Soothes tickling throat sensation.',
      'Steam Moisture: Use humidified room air or steam bath.'
    ],
    remediesMy: [
      'ပင်စိမ်းနှင့် ပျားရည်: ပင်စိမ်းရွက် သန့်သန့် အရည်ညှစ်ပြီး ပျားရည်နှင့် ရောသောက်ပါက ချောင်းခြောက်ဆိုးခြင်းကို လျှင်မြန်စွာ သက်သာစေပါသည်။',
      'ချင်း၊ သံပရာနှင့် ပျားရည်: ချင်းအရည်၊ သံပရာရည်နှင့် ပျားရည် ရောစပ်သောက်သုံးခြင်းက သလိပ်များကို ကင်းစင်စေပါသည်။',
      'ရေနွေးနွေးတွင် ပျားရည်နှင့် သံပရာသီး ညှစ်သောက်ခြင်းက လည်ချောင်းနာခြင်းကို သက်သာစေပါသည်။'
    ],
    precautions: [
      'Blood in sputum (hemoptysis) or breathlessness requires emergency clinical evaluation.'
    ],
    precautionsMy: [
      'သလိပ်ထဲ သွေးပါခြင်း၊ ရင်ဘတ်အောင့်ခြင်း သို့မဟုတ် အသက်ရှူကျပ်ခြင်း ဖြစ်ပါက အရေးပေါ် ဆေးရုံသို့ သွားရောက်ပါ။'
    ]
  },
  {
    id: 'sym-3',
    symptomName: 'Stomach Ache / Digestion',
    symptomNameMy: 'ဗိုက်အောင့်ခြင်း နှင့် အစာမကြေခြင်း',
    category: 'digestive',
    categoryMy: 'အစာခြေစနစ်',
    description: 'Abdominal colic, bloating, gas pain, indigestion, and mild nausea.',
    descriptionMy: 'လေထိုးလေအောင့်ခြင်း၊ အစာမကြေခြင်း၊ ဗိုက်ကယ်ခြင်းနှင့် ပျို့အန်ချင်ခြင်း။',
    remedies: [
      'Boiled Ginger Infusion: 5-10g sliced ginger root in boiling water speeds gastric emptying.',
      'Mint / Peppermint Tea: Calms intestinal spasms and gas bloating.',
      'Warm Water Compress: Place warm water pouch on upper abdomen.',
      'Bland Diet: Eat light soft rice porridge (ဆန်ပြုတ်) and avoid spicy/oily foods.'
    ],
    remediesMy: [
      'ချင်းရေနွေးကြမ်း: ချင်းပါးပါးလှီး စိမ်ထားသော ရေနွေးကြမ်း သောက်ပေးပါက လေထိုးလေအောင့်ခြင်းနှင့် အစာမကြေခြင်းကို လျှင်မြန်စွာ သက်သာစေပါသည်။',
      'ပူဒီနာရွက် / စပလင်: ပူဒီနာရွက် သို့မဟုတ် စပလင် ပြုတ်ရည် သောက်ပေးခြင်းက လေပွခြင်းကို သက်သာစေပါသည်။',
      'ဗိုက်ပေါ်သို့ ရေနွေးဝတ် ကပ်ပေးခြင်း သို့မဟုတ် ရေနွေးအိတ် တင်ပေးပါ။',
      'ဆန်ပြုတ်ပျော့ပျော့ သောက်ပြီး အဆီအစိမ့်နှင့် စေတနာလွန် အစပ်စာများကို ရှောင်ကြဉ်ပါ။'
    ],
    precautions: [
      'Severe right lower abdominal pain (possible appendicitis) or black stool requires immediate hospital care.'
    ],
    precautionsMy: [
      'ညာဘက်ဝမ်းဗိုက်အောက်ပိုင်း စူးရှစွာ အောင့်ခြင်း (အတက်ရောင်ခြင်း) သို့မဟုတ် ဝမ်းအမည်းသွားခြင်း ဖြစ်ပါက ဆေးရုံသို့ ချက်ချင်းသွားပါ။'
    ]
  },
  {
    id: 'sym-4',
    symptomName: 'Skin Issues / Rashes',
    symptomNameMy: 'အရေပြားပြဿနာ နှင့် အဖုအပိမ့်များ',
    category: 'dermatology',
    categoryMy: 'အရေပြား',
    description: 'Dermatitis, pruritus, heat rash, mild fungal patches, and skin irritation.',
    descriptionMy: 'ယားယံခြင်း၊ အဖုအပိမ့်ထွက်ခြင်း၊ ယင်းထခြင်းနှင့် အရေပြားနီရဲ ရောင်ရမ်းခြင်း။',
    remedies: [
      'Neem (တမာရွက်) Decoction Wash: Boil fresh Neem leaves in water and use cooled water for skin wash.',
      'Turmeric & Honey Paste: Apply topical turmeric paste on localized minor lesions for antibacterial relief.',
      'Aloe Vera Gel: Pure Aloe Vera gel soothes sun rash and skin heat itching.',
      'Clean Coconut Oil: Soothes dry scaly skin patches.'
    ],
    remediesMy: [
      'တမာရွက်ပြုတ်ရည်ဖြင့် ဆေးကြောခြင်း: တမာရွက် ရေနွေးနွေး ပြုတ်ရည်ဖြင့် အရေပြား ယားယံသည့်နေရာများကို ဆေးကြောပေးပါက သဘာဝ ပိုးသတ်ပေးပါသည်။',
      'နနွင်းနှင့် ပျားရည် လိမ်းပေးခြင်း: နနွင်းမှုန့်စစ်စစ်ကို ပျားရည်နှင့် ရော၍ ယားယံသော အဖုအပိမ့်များပေါ် သုတ်လိမ်းပေးနိုင်ပါသည်။',
      'ရှားစောင်းလက်ပပ်: ရှားစောင်းလက်ပပ် အနှစ်ကို လိမ်းပေးခြင်းဖြင့် အရေပြား ပူလောင်ယားယံခြင်းကို သက်သာစေပါသည်။'
    ],
    precautions: [
      'Spreading blistering rash, signs of severe systemic infection, or anaphylactic hives require medical consultation.'
    ],
    precautionsMy: [
      'အရေပြား ရေကြည်ဖုများ ပြန့်နှံ့လာခြင်း သို့မဟုတ် တစ်ကိုယ်လုံး အင်ပြင်ထ အသက်ရှူကျပ်ပါက အရေးပေါ် ကုသမှု ခံယူပါ။'
    ]
  },
  {
    id: 'sym-5',
    symptomName: 'Toothache',
    symptomNameMy: 'သွားကိုက်ခြင်း',
    category: 'dental',
    categoryMy: 'သွားနှင့်ခံတွင်း',
    description: 'Throbbing dental pain, gum swelling, and sensitivity to hot/cold.',
    descriptionMy: 'သွားစူးရှစွာ ကိုက်ခြင်း၊ သွားဖုံးရောင်ခြင်းနှင့် အပူအအေး မခံနိုင်ခြင်း။',
    remedies: [
      'Clove (လေးညှင်းပွင့်) Application: Place a crushed clove or 1 drop clove oil on affected tooth.',
      'Warm Saltwater Rinse: Swish warm saltwater for 30 seconds to cleanse bacteria.',
      'Crushed Garlic & Salt: Topical garlic clove paste on cavity area provides mild analgesic effect.',
      'Cold Cheek Compress: Apply ice pack wrapped in cloth on outside of cheek.'
    ],
    remediesMy: [
      'လေးညှင်းပွင့် (Clove): လေးညှင်းပွင့် တစ်ပွင့်ကို သွားကိုက်သည့်နေရာတွင် ကိုက်ထားပါ သို့မဟုတ် လေးညှင်းဆီ ၁ စက် သုတ်လိမ်းပေးပါက သွားကိုက်ခြင်းကို သိသိသာသာ သက်သာစေပါသည်။',
      'ဆားနွေးရေဖြင့် ခံတွင်း ပလုတ်ကျင်းခြင်း: ဆားနွေးရေဖြင့် တစ်နေ့ ၃-၄ ကြိမ် ပလုတ်ကျင်းပေးပါ။',
      'ကြက်သွန်ဖြူနှင့် ဆား: ကြက်သွန်ဖြူကို ထောာင်း၍ ဆားအနည်းငယ်ရောပြီး ကိုက်သောသွားတွင် ကပ်ပေးနိုင်ပါသည်။',
      'ပါးပြင်ပေါ်သို့ ရေခဲဝတ် ကပ်ပေးခြင်းဖြင့် ရောင်ရမ်းမှုကို လျှော့ချပါ။'
    ],
    precautions: [
      'Facial swelling, high fever, or severe gum abscess requires professional dentist evaluation.'
    ],
    precautionsMy: [
      'ပါးရောင်လာခြင်း၊ သွားဖုံးပြည်တည်ခြင်း သို့မဟုတ် ဖျားခြင်းဖြစ်ပါက သွားဆရာဝန်နှင့် အမြန်ဆုံး ပြသပါ။'
    ]
  },
  {
    id: 'sym-6',
    symptomName: 'Headache',
    symptomNameMy: 'ခေါင်းကိုက်ခြင်း',
    category: 'neurological',
    categoryMy: 'ဦးနှောက်နှင့်အာရုံကြော',
    description: 'Tension headache, forehead throbbing, stress pressure, and mild migraine.',
    descriptionMy: 'ဇတ်ကြောတက် ခေါင်းကိုက်ခြင်း၊ ငြီးစီစီ ဖြစ်ခြင်း၊ အလုပ်ပင်ပန်း၍ ခေါင်းအောင့်ခြင်း။',
    remedies: [
      'Ginger or Peppermint Tea: Warm ginger tea reduces neuro-vascular throbbing.',
      'Cold / Warm Forehead Compress: Apply cool cloth on forehead or warm towel on neck.',
      'Temple Essential Oil Massage: Lightly massage temples with peppermint or sandalwood oil.',
      'Hydration & Dark Rest: Drink 2 glasses of water and rest in a dark, quiet room.'
    ],
    remediesMy: [
      'ချင်းနွေးနွေး သို့မဟုတ် ပူဒီနာ ရေနွေးကြမ်း သောက်ပေးပါ။',
      'နဖူးပေါ်သို့ ရေအေးဝတ် ကပ်ပေးခြင်း သို့မဟုတ် ဂုတ်ပိုးပေါ်သို့ ရေနွေးဝတ် တင်ပေးပါ။',
      'နံ့သာဖြူ သို့မဟုတ် ပူဒီနာဆီဖြင့် နားထင်နှင့် ဂုတ်ပိုးကို ခပ်ဖွဖွ နှိပ်နယ်ပေးပါ။',
      'ရေများများသောက်ပြီး ငြိမ်သက် မှောင်မိုက်သော အခန်းထဲတွင် ခဏ အနားယူပါ။'
    ],
    precautions: [
      'Sudden "thunderclap" severe headache, stiff neck, vomiting, or confusion mandates emergency 192 call.'
    ],
    precautionsMy: [
      'ရုတ်တရက် အလွန်ပြင်းထန်စွာ ခေါင်းကိုက်ခြင်း၊ ဇာတ်ခဲခြင်း၊ အန်ခြင်း သို့မဟုတ် သတိလစ်ချင်သလိုဖြစ်ပါက ၁၉၂ သို့ ချက်ချင်း ခေါ်ဆိုပါ။'
    ]
  }
];

export const SymptomsRemedies: React.FC<SymptomsRemediesProps> = ({ 
  language,
  onConsultAdvisor
}) => {
  const [allSymptoms, setAllSymptoms] = useState<CustomSymptomRemedy[]>(() => getManagedSymptoms());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<CustomSymptomRemedy | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setAllSymptoms(getManagedSymptoms());
    };
    window.addEventListener('tmhip_content_updated', handleUpdate);
    return () => window.removeEventListener('tmhip_content_updated', handleUpdate);
  }, []);



  const filteredList = allSymptoms.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.symptomNameMy.toLowerCase().includes(q) ||
      item.symptomName.toLowerCase().includes(q) ||
      item.descriptionMy.toLowerCase().includes(q) ||
      item.remediesMy.some((r) => r.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold font-myanmar backdrop-blur-xs">
              <Activity className="w-4 h-4 text-emerald-200" />
              <span>{language === 'my' ? 'အိမ်တွင်း ရှေးဦးပြုစုကုသမှု' : 'Symptoms & Home Remedies Guide'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-myanmar leading-tight">
              {language === 'my' ? 'ရောဂါလက္ခဏာများ နှင့် အိမ်တွင်းဆေးနည်းများ' : 'Symptoms & Home Remedies'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-myanmar leading-relaxed">
              {language === 'my'
                ? 'နှာစီး၊ ချောင်းဆိုး၊ ဗိုက်အောင့်၊ အရေပြား၊ သွားကိုက်၊ ခေါင်းကိုက် စသည့် အသုံးများသော ရောဂါလက္ခဏာများအတွက် အလွယ်တကူ ပြုလုပ်နိုင်သော သဘာဝ အိမ်တွင်းဆေးနည်းများ။'
                : 'Natural remedies and management instructions for runny nose, cough, stomach ache, skin issues, toothache, and headache.'}
            </p>
          </div>


        </div>
      </div>

      {/* Control Bar: Search & Quick Condition Cards */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'my'
                ? 'ရောဂါလက္ခဏာ သို့မဟုတ် ဆေးနည်း ရှာဖွေပါ (ဥပမာ - နှာစီး၊ ချောင်းဆိုး၊ ခေါင်းကိုက်)...'
                : 'Search symptom or remedy (e.g. runny nose, cough, headache)...'
            }
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-neutral-300 dark:border-neutral-700 comfort:border-[#ded4c1] text-xs text-black dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 transition font-myanmar"
          />
        </div>
      </div>

      {/* Symptoms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white dark:bg-neutral-900 comfort:bg-[#faf6ee] border border-neutral-200 dark:border-neutral-800 comfort:border-[#ded4c1] shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Card Title Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800 comfort:border-[#ded4c1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-black dark:text-white comfort:text-[#231f1a] font-myanmar">
                      {language === 'my' ? item.symptomNameMy : item.symptomName}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 font-myanmar block">
                      {language === 'my' ? item.categoryMy : item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-myanmar leading-relaxed">
                {language === 'my' ? item.descriptionMy : item.description}
              </p>

              {/* Remedies List */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block font-myanmar">
                  {language === 'my' ? 'သဘာဝ အိမ်တွင်းဆေးနည်းများ:' : 'Natural Home Remedies:'}
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 comfort:text-[#231f1a] font-myanmar">
                  {(language === 'my' ? item.remediesMy : item.remedies).map((rem, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="flex-1">{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precautions */}
              {((language === 'my' ? item.precautionsMy : item.precautions) || []).length > 0 && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-myanmar space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{language === 'my' ? 'သတိပြုရန်များ:' : 'Precautions:'}</span>
                  </div>
                  <ul className="list-disc list-inside text-amber-900 dark:text-amber-200 space-y-0.5 text-[11px] leading-relaxed">
                    {(language === 'my' ? item.precautionsMy : item.precautions)?.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* AI Advisor Consult Button */}
            {onConsultAdvisor && (
              <button
                type="button"
                onClick={() =>
                  onConsultAdvisor(
                    `ရောဂါလက္ခဏာ: ${item.symptomNameMy} အတွက် အိမ်တွင်းဆေးနည်းများနှင့် အပိုဆောင်း သတိပြုရန်များ ရှင်းပြပေးပါ`
                  )
                }
                className="w-full mt-3 py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer font-myanmar"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'my' ? 'အိမ်တွင်းကုသမှုအကြံပေး မေးမည်' : 'Consult Advisor'}</span>
              </button>
            )}
          </div>
        ))}
      </div>


    </div>
  );
};

export default SymptomsRemedies;
