import { EmergencyProtocol } from '../types';

export const PROTOCOLS_DATA: EmergencyProtocol[] = [
  {
    id: 'burns-scalds',
    number: 1,
    title: 'Severe Burns & Scalds',
    myanmarTitle: 'မီးလောင်ဒဏ်ရာနှင့် ရေနွေးပူလောင်ခြင်း ရှေးဦးသူနာပြုစုနည်း',
    category: 'heat-fevers',
    badge: 'CRITICAL',
    badgeType: 'black',
    steps: [
      {
        title: '1. Cool with Running Water',
        instruction: 'Irrigate continuously with clean tap water for 20 minutes. Never apply ice directly.',
        caution: 'Ice causes severe vasoconstriction and deep tissue necrosis.'
      },
      {
        title: '2. No Folk Pastes',
        instruction: 'Strictly avoid toothpaste, soy sauce, egg white, or engine grease which introduce sepsis.',
        caution: 'Traditional home kitchen substances trap heat and trigger virulent bacterial infections.'
      },
      {
        title: '3. Clean Sterile Dressing',
        instruction: 'Loosely drape with clean plastic cling wrap or sterile non-adherent gauze.',
        caution: 'Do not wrap tightly; edema will develop rapidly within the first 6 hours.'
      },
      {
        title: '4. Transfer for Blister Evaluation',
        instruction: 'If burn is larger than palm size or on face/joints, transfer immediately to hospital.',
        caution: 'Do not de-roof or pop blisters manually outside sterile hospital theaters.'
      }
    ]
  },
  {
    id: 'snakebite-action',
    number: 2,
    title: 'Snakebite Emergency Action',
    myanmarTitle: 'မြွေကိုက်ခံရပါက ချက်ချင်းပြုစုရမည့် အသက်ကယ်နည်း',
    category: 'heat-fevers',
    badge: 'LIFE SAFETY',
    badgeType: 'canvas-soft',
    steps: [
      {
        title: '1. Complete Immobilization',
        instruction: 'Keep victim calm and still. Splint the bitten limb; do NOT allow patient to walk.',
        caution: 'Muscular movement pumps lethal hemotoxic or neurotoxic venom into the systemic circulation.'
      },
      {
        title: '2. Keep Below Heart',
        instruction: 'Position bite locus lower than heart level to slow lymphatic venom flow.',
        caution: 'Elevating the limb accelerates venous venom return to cardiac chambers.'
      },
      {
        title: '3. NO Incision or Tourniquet',
        instruction: 'Never cut, suck venom, or use tight tourniquets which cause limb necrosis.',
        caution: 'Tourniquets cause gangrene, amputation, and massive fatal venom release upon removal.'
      },
      {
        title: '4. Rush to Antivenom Facility',
        instruction: 'Transport directly to township hospital with antivenom stock. Note snake description.',
        caution: 'Take photograph of snake if safe, but never endanger rescuers trying to catch it.'
      }
    ]
  },
  {
    id: 'heat-exhaustion',
    number: 3,
    title: 'Heat Exhaustion & Sunstroke',
    myanmarTitle: 'အပူလျှပ်ခြင်းနှင့် အမောဖောက်ခြင်း သက်သာစေရန်',
    category: 'heat-fevers',
    badge: 'RAPID ACTION',
    badgeType: 'canvas-soft',
    steps: [
      {
        title: 'Move to Shaded Ventilation',
        instruction: 'Relocate patient into cool airflow; loosen collar and constrictive clothing.',
        caution: 'Immediately fan the patient and mist lukewarm water over exposed skin.'
      },
      {
        title: 'Sip Electrolyte ORS',
        instruction: 'Administer cool water or oral rehydration solution. Avoid ice-cold drinks.',
        caution: 'If unconscious or vomiting, place in recovery position; never force oral liquids.'
      }
    ]
  },
  {
    id: 'acute-asthma',
    number: 1,
    title: 'Acute Asthma & Severe Wheezing',
    myanmarTitle: 'အရေးပေါ် ရင်ကျပ်မောခြင်းနှင့် အသက်ရှူရခက်ခဲခြင်း',
    category: 'respiratory',
    badge: 'CRITICAL',
    badgeType: 'black',
    steps: [
      {
        title: '1. Upright Seated Posture',
        instruction: 'Sit patient fully upright leaning slightly forward with arms on knees.',
        caution: 'Never force patient to lie down, which compresses thoracic diaphragm expansion.'
      },
      {
        title: '2. Rapid Inhaler Reliever',
        instruction: 'Give 4 puffs of blue Salbutamol inhaler with spacer (1 puff per 4 breaths).',
        caution: 'Shake inhaler between each single dose.'
      },
      {
        title: '3. Repeat After 4 Minutes',
        instruction: 'If breathing remains difficult, give another 4 puffs while calling emergency 192.',
        caution: 'Cyanosis (blue lips) or inability to speak full sentences indicates respiratory failure.'
      }
    ]
  },
  {
    id: 'choking-heimlich',
    number: 2,
    title: 'Choking & Foreign Body Airway Obstruction',
    myanmarTitle: 'လည်ချောင်း သီးခြင်းနှင့် အသက်ရှူလမ်းကြောင်း ပိတ်ဆို့ခြင်း',
    category: 'respiratory',
    badge: 'LIFE SAFETY',
    badgeType: 'black',
    steps: [
      {
        title: '1. Encourage Vigorous Coughing',
        instruction: 'If patient can speak, cry, or cough, encourage them to cough forcefully.',
        caution: 'Do not perform blind finger sweeps in the oral pharynx.'
      },
      {
        title: '2. 5 Sharp Back Blows',
        instruction: 'Lean victim forward and deliver 5 firm heel-of-hand blows between shoulder blades.',
        caution: 'Support victim’s chest with non-dominant arm.'
      },
      {
        title: '3. 5 Abdominal Thrusts (Heimlich)',
        instruction: 'Stand behind, clasp fist above navel, pull inward and upward sharply.',
        caution: 'In pregnant women or infants, perform sternal chest thrusts instead.'
      }
    ]
  },
  {
    id: 'food-poisoning',
    number: 1,
    title: 'Acute Food Poisoning & Severe Dehydration',
    myanmarTitle: 'အစာအဆိပ်သင့်ခြင်းနှင့် ရုတ်တရက် ဝမ်းပျက်ဝမ်းလျှောခြင်း',
    category: 'gastrointestinal',
    badge: 'RAPID ACTION',
    badgeType: 'canvas-soft',
    steps: [
      {
        title: '1. Continuous ORS Rehydration',
        instruction: 'Mix 1 sachet standardized WHO-ORS in 1 liter clean boiled-cooled water.',
        caution: 'Sip 200ml after every loose stool episode; do not drink sugary sodas.'
      },
      {
        title: '2. Avoid Anti-Motility Pills',
        instruction: 'Avoid Loperamide (Imodium) in bacterial diarrhea or bloody stools.',
        caution: 'Stopping bowel motility traps toxic bacterial endotoxins inside the gut.'
      },
      {
        title: '3. Monitor Red Flag Warnings',
        instruction: 'High fever (>38.5°C), blood in stool, or sunken eyes mandate IV hospital fluid rescue.',
        caution: 'Children under 5 dehydrate in fewer than 12 hours.'
      }
    ]
  },
  {
    id: 'bone-fracture',
    number: 1,
    title: 'Bone Fracture & Trauma Splinting',
    myanmarTitle: 'အရိုးကျိုးဒဏ်ရာနှင့် အဆစ်လွဲခြင်း ရှေးဦးသူနာပြုစုနည်း',
    category: 'musculoskeletal',
    badge: 'CRITICAL',
    badgeType: 'black',
    steps: [
      {
        title: '1. Never Re-align Bone',
        instruction: 'Do not attempt to push bone fragments back into skin or straighten angulated limbs.',
        caution: 'Attempting reduction tears neurovascular bundles causing permanent paralysis.'
      },
      {
        title: '2. Immobilize Above & Below Joint',
        instruction: 'Apply rigid padded board or folded cardboard across the joints above and below fracture.',
        caution: 'Tie bandages securely but check distal pulses to ensure circulation is not choked.'
      },
      {
        title: '3. Control External Hemorrhage',
        instruction: 'If bone penetrated skin (compound fracture), cover with sterile moist dressing.',
        caution: 'Apply pressure only on surrounding bleeding tissue, never directly on exposed bone.'
      }
    ]
  },
  {
    id: 'stroke-fast',
    number: 1,
    title: 'Acute Stroke Emergency (FAST Protocol)',
    myanmarTitle: 'ရုတ်တရက် လေဖြတ်ခြင်း အရေးပေါ် စစ်ဆေးကုသနည်း (FAST စနစ်)',
    category: 'cardiovascular',
    badge: 'CRITICAL',
    badgeType: 'black',
    steps: [
      {
        title: 'F - Face Drooping (မျက်နှာရွဲ့မရွဲ့ စစ်ပါ)',
        instruction: 'Ask patient to smile. Look if one side of the face droops or is numb.',
        caution: 'Asymmetry in smile or corner of mouth dropping is an immediate sign of ischemic cerebral infarct.'
      },
      {
        title: 'A - Arm Weakness (လက်မောင်း မြှောက်ခိုင်းပါ)',
        instruction: 'Ask person to raise both arms. Check if one arm drifts downward or cannot stay lifted.',
        caution: 'Unilateral arm drift indicates motor cortex hemiparesis.'
      },
      {
        title: 'S - Speech Difficulty (စကားပြောခိုင်းပါ)',
        instruction: 'Ask person to repeat a simple phrase (e.g., "The sky is blue"). Check for slurred speech or inability to talk.',
        caution: 'Dysarthria or aphasia requires urgent thrombolysis within the 3.5 to 4.5 hour medical window.'
      },
      {
        title: 'T - Time to Call 192 (အချိန်မဆိုင်းဘဲ ဆေးရုံပို့ပါ)',
        instruction: 'If ANY of these signs appear, call 192 or rush immediately to emergency hospital. Note exact time symptoms began.',
        caution: 'Do NOT give aspirin or oral water until brain CT scan confirms ischemic vs hemorrhagic stroke.'
      }
    ]
  },
  {
    id: 'heart-attack',
    number: 2,
    title: 'Acute Heart Attack & Chest Pain',
    myanmarTitle: 'ရုတ်တရက် နှလုံးသွေးကြောပိတ် ရင်ဘတ်အောင့်ခြင်း ရှေးဦးပြုစုနည်း',
    category: 'cardiovascular',
    badge: 'CRITICAL',
    badgeType: 'black',
    steps: [
      {
        title: '1. Recognize Crushing Chest Pain (လက္ခဏာခွဲခြားပါ)',
        instruction: 'Severe squeezing or pressure in central chest radiating to left arm, neck, jaw, or back, with cold sweat.',
        caution: 'In women and diabetic patients, symptoms may present atypically as severe nausea, breathlessness, or unusual fatigue.'
      },
      {
        title: '2. Rest in Semi-Recumbent Posture (ထိုင်ခိုင်းပါ)',
        instruction: 'Sit patient on floor leaning against wall with knees bent to reduce cardiac workload. Loosen tight collars.',
        caution: 'Do NOT allow patient to walk or exert effort.'
      },
      {
        title: '3. Dispersible Aspirin & Call 192 (ဆေးဝါးနှင့် ဖုန်းခေါ်ဆိုပါ)',
        instruction: 'Call 192 immediately. If conscious and not allergic, give 300mg chewable soluble Aspirin to chew and swallow.',
        caution: 'Chewing aspirin allows rapid mucosal absorption to halt coronary thrombosis.'
      }
    ]
  }
];
