import { CustomSymptomRemedy } from '../types';

export const DEFAULT_SYMPTOMS: CustomSymptomRemedy[] = [
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
      'Aloe Vera Gel: Pure Aloe Vera gel (ရှားစောင်းလက်ပပ်) calms inflamed itching skin.',
      'Turmeric & Coconut Oil Paste: Topical antibacterial paste for mild skin lesions.',
      'Neem Leaf Wash: Decoction of neem leaves (တမာရွက်) for bathing soothing rashes.',
      'Cool Water Wash: Avoid hot water showers on active contact dermatitis.'
    ],
    remediesMy: [
      'ရှားစောင်းလက်ပပ် ဂျယ်လ်: ရှားစောင်းလက်ပပ် အသားနူးနူးကို ယားယံသော အရေပြားပေါ် သုတ်လိမ်းပေးပါက ပူလောင်ယားယံခြင်းကို လျှင်မြန်စွာ သက်သာစေပါသည်။',
      'နနွင်းနှင့် အုန်းဆီ: နနွင်းမှုန့်ကို အုန်းဆီနှင့် ဖျော်၍ အဖုအပိမ့်များပေါ် သုတ်လိမ်းပေးပါ။',
      'တမာရွက် ပြုတ်ရည်: တမာရွက် ပြုတ်ရည်ဖြင့် ရေချိုးပေးပါက ပိုးမွှားများကို ကင်းစင်စေပါသည်။'
    ],
    precautions: [
      'Spreading cellulitis rash, facial swelling, or severe allergic reaction needs immediate emergency care.'
    ],
    precautionsMy: [
      'မျက်နှာနီရဲ ရောင်ရမ်းလာခြင်း သို့မဟုတ် ဓါတ်မတည့်မှု အသက်ရှူကျပ်လာပါက အရေးပေါ် ဆေးကုသမှု ခံယူပါ။'
    ]
  },
  {
    id: 'sym-5',
    symptomName: 'Toothache / Gum Care',
    symptomNameMy: 'သွားကိုက်ခြင်း နှင့် သွားဖုံးနာခြင်း',
    category: 'dental',
    categoryMy: 'သွားနှင့် ခံတွင်း',
    description: 'Dental caries pain, gingivitis, tooth sensitivity, and local jaw ache.',
    descriptionMy: 'သွားပိုးစားခြင်း၊ သွားကိုက်ခြင်း၊ သွားဖုံးရောင်ခြင်းနှင့် ခံတွင်းနာကျင်ခြင်း။',
    remedies: [
      'Clove Oil Application: Dab 1 drop of clove oil (လေးညှင်းဆီ) or chew a clove on affected tooth.',
      'Warm Saltwater Rinse: Dissolve 1/2 tsp salt in warm water, hold in mouth 30s.',
      'Cold Compress: External cold pack on jaw to reduce facial edema.',
      'Betel Leaf Rinse: Boiled betel leaf (ကွမ်းရွက်) water gargle.'
    ],
    remediesMy: [
      'လေးညှင်းပွင့် / လေးညှင်းဆီ: လေးညှင်းပွင့်ကို သွားကိုက်သည့်နေရာတွင် ကိုက်ထားပေးပါ (သို့မဟုတ်) လေးညှင်းဆီ ၁ စက်ကို ဂွမ်းစဖြင့် သုတ်လိမ်းပေးပါက သွားကိုက်ခြင်း လျှင်မြန်စွာ ထုံသွားပါမည်။',
      'ဆားနွေးရေ ငုံပေးခြင်း: ရေနွေးနွေးထဲ သဘာဝဆားထည့်၍ စက္ကန့် ၃၀ ခန့် ငုံပေးပါ။',
      'ပါးစပ်ပြင်ပမှ ရေခဲဝတ် ကပ်ပေးခြင်း: ရောင်ရမ်းမှု သက်သာစေရန် ပါးပြင်ပေါ် ရေခဲဝတ် ကပ်ပေးပါ။'
    ],
    precautions: [
      'Facial swelling extending to neck, difficulty swallowing, or high fever needs immediate dentist visit.'
    ],
    precautionsMy: [
      'ပါးရောင်လာခြင်း၊ လည်ပင်းသို့ ရောင်ရမ်းမှု ပျံ့နှံ့လာပါက သွားဆရာဝန်နှင့် ချက်ချင်း ပြသပါ။'
    ]
  },
  {
    id: 'sym-6',
    symptomName: 'Headache / Migraine',
    symptomNameMy: 'ခေါင်းကိုက်ခြင်း နှင့် ဇာတ်လေးခြင်း',
    category: 'neurology',
    categoryMy: 'ဦးနှောက်နှင့် အာရုံကြော',
    description: 'Tension headache, stress-induced forehead tightness, and neck muscle ache.',
    descriptionMy: 'ဇာတ်ကြောတက်ခြင်း၊ စိတ်ဖိစီးမှုကြောင့် ခေါင်းကိုက်ခြင်းနှင့် နားထင် ကိုက်ခြင်း။',
    remedies: [
      'Ginger Tea: Warm ginger infusion inhibits inflammatory prostaglandins.',
      'Cold/Warm Compress: Cold pack on forehead for migraine; warm cloth on neck for tension ache.',
      'Sandalwood/Peppermint Paste: Gentle temple massage with mint/sandalwood.',
      'Hydration & Quiet Rest: Rest in a dark, quiet room with adequate water intake.'
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
