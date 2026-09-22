import { SeniorHealthTopic } from '../types';

export const SENIOR_HEALTH_DATA: SeniorHealthTopic[] = [
  {
    id: 'hypertension-control',
    titleEn: 'Blood Pressure & Hypertension Care (40+)',
    titleMy: 'သွေးတိုးရောဂါ စောင့်ရှောက်မှုနှင့် ထိန်းညှိနည်း',
    subtitleEn: 'Clinical guidelines, herbal supports, and vital monitoring thresholds for arterial longevity.',
    subtitleMy: 'သွေးပေါင်ချိန် ပုံမှန်တိုင်းတာနည်း၊ သွေးတိုးကျစေသော တိုင်းရင်းဆေးပင်များနှင့် အရေးပေါ် သတိပြုဖွယ်များ။',
    icon: 'Activity',
    category: 'cardiovascular',
    vitalGuide: {
      metric: 'Blood Pressure (mmHg)',
      normal: '< 120/80 (ပုံမှန် အကောင်းဆုံး)',
      warning: '130-139 / 80-89 (သွေးတိုးအစပျိုး အဆင့် ၁)',
      crisis: '> 180 / 120 (အရေးပေါ် ဆေးရုံချက်ချင်းသွားပါ!)'
    },
    herbalRemedies: [
      {
        herbId: 'allium-sativum',
        nameEn: 'Fresh Crushed Garlic (Bulbus Allii)',
        nameMy: 'ကြက်သွန်ဖြူ အစိမ်း',
        actionEn: 'Allicin compound relaxes smooth muscles of arterial walls, reducing systemic systolic tension.',
        actionMy: 'သွေးကြောနံရံများ တင်းမာမှုကို လျှော့ချပေးပြီး သွေးခဲခြင်းနှင့် သွေးတိုးခြင်းကို သက်သာစေပါသည်။',
        prepEn: 'Crush 1-2 raw cloves, let sit for 10 minutes for allicin to form, consume with light meal.',
        prepMy: 'ကြက်သွန်ဖြူ ၁-၂ တက်ကို ထောင်းပြီး ၁၀ မိနစ်ခန့်ထားကာ အစာစားချိန်တွင် တွဲဖက်စားသုံးပါ။'
      },
      {
        herbId: 'moringa-oleifera',
        nameEn: 'Moringa Leaf Broth / Tea',
        nameMy: 'ဒန့်ဒလွန်ရွက် ဟင်းချို / လက်ဖက်ရည်',
        actionEn: 'High bioavailable potassium counters excess sodium, easing renal-cardiac pressure load.',
        actionMy: 'ပိုတက်စီယမ်ဓာတ် ကြွယ်ဝသဖြင့် ခန္ဓာကိုယ်တွင်း ဆိုဒီယမ်ဆားပမာဏကို လျှော့ချပေးပြီး သွေးပေါင်ချိန်ကို ထိန်းညှိပေးပါသည်။',
        prepEn: 'Boil fresh leaves in mild broth without MSG, or steep dried leaf powder in hot water.',
        prepMy: 'ဒန့်ဒလွန်ရွက် လတ်လတ်ဆတ်ဆတ်ကို ဟင်းချိုချက်သောက်ပါ သို့မဟုတ် အရွက်ခြောက်မှုန့် လက်ဖက်ရည်ဇွန်း ၁ ဇွန်း ရေနွေးဖျော်သောက်ပါ။'
      }
    ],
    lifestyleTipsEn: [
      'Limit dietary sodium to under 5 grams of salt per day (under 1 level teaspoon).',
      'Avoid sudden emotional spikes and heavy lifting with breath-holding (Valsalva maneuver).',
      'Engage in 30 minutes of brisk walking 5 days weekly to maintain vascular elasticity.'
    ],
    lifestyleTipsMy: [
      'တစ်နေ့လျှင် ဆားစားသုံးမှုကို လက်ဖက်ရည်ဇွန်း ၁ ဇွန်းအောက် (၅ ဂရမ်အောက်) လျှော့ချပါ။ ငံပြာရည်၊ ငါးပိ လျှော့စားပါ။',
      'ရုတ်တရက် ဒေါသထွက်ခြင်း၊ အသက်အောင့်၍ အလေးအပင်မခြင်းကို ရှောင်ကြဉ်ပါ။',
      'တစ်ပတ်လျှင် ၅ ရက်၊ တစ်နေ့ မိနစ် ၃၀ ခန့် ပုံမှန် လမ်းသွက်သွက် လျှောက်ပါ။'
    ],
    precautionsEn: [
      'Never stop prescription antihypertensive medications abruptly without consulting your physician.',
      'Seek emergency care immediately if systolic exceeds 180 accompanied by occipital headache or blurred vision.'
    ],
    precautionsMy: [
      'ဆရာဝန် ညွှန်ကြားထားသော သွေးတိုးကျဆေးများကို မိမိသဘောဖြင့် ရုတ်တရက် လုံးဝ မရပ်ရပါ။',
      'သွေးပေါင် ၁၈၀/၁၂၀ ကျော်လွန်ပြီး ဇက်ကြောတက်၊ ခေါင်းကိုက်၊ မျက်စိပြာပါက အရေးပေါ် ဆေးရုံသို့ ချက်ချင်းသွားပါ။'
    ]
  },
  {
    id: 'diabetes-glycemic-care',
    titleEn: 'Blood Sugar & Type 2 Diabetes Management',
    titleMy: 'ဆီးချို / သွေးချို ထိန်းညှိမှုနှင့် နေ့စဉ်စောင့်ရှောက်နည်း',
    subtitleEn: 'Natural hypoglycemic herbs, glycemic index control, and diabetic foot/eye protection.',
    subtitleMy: 'သွေးတွင်းသကြားဓာတ် ထိန်းညှိပေးသည့် သဘာဝဆေးဖက်ဝင်အပင်များနှင့် ဆီးချိုနောက်ဆက်တွဲ ကာကွယ်နည်းများ။',
    icon: 'Droplet',
    category: 'metabolic',
    vitalGuide: {
      metric: 'Fasting Blood Glucose (အစာမစားမီ သွေးတွင်းသကြား)',
      normal: '70 - 99 mg/dL (ပုံမှန်)',
      warning: '100 - 125 mg/dL (ဆီးချိုအစပျိုး အဆင့်)',
      crisis: '≥ 126 mg/dL (ဆီးချိုအဆင့်) သို့မဟုတ် > 250 mg/dL (အရေးပေါ်)'
    },
    herbalRemedies: [
      {
        herbId: 'momordica-charantia',
        nameEn: 'Bitter Melon (Momordica charantia)',
        nameMy: 'ကြက်ဟင်းခါးသီး',
        actionEn: 'Charantin and polypeptide-p stimulate cellular glucose uptake and support pancreatic beta cells.',
        actionMy: 'အင်ဆူလင်သဖွယ် အကျိုးပြုသည့် polypeptide-p ပါဝင်သဖြင့် ဆဲလ်များမှ သကြားဓာတ် စုပ်ယူမှုကို ကောင်းမွန်စေပါသည်။',
        prepEn: 'Drink 50ml fresh diluted juice in the morning or brew dried fruit slices as herbal tea.',
        prepMy: 'ကြက်ဟင်းခါးသီး အရည်စစ်စစ် (၅၀ မီလီလီတာခန့်) မနက်ပိုင်း သောက်သုံးပါ သို့မဟုတ် အခြောက်လှန်း လက်ဖက်ရည်ဖျော်သောက်ပါ။'
      },
      {
        herbId: 'azadirachta-indica',
        nameEn: 'Young Neem Leaf Tips',
        nameMy: 'တမာရွက်နု',
        actionEn: 'Bitter triterpenoids improve hepatic insulin receptor sensitivity.',
        actionMy: 'ခါးသက်သော ဂုဏ်သတ္တိကြောင့် အင်ဆူလင် အာနိသင်ကို ပိုမိုထိရောက်စေပြီး အသည်းလုပ်ငန်းကို ကူညီပေးပါသည်။',
        prepEn: 'Steep 3-5 young leaf tips in hot water as a morning cleansing tea 2-3 days a week.',
        prepMy: 'တမာညွန့်နု ၃-၅ ညွန့်ကို ရေနွေးဖြင့် လက်ဖက်ရည်သဖွယ် စိမ်သောက်ပါ။'
      }
    ],
    lifestyleTipsEn: [
      'Switch from white polished rice to low-glycemic brown rice or add fiber-rich vegetables.',
      'Inspect feet daily for numbness, micro-cuts, or cracked heels to prevent diabetic ulcers.',
      'Drink 8 glasses of pure water daily to support kidney glycemic clearance.'
    ],
    lifestyleTipsMy: [
      'ဆန်လုံးညို၊ အသီးအရွက် ကြွယ်ဝစွာ စားသုံးပြီး အချိုရည်၊ သကြားလုံးနှင့် ကောက်ညှင်းတို့ကို လျှော့ချပါ။',
      'ခြေထောက်တွင် ထုံကျဉ်ခြင်း၊ အနာသေးသေးများရှိမရှိ နေ့စဉ် စစ်ဆေးပါ (ဆီးချိုခြေထောက်အနာ ကာကွယ်ရန်)။',
      'တစ်နေ့လျှင် သန့်ရှင်းသောရေ အနည်းဆုံး ၈ ဖန်ခွက် သောက်သုံးပါ။'
    ],
    precautionsEn: [
      'Beware of hypoglycemia (sweating, trembling, dizziness): keep 3 glucose candies available.',
      'Do not combine intense fasting with multiple herbal hypoglycemics without medical monitoring.'
    ],
    precautionsMy: [
      'သကြားဓာတ် လွန်ကဲစွာကျဆင်းခြင်း (ချွေးစေးထွက်၊ တုန်ယင်၊ မူးဝေ) ဖြစ်ပါက သကြားရည် (သို့) သကြားလုံး ချက်ချင်း စားပါ။',
      'ဆရာဝန်ပေးသော ဆီးချိုဆေးများနှင့် တိုင်းရင်းဆေးများကို တွဲဖက်သောက်ပါက သွေးတွင်းသကြား ပုံမှန်တိုင်းတာပါ။'
    ]
  },
  {
    id: 'joint-knee-mobility',
    titleEn: 'Joint, Knee & Arthritis Mobility (ဒူးနာ/အရိုးအဆစ်)',
    titleMy: 'ဒူးနာ၊ အရိုးအဆစ် ရောင်ရမ်းနာနှင့် ခါးနာ သက်သာစေရန်',
    subtitleEn: 'Relieve knee osteoarthritis, cartilage friction, and morning stiffness through anti-inflammatory protocols.',
    subtitleMy: 'အသက် ၄၀ ကျော်တွင် အဖြစ်များသော ဒူးနာ၊ လေးဖက်နာ၊ အရိုးကျီးပေါင်း သက်သာစေမည့် ဆေးနည်းများနှင့် လေ့ကျင့်ခန်းများ။',
    icon: 'Shield',
    category: 'musculoskeletal',
    vitalGuide: {
      metric: 'Morning Stiffness Duration (မနက်ခင်း အဆစ်တောင့်တင်းချိန်)',
      normal: '< 15 mins (ပုံမှန် အပျော့စား)',
      warning: '30 - 60 mins (အဆစ်ရောင်ရမ်းမှု အစပျိုး)',
      crisis: 'Persistent swelling + heat + redness (ပိုးဝင်အဆစ်ရောင် - ဆေးရုံပြပါ)'
    },
    herbalRemedies: [
      {
        herbId: 'curcuma-longa',
        nameEn: 'Turmeric + Black Pepper (Curcumin + Piperine)',
        nameMy: 'နနွင်းနှင့် ငရုတ်ကောင်းစေ့',
        actionEn: 'Downregulates inflammatory NF-kB and COX-2 pathways; pepper boosts bioavailability by 2000%.',
        actionMy: 'အရိုးအဆစ်ရောင်ရမ်းခြင်းကို သဘာဝအတိုင်း သက်သာစေပြီး နနွင်းနှင့် ငရုတ်ကောင်းတွဲသောက်ပါက စုပ်ယူမှု အဆ ၂၀ တက်လာပါသည်။',
        prepEn: '1/2 teaspoon pure turmeric powder with 2 crushed black peppercorns in warm milk.',
        prepMy: 'နနွင်းစစ်စစ် လက်ဖက်ရည်ဇွန်း တစ်ဝက်ကို ငရုတ်ကောင်းစေ့ ၂ စေ့ အမှုန့်နှင့် နို့နွေးနွေးထဲ ရောသောက်ပါ။'
      },
      {
        herbId: 'zingiber-officinale',
        nameEn: 'Warm Ginger & Sesame Herbal Compress (ကြပ်ထုပ်)',
        nameMy: 'ချင်းနှင့် နှမ်းဆီ ကြပ်ထုပ်ထိုးနည်း',
        actionEn: 'Gingerols stimulate microvascular perfusion and disperse trapped fluid around synovial bursae.',
        actionMy: 'ဒူးနှင့် အဆစ်များရှိ သွေးကြောငယ်များကို ပွင့်စေပြီး အဆစ်တွင်း ရောင်ရမ်းကိုက်ခဲမှုကို လျင်မြန်စွာ ပြေလျော့စေပါသည်။',
        prepEn: 'Pound fresh ginger with coarse sea salt, warm gently with pure sesame oil, wrap in cotton cloth for compress.',
        prepMy: 'ချင်းနှင့် ဆားကြမ်းကို ထောင်းကာ နှမ်းဆီစစ်စစ်ဖြင့် အပူပေးပြီး ပိတ်စသန့်ဖြင့် ထုပ်ကာ ဒူးနာနေရာကို ကပ်ပေးပါ။'
      }
    ],
    lifestyleTipsEn: [
      'Maintain healthy body weight: every 1 kg lost relieves 4 kg of pressure off the knee joints.',
      'Perform gentle seated leg extensions and quadriceps strengthening daily.',
      'Avoid deep squatting on the floor; use chairs and elevated seats to protect knee cartilage.'
    ],
    lifestyleTipsMy: [
      'ကိုယ်အလေးချိန်ကို ထိန်းညှိပါ (ကိုယ်အလေးချိန် ၁ ကီလို လျှော့ချခြင်းသည် ဒူးခေါင်းဖိအား ၄ ကီလိုကို သက်သာစေပါသည်)။',
      'ကုလားထိုင်တွင် ထိုင်လျက် ခြေထောက်ကို ရှေ့သို့ ဆန့်ထုတ်မြှောက်သော ဒူးကြွက်သားလေ့ကျင့်ခန်း ပြုလုပ်ပါ။',
      'ကြမ်းပြင်တွင် ကြာရှည် ထိုင်ခြင်း၊ ဆောင့်ကြောင့်ထိုင်ခြင်းကို ရှောင်ကြဉ်ပြီး ကုလားထိုင် အသုံးပြုပါ။'
    ],
    precautionsEn: [
      'If a joint becomes suddenly red, hot, and severely painful within hours, rule out septic arthritis or gout.',
      'Avoid high-impact jumping and running on hard concrete pavements.'
    ],
    precautionsMy: [
      'အဆစ်သည် ရုတ်တရက် နီရဲပြီး အလွန်ပူကာ ကိုင်၍မရအောင် နာကျင်ပါက ဂေါက်ရောဂါ သို့မဟုတ် ပိုးဝင်ခြင်း ဖြစ်နိုင်၍ ဆရာဝန်နှင့် ပြသပါ။',
      'ကွန်ကရစ် ကြမ်းပြင်ပေါ်တွင် ပြေးခြင်း၊ ခုန်ခြင်း မပြုလုပ်ရပါ။'
    ]
  },
  {
    id: 'restful-sleep-vitality',
    titleEn: 'Sleep Quality, Stress & Cognitive Vitality',
    titleMy: 'အိပ်ပျော်စေခြင်း၊ စိတ်ဖိစီးမှု လျှော့ချခြင်းနှင့် မှတ်ဉာဏ်ထိန်းသိမ်းမှု',
    subtitleEn: 'Overcoming middle-age insomnia, early waking, mental fog, and evening restlessness.',
    subtitleMy: 'အသက် ၄၀ ကျော်တွင် ဖြစ်တတ်သော ညဘက်အိပ်မပျော်ခြင်း၊ မကြာခဏ နိုးခြင်းနှင့် စိတ်မောပန်းခြင်း သက်သာစေရန်။',
    icon: 'Moon',
    category: 'neurological',
    vitalGuide: {
      metric: 'Sleep Duration & Architecture',
      normal: '7 - 8 hours restorative sleep (လုံလောက်စွာ အိပ်ပျော်ခြင်း)',
      warning: '< 5 hours / frequent nighttime awakenings (အိပ်ရေးပျက်ခြင်း)',
      crisis: 'Chronic insomnia with daytime disorientation or memory lapses'
    },
    herbalRemedies: [
      {
        herbId: 'withania-somnifera',
        nameEn: 'Ashwagandha (Withania somnifera)',
        nameMy: 'ပိတောက်စေး / အာရှဝါဂန်ဓာ',
        actionEn: 'Normalizes elevated cortisol rhythm, calms overexcited neurotransmission, and deepens slow-wave sleep.',
        actionMy: 'ညဘက်တွင် စိတ်ဖိစီးမှုဟော်မုန်းကို လျှော့ချပေးပြီး အာရုံကြောများကို အေးချမ်းစေကာ နှစ်နှစ်ခြိုက်ခြိုက် အိပ်ပျော်စေပါသည်။',
        prepEn: '1/2 teaspoon root powder in warm milk 45 minutes before bedtime.',
        prepMy: 'အမြစ်မှုန့် လက်ဖက်ရည်ဇွန်း တစ်ဝက်ကို အိပ်ရာမဝင်မီ ၄၅ မိနစ်အလိုတွင် နို့နွေးနွေးနှင့် သောက်ပါ။'
      },
      {
        herbId: 'centella-asiatica',
        nameEn: 'Gotu Kola (Centella asiatica) / မြင်းခွာရွက်',
        nameMy: 'မြင်းခွာရွက် စားသုံးခြင်း',
        actionEn: 'Enhances brain-derived neurotrophic factor (BDNF) and improves cerebral microvascular blood flow.',
        actionMy: 'ဦးနှောက်အာရုံကြော ဆဲလ်များကို အားသစ်လောင်းပေးပြီး မှတ်ဉာဏ်စွမ်းရည်နှင့် စိတ်ကြည်လင်မှုကို တိုးတက်စေပါသည်။',
        prepEn: 'Fresh juice (15ml) or fresh leaf salad eaten 3 times weekly.',
        prepMy: 'မြင်းခွာရွက် လတ်လတ်ဆတ်ဆတ်ကို သုပ်စားပါ သို့မဟုတ် အရည်ညှစ်သောက်ပါ။'
      }
    ],
    lifestyleTipsEn: [
      'Stop caffeine and strong green tea after 2:00 PM to protect nighttime adenosine receptors.',
      'Reduce screen time 1 hour before bed (blue light suppresses melatonin production).',
      'Keep the sleeping room dark, cool, and quiet.'
    ],
    lifestyleTipsMy: [
      'နေ့လယ် ၂ နာရီကျော်ပါက ကော်ဖီနှင့် လက်ဖက်ရည်ကြမ်း အပြင်းစား သောက်သုံးခြင်းကို ရှောင်ပါ။',
      'အိပ်ရာမဝင်မီ ၁ နာရီအလိုတွင် ဖုန်းနှင့် တီဗွီ ကြည့်ခြင်းကို ရပ်တန့်ပါ (အပြာရောင်အလင်းက အိပ်စက်ဟော်မုန်းကို ပျက်ပြားစေပါသည်)။',
      'အိပ်ခန်းကို မှောင်၍ လေဝင်လေထွက်ကောင်းအောင် ပြုလုပ်ထားပါ။'
    ],
    precautionsEn: [
      'Avoid combining sedating herbal tinctures with alcohol or prescription sleeping pills.',
      'Chronic loud snoring accompanied by daytime fatigue may indicate obstructive sleep apnea.'
    ],
    precautionsMy: [
      'အိပ်ဆေးများနှင့် အရက်၊ တိုင်းရင်းဆေးများကို အလွန်အကျွံ ရောနှော မသောက်သုံးရပါ။',
      'ညဘက် ဟောက်သံပြင်းထန်ပြီး အသက်ရှူရပ်သလို ဖြစ်ပါက အိပ်နေစဉ် အသက်ရှူလမ်းကြောင်း ပိတ်ဆို့မှု (Sleep Apnea) ရှိမရှိ စစ်ဆေးပါ။'
    ]
  }
];
