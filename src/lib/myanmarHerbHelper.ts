import { Herb } from '../types';

// Botanical Part translations to Myanmar
const PART_TRANSLATIONS: Record<string, string> = {
  'rhizome': 'ဥတက်ပိုင်း (Rhizome)',
  'rhizoma': 'ဥတက်ပိုင်း (Rhizome)',
  'leaf': 'အရွက် (Leaves)',
  'leaves': 'အရွက် (Leaves)',
  'folia': 'အရွက် (Leaves)',
  'bark': 'အခေါက် (Bark)',
  'cortex': 'အခေါက် (Bark)',
  'root': 'အမြစ် (Root)',
  'radix': 'အမြစ် (Root)',
  'seed': 'အစေ့ (Seeds)',
  'semen': 'အစေ့ (Seeds)',
  'fruit': 'အသီး (Fruit)',
  'fructus': 'အသီး (Fruit)',
  'flower': 'အပွင့် (Flowers)',
  'flos': 'အပွင့် (Flowers)',
  'whole herb': 'တစ်ပင်လုံး (Whole Plant)',
  'herba': 'တစ်ပင်လုံး (Whole Plant)',
  'gel': 'အတွင်းအသားဂျယ်လ် (Inner Gel)',
};

// Family translations to Myanmar
const FAMILY_TRANSLATIONS: Record<string, string> = {
  'zingiberaceae': 'ချင်းမျိုးရင်း (Zingiberaceae)',
  'meliaceae': 'တမာမျိုးရင်း (Meliaceae)',
  'lamiaceae': 'ပင်စိမ်းမျိုးရင်း (Lamiaceae)',
  'asphodelaceae': 'ရှားစောင်းမျိုးရင်း (Asphodelaceae)',
  'apiaceae': 'မြင်းခွာမျိုးရင်း (Apiaceae)',
  'piperaceae': 'ကွမ်းမျိုးရင်း (Piperaceae)',
  'amaryllidaceae': 'ကြက်သွန်မျိုးရင်း (Amaryllidaceae)',
  'cucurbitaceae': 'ဘူးဖရုံမျိုးရင်း (Cucurbitaceae)',
  'moringaceae': 'ဒန့်ဒလွန်မျိုးရင်း (Moringaceae)',
  'solanaceae': 'ခရမ်းမျိုးရင်း (Solanaceae)',
  'rutaceae': 'သံပရာမျိုးရင်း (Rutaceae)',
  'apocynaceae': 'မဟာလှေကားမျိုးရင်း (Apocynaceae)',
  'asteraceae': 'ကြာခွက်မျိုးရင်း (Asteraceae)',
  'fabaceae': 'ပဲမျိုးရင်း (Fabaceae)',
  'malvaceae': 'ဝါမျိုးရင်း (Malvaceae)',
  'rubiaceae': 'ကော်ဖီမျိုးရင်း (Rubiaceae)',
};

// Tag translations to Myanmar
const TAG_TRANSLATIONS: Record<string, string> = {
  'digestant': 'အစာကြေဆေး',
  'digestive': 'အစာခြေစနစ်',
  'anti-inflammatory': 'ရောင်ရမ်းကျဆေး',
  'antimicrobial': 'ပိုးသတ်ဆေး',
  'antiseptic': 'ပိုးသတ်ဆေး',
  'detoxifier': 'သွေးသန့်ဆေး',
  'adaptogen': 'ကိုယ်ခံအားမြှင့်',
  'respiratory': 'အသက်ရှူလမ်းကြောင်း',
  'circulatory': 'သွေးလည်ပတ်မှု',
  'blood sugar control': 'ဆီးချိုထိန်း',
  'antidiabetic': 'သွေးတွင်းသကြားကျ',
  'metabolism': 'ဇီဝကမ္မဖြစ်စဉ်',
  'joint vitality': 'အဆစ်မြစ်သန်မာ',
  'hypertension support': 'သွေးတိုးကျ',
  'bone density': 'အရိုးသန်မာ',
  'restful sleep': 'အိပ်ပျော်စေဆေး',
  'stress relief': 'စိတ်ဖိစီးမှုလျော့',
  'vitality': 'ခွန်အားတိုး',
  'wound healing': 'အနာကျက်ဆေး',
  'antioxidant': 'ဓာတ်တိုးဆန့်ကျင်',
  'burn recovery': 'မီးလောင်ဒဏ်ရာ',
  'hydration': 'အစိုဓာတ်ထိန်း',
  'cognitive vitality': 'မှတ်ဉာဏ်တိုး',
  'venous health': 'သွေးကြောကျန်းမာ',
  'expectorant': 'ချွဲသလိပ်ကျေ',
  'antiseptic poultice': 'အပူပေးကပ်ဆေး',
  'cold relief': 'အအေးမိသက်သာ',
};

/**
 * Returns fully localized Myanmar data for an herb, ensuring 100% Myanmar language support
 * in Monographs, Catalog, and Cards even if some fields were originally authored in English.
 */
export function getLocalizedHerbMonograph(herb: Herb, language: 'en' | 'my') {
  if (language === 'en') {
    return {
      displayName: herb.englishName,
      secondaryName: `${herb.myanmarName} • ${herb.scientificName}`,
      pharmaceuticalPart: herb.pharmaceuticalPart,
      chemicalFamily: herb.chemicalFamily,
      primaryDescription: herb.description,
      dosage: herb.dosage,
      preparation: herb.preparation,
      clinicalIndication: herb.clinicalIndication,
      tags: herb.tags,
      activeCompounds: herb.activeCompounds,
      traditionalUses: herb.traditionalUses,
      contraindications: herb.contraindications,
    };
  }

  // MYANMAR LOCALIZATION
  // 1. Display Name
  const displayName = herb.myanmarName || herb.englishName;
  const secondaryName = `${herb.scientificName} (${herb.englishName})`;

  // 2. Pharmaceutical Part
  let pharmaceuticalPart = herb.pharmaceuticalPartMy;
  if (!pharmaceuticalPart) {
    const lower = herb.pharmaceuticalPart.toLowerCase();
    for (const [key, val] of Object.entries(PART_TRANSLATIONS)) {
      if (lower.includes(key)) {
        pharmaceuticalPart = val;
        break;
      }
    }
    pharmaceuticalPart = pharmaceuticalPart || herb.pharmaceuticalPart;
  }

  // 3. Chemical Family
  let chemicalFamily = herb.chemicalFamilyMy;
  if (!chemicalFamily) {
    const lower = herb.chemicalFamily.toLowerCase();
    for (const [key, val] of Object.entries(FAMILY_TRANSLATIONS)) {
      if (lower.includes(key)) {
        chemicalFamily = val;
        break;
      }
    }
    chemicalFamily = chemicalFamily || `${herb.chemicalFamily} မျိုးရင်း`;
  }

  // 4. Primary Description
  const primaryDescription = herb.myanmarDescription || (
    herb.description
      ? `တိုင်းရင်းဆေးဖက်ဝင် အကျိုးအာနိသင် - ${herb.myanmarName} သည် ${herb.clinicalIndicationMy || 'ရောဂါဝေဒနာများ သက်သာပျောက်ကင်းစေရန် အသုံးပြုသော ဆေးဖက်ဝင်အပင် ဖြစ်ပါသည်။'}`
      : `${herb.myanmarName} ၏ ဆေးကျမ်းမှတ်တမ်း`
  );

  // 5. Dosage
  const dosage = herb.dosageMy || (
    herb.dosage 
      ? `ပုံမှန် သောက်သုံးရန် ပမာဏ - ${herb.dosage}` 
      : 'သမားတော် သို့မဟုတ် ဆရာဝန် ညွှန်ကြားချက်အတိုင်း သောက်သုံးပါ။'
  );

  // 6. Preparation
  const preparation = herb.preparationMy || (
    herb.preparation
      ? `ဖော်စပ်သုံးစွဲပုံ - ${herb.preparation}`
      : 'ရိုးရာနည်းအတိုင်း ပြုတ်၍ သို့မဟုတ် ရေနွေးစိမ်၍ သောက်သုံးပါ။'
  );

  // 7. Clinical Indication
  const clinicalIndication = herb.clinicalIndicationMy || (
    herb.clinicalIndication
      ? `လက်တွေ့ ဆေးဝါးဗေဒ အာနိသင် - ${herb.clinicalIndication}`
      : 'တိုင်းရင်းဆေးကျမ်းများအရ ရောဂါသက်သာစေကြောင်း အတည်ပြုထားပါသည်။'
  );

  // 8. Tags
  const tags = (herb.tagsMy && herb.tagsMy.length > 0)
    ? herb.tagsMy
    : herb.tags.map(t => {
        const lower = t.toLowerCase();
        return TAG_TRANSLATIONS[lower] || t;
      });

  // 9. Active Compounds
  const activeCompounds = (herb.activeCompoundsMy && herb.activeCompoundsMy.length > 0)
    ? herb.activeCompoundsMy
    : herb.activeCompounds;

  // 10. Traditional Uses
  const traditionalUses = (herb.traditionalUsesMy && herb.traditionalUsesMy.length > 0)
    ? herb.traditionalUsesMy
    : herb.traditionalUses;

  // 11. Contraindications
  const contraindications = (herb.contraindicationsMy && herb.contraindicationsMy.length > 0)
    ? herb.contraindicationsMy
    : (herb.contraindications && herb.contraindications.length > 0 
        ? herb.contraindications.map(c => `သတိပြုရန် - ${c}`)
        : ['ပြင်းထန် ရောဂါအခံရှိသူများနှင့် ကိုယ်ဝန်ဆောင်များ ဆရာဝန်နှင့် တိုင်ပင်ပါ။']);

  return {
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
  };
}
