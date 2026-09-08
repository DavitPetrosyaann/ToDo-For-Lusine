import { GradientTheme } from '../types.ts';

export type ThemeVibe = 'bright' | 'mysterious';

export interface GradientThemeMeta {
  id: GradientTheme;
  name: string;
  hyName: string;
  vibe: ThemeVibe;
  lightBg: string;
  darkBg: string;
  preview: string;
}

export const GRADIENT_THEMES: GradientThemeMeta[] = [
  {
    id: 'cotton', name: 'Warm Cotton', hyName: 'Տաք Բամբակ', vibe: 'bright',
    lightBg: 'bg-linear-to-br from-[#fdfbf7] via-[#fff5ee] to-[#f4f7f4]',
    darkBg: 'dark:bg-linear-to-br dark:from-[#111116] dark:via-[#1c1824] dark:to-[#111116]',
    preview: 'from-[#fdfbf7] via-[#fed7aa] to-[#f4f7f4]',
  },
  {
    id: 'lavender', name: 'Lavender Mist', hyName: 'Լավանդայի Մշուշ', vibe: 'bright',
    lightBg: 'bg-linear-to-br from-[#fbf8ff] via-[#f3e8ff] to-[#fce7f3]',
    darkBg: 'dark:bg-linear-to-br dark:from-[#140f22] dark:via-[#201538] dark:to-[#170e28]',
    preview: 'from-[#f3e8ff] via-[#e9d5ff] to-[#fce7f3]',
  },
  {
    id: 'matcha', name: 'Matcha Breeze', hyName: 'Մատչա Զեփյուռ', vibe: 'bright',
    lightBg: 'bg-linear-to-br from-[#f6fcf8] via-[#e6f7ee] to-[#f0fdf4]',
    darkBg: 'dark:bg-linear-to-br dark:from-[#0d1a14] dark:via-[#142820] dark:to-[#0f1f18]',
    preview: 'from-[#e6f7ee] via-[#a7f3d0] to-[#f0fdf4]',
  },
  {
    id: 'sunrise', name: 'Peach Sunrise', hyName: 'Դեղձի Արևածագ', vibe: 'bright',
    lightBg: 'bg-linear-to-br from-[#fff8f5] via-[#ffedd5] to-[#fce7f3]',
    darkBg: 'dark:bg-linear-to-br dark:from-[#1f110c] dark:via-[#2d1912] dark:to-[#1a0f19]',
    preview: 'from-[#ffedd5] via-[#fb7185] to-[#fce7f3]',
  },
  {
    id: 'ocean', name: 'Ocean Serenade', hyName: 'Օվկիանոսի Մեղեդի', vibe: 'bright',
    lightBg: 'bg-linear-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#ecfdf5]',
    darkBg: 'dark:bg-linear-to-br dark:from-[#081520] dark:via-[#0c2433] dark:to-[#091a20]',
    preview: 'from-[#e0f2fe] via-[#38bdf8] to-[#ecfdf5]',
  },
  {
    id: 'eclipse', name: 'Mystic Eclipse', hyName: 'Առեղծվածային Խավարում', vibe: 'mysterious',
    lightBg: 'bg-linear-to-br from-[#f3e8ff] via-[#d8b4fe] to-[#3b0764]/20',
    darkBg: 'dark:bg-linear-to-br dark:from-[#090514] dark:via-[#1f0d3d] dark:to-[#090314]',
    preview: 'from-[#3b0764] via-[#7e22ce] to-[#0f041c]',
  },
  {
    id: 'shadow_forest', name: 'Shadow Forest', hyName: 'Խորհրդավոր Անտառ', vibe: 'mysterious',
    lightBg: 'bg-linear-to-br from-[#ecfdf5] via-[#a7f3d0] to-[#064e3b]/20',
    darkBg: 'dark:bg-linear-to-br dark:from-[#030d07] dark:via-[#08281a] dark:to-[#020a05]',
    preview: 'from-[#064e3b] via-[#047857] to-[#021f14]',
  },
  {
    id: 'blood_moon', name: 'Blood Moon Velvet', hyName: 'Արյունոտ Լուսին', vibe: 'mysterious',
    lightBg: 'bg-linear-to-br from-[#ffe4e6] via-[#fecdd3] to-[#881337]/20',
    darkBg: 'dark:bg-linear-to-br dark:from-[#150409] dark:via-[#2e0915] dark:to-[#100206]',
    preview: 'from-[#881337] via-[#be123c] to-[#170208]',
  },
  {
    id: 'cosmic_abyss', name: 'Cosmic Abyss', hyName: 'Տիեզերական Անդունդ', vibe: 'mysterious',
    lightBg: 'bg-linear-to-br from-[#f1f5f9] via-[#cbd5e1] to-[#0f172a]/20',
    darkBg: 'dark:bg-linear-to-br dark:from-[#02050c] dark:via-[#0b1429] dark:to-[#010307]',
    preview: 'from-[#0f172a] via-[#1e3a8a] to-[#020617]',
  },
  {
    id: 'midnight', name: 'Velvet Twilight', hyName: 'Թավշյա Մթնշաղ', vibe: 'mysterious',
    lightBg: 'bg-linear-to-br from-[#f8fafc] via-[#ede9fe] to-[#e2e8f0]',
    darkBg: 'dark:bg-linear-to-br dark:from-[#090a14] dark:via-[#17142b] dark:to-[#0a0f18]',
    preview: 'from-[#1e1b4b] via-[#4338ca] to-[#0b0a1a]',
  },
];
