import { EmergencyHotline } from '../types';

export const HOTLINES_DATA: EmergencyHotline[] = [
  {
    id: 'ambulance',
    name: 'AMBULANCE',
    myanmarName: 'လူနာတင်ယာဉ်',
    number: '192',
    icon: 'ambulance',
    isPrimary: true,
  },
  {
    id: 'fire-rescue',
    name: 'FIRE & RESCUE',
    myanmarName: 'မီးသတ်နှင့် ကယ်ဆယ်ရေး',
    number: '191',
    icon: 'local_fire_department',
  },
  {
    id: 'red-cross',
    name: 'RED CROSS',
    myanmarName: 'ကြက်ခြေနီ အသင်း',
    number: '01-383680',
    icon: 'volunteer_activism',
  },
  {
    id: 'ygh-emergency',
    name: 'YGH EMERGENCY',
    myanmarName: 'ရန်ကုန်ဆေးရုံကြီး အရေးပေါ်',
    number: '01-256112',
    icon: 'domain',
  },
  {
    id: 'poison-center',
    name: 'POISON CENTER',
    myanmarName: 'အဆိပ်သင့်မှု သတင်းဗဟို',
    number: '01-256123',
    icon: 'science',
  },
];
