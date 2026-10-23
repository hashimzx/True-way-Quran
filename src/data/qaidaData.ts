import { QaidaLesson } from '../types';

export const INITIAL_QAIDA_LESSONS: QaidaLesson[] = [
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'Huroof Mufradat (Individual Letters)',
    arabicTitle: 'حُرُوفُ الْمُفْرَدَات',
    description: 'Master the 29 individual letters of the Arabic alphabet with their exact points of articulation (Makharij).',
    rulesSummary: [
      'Pronounce each letter clearly from its specific point of articulation (Makhraj).',
      'Bold/Full-mouth letters (Musta\'liyah): Khaw (خ), Saad (ص), Daad (ض), Ghayn (غ), Taw (ط), Qaf (ق), Za (ظ).',
      'Throat letters (Halqiyyah): Hamzah (ء), Haa (ه), Ayn (ع), Haa (ح), Ghayn (غ), Khaa (خ).',
      'Pay careful attention not to mix soft and bold letters.'
    ],
    passingScore: 75,
    words: [
      {
        id: 'w-1',
        arabic: 'ا',
        transliteration: 'Alif',
        makhraj: 'Empty space of mouth & throat (Jawf)',
        phoneticTarget: 'alif',
        level: 'beginner',
        tajweedRule: 'Light letter, empty vowel carrier'
      },
      {
        id: 'w-2',
        arabic: 'ب',
        transliteration: 'Baa',
        makhraj: 'Moist inner parts of both lips coming together',
        phoneticTarget: 'baa',
        level: 'beginner',
        tajweedRule: 'Light letter; Qalqalah when saakin'
      },
      {
        id: 'w-3',
        arabic: 'ت',
        transliteration: 'Taa',
        makhraj: 'Tip of tongue touching roots of upper two front teeth',
        phoneticTarget: 'taa',
        level: 'beginner',
        tajweedRule: 'Light letter with Hams (slight whisper)'
      },
      {
        id: 'w-4',
        arabic: 'ث',
        transliteration: 'Thaa',
        makhraj: 'Tip of tongue touching edges of upper two front teeth',
        phoneticTarget: 'thaa',
        level: 'beginner',
        tajweedRule: 'Soft whispery sound, do not pronounce like S'
      },
      {
        id: 'w-5',
        arabic: 'ج',
        transliteration: 'Jeem',
        makhraj: 'Middle of tongue touching upper roof of palate',
        phoneticTarget: 'jeem',
        level: 'beginner',
        tajweedRule: 'Strong letter; Qalqalah when saakin'
      },
      {
        id: 'w-6',
        arabic: 'ح',
        transliteration: 'Haa (Throaty)',
        makhraj: 'Middle of the throat (Wasat al-Halq)',
        phoneticTarget: 'haa',
        level: 'intermediate',
        tajweedRule: 'Pure friction from throat, distinct from round ه'
      },
      {
        id: 'w-7',
        arabic: 'خ',
        transliteration: 'Khaa',
        makhraj: 'Upper part of throat nearest mouth (Adna al-Halq)',
        phoneticTarget: 'khaa',
        level: 'intermediate',
        tajweedRule: 'Always heavy/full-mouth (Tafkheem) with scrape'
      },
      {
        id: 'w-8',
        arabic: 'د',
        transliteration: 'Daal',
        makhraj: 'Tip of tongue touching roots of upper two incisors',
        phoneticTarget: 'daal',
        level: 'beginner',
        tajweedRule: 'Light letter; Qalqalah when saakin'
      },
      {
        id: 'w-9',
        arabic: 'ذ',
        transliteration: 'Dhaal',
        makhraj: 'Tip of tongue touching edges of upper incisors',
        phoneticTarget: 'dhaal',
        level: 'beginner',
        tajweedRule: 'Soft voiced dental fricative (like "th" in "this")'
      },
      {
        id: 'w-10',
        arabic: 'ر',
        transliteration: 'Raa',
        makhraj: 'Tip of tongue and adjacent top palate',
        phoneticTarget: 'raa',
        level: 'beginner',
        tajweedRule: 'Heavy with Fatha/Damma, light with Kasra'
      },
      {
        id: 'w-11',
        arabic: 'ز',
        transliteration: 'Zaa',
        makhraj: 'Tip of tongue between upper and lower front teeth',
        phoneticTarget: 'zaa',
        level: 'beginner',
        tajweedRule: 'Sharp whistling sound (Safeer)'
      },
      {
        id: 'w-12',
        arabic: 'س',
        transliteration: 'Seen',
        makhraj: 'Tip of tongue touching edges of lower front teeth',
        phoneticTarget: 'seen',
        level: 'beginner',
        tajweedRule: 'Light whistling letter (Safeer) with whisper'
      },
      {
        id: 'w-13',
        arabic: 'ش',
        transliteration: 'Sheen',
        makhraj: 'Middle of tongue and corresponding roof of mouth',
        phoneticTarget: 'sheen',
        level: 'beginner',
        tajweedRule: 'Spreading of air throughout mouth (Tafash-shee)'
      },
      {
        id: 'w-14',
        arabic: 'ص',
        transliteration: 'Saad',
        makhraj: 'Tip of tongue touching edges of lower incisors with full mouth',
        phoneticTarget: 'saad',
        level: 'intermediate',
        tajweedRule: 'Heavy (Musta\'liyah) + Itbaaq (pressed palate)'
      },
      {
        id: 'w-15',
        arabic: 'ض',
        transliteration: 'Daad',
        makhraj: 'One or both sides of tongue against upper molars',
        phoneticTarget: 'daad',
        level: 'advanced',
        tajweedRule: 'Unique Arabic letter with Istitaalah (elongation)'
      },
      {
        id: 'w-16',
        arabic: 'ط',
        transliteration: 'Taw',
        makhraj: 'Tip of tongue touching roots of upper front teeth with fullness',
        phoneticTarget: 'taw',
        level: 'intermediate',
        tajweedRule: 'Strongest letter in Arabic; heavy and Qalqalah'
      },
      {
        id: 'w-17',
        arabic: 'ظ',
        transliteration: 'Za (Zhaa)',
        makhraj: 'Tip of tongue touching edges of upper teeth with full mouth',
        phoneticTarget: 'zhaa',
        level: 'intermediate',
        tajweedRule: 'Heavy voiced dental fricative'
      },
      {
        id: 'w-18',
        arabic: 'ع',
        transliteration: 'Ayn',
        makhraj: 'Middle of throat with constriction of epiglottis',
        phoneticTarget: 'ayn',
        level: 'intermediate',
        tajweedRule: 'Distinct deep throat resonance, not an English A'
      },
      {
        id: 'w-19',
        arabic: 'غ',
        transliteration: 'Ghayn',
        makhraj: 'Upper throat nearest to the uvula',
        phoneticTarget: 'ghayn',
        level: 'intermediate',
        tajweedRule: 'Heavy gargling sound without stopping breath'
      },
      {
        id: 'w-20',
        arabic: 'ف',
        transliteration: 'Faa',
        makhraj: 'Edges of upper front teeth resting on wet inner lower lip',
        phoneticTarget: 'faa',
        level: 'beginner',
        tajweedRule: 'Light whispery sound'
      },
      {
        id: 'w-21',
        arabic: 'ق',
        transliteration: 'Qaaf',
        makhraj: 'Extreme back of tongue against soft roof of mouth',
        phoneticTarget: 'qaaf',
        level: 'intermediate',
        tajweedRule: 'Deep heavy sound with Qalqalah when saakin'
      },
      {
        id: 'w-22',
        arabic: 'ك',
        transliteration: 'Kaaf',
        makhraj: 'Back of tongue just forward of Qaaf against hard palate',
        phoneticTarget: 'kaaf',
        level: 'beginner',
        tajweedRule: 'Light letter with Hams (slight air puff)'
      },
      {
        id: 'w-23',
        arabic: 'ل',
        transliteration: 'Laam',
        makhraj: 'Side of front tongue to its tip touching front gum ridge',
        phoneticTarget: 'laam',
        level: 'beginner',
        tajweedRule: 'Light except in the Majestic name of Allah (after Fatha/Damma)'
      },
      {
        id: 'w-24',
        arabic: 'م',
        transliteration: 'Meem',
        makhraj: 'Dry outer portions of both lips meeting',
        phoneticTarget: 'meem',
        level: 'beginner',
        tajweedRule: 'Nasal resonance (Ghunnah) when doubled'
      },
      {
        id: 'w-25',
        arabic: 'ن',
        transliteration: 'Noon',
        makhraj: 'Tip of tongue touching gum line behind upper incisors',
        phoneticTarget: 'noon',
        level: 'beginner',
        tajweedRule: 'Natural Ghunnah emitted through the nasal cavity'
      },
      {
        id: 'w-26',
        arabic: 'و',
        transliteration: 'Waw',
        makhraj: 'Rounding of both lips leaving circular opening',
        phoneticTarget: 'waw',
        level: 'beginner',
        tajweedRule: 'Smooth lip circle, do not touch teeth'
      },
      {
        id: 'w-27',
        arabic: 'ه',
        transliteration: 'Haa (Chest/Deep)',
        makhraj: 'Deepest part of the throat near chest (Aqsa al-Halq)',
        phoneticTarget: 'haa_chest',
        level: 'beginner',
        tajweedRule: 'Soft breathy sound like "home"'
      },
      {
        id: 'w-28',
        arabic: 'ء',
        transliteration: 'Hamzah',
        makhraj: 'Deepest part of throat with complete glottal stop',
        phoneticTarget: 'hamzah',
        level: 'beginner',
        tajweedRule: 'Crisp glottal stop'
      },
      {
        id: 'w-29',
        arabic: 'ي',
        transliteration: 'Yaa',
        makhraj: 'Middle of tongue raised toward roof of palate',
        phoneticTarget: 'yaa',
        level: 'beginner',
        tajweedRule: 'Smooth palatal semi-vowel'
      }
    ]
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'Huroof Murakkabat (Compound Letters)',
    arabicTitle: 'حُرُوفُ الْمُرَكَّبَات',
    description: 'Learn how Arabic letters connect at the beginning, middle, and end of words.',
    rulesSummary: [
      'Identify letters by their distinctive heads, dots, and baseline strokes.',
      'One dot below: Baa (ب). Two dots above: Taa (ت). Three dots above: Thaa (ث).',
      'One dot inside curve: Jeem (ج). Without dot: Haa (ح). One dot above: Khaa (خ).',
      'Read compound combinations from right to left smoothly.'
    ],
    passingScore: 75,
    words: [
      {
        id: 'w-201',
        arabic: 'لا',
        transliteration: 'Laam-Alif',
        makhraj: 'Laam from tongue front + Alif from open mouth',
        phoneticTarget: 'laam alif',
        level: 'beginner',
        tajweedRule: 'Laam connects to Alif forming classic ligatures'
      },
      {
        id: 'w-202',
        arabic: 'با',
        transliteration: 'Baa-Alif',
        makhraj: 'Lips closing for Baa + stretch of Alif',
        phoneticTarget: 'baa alif',
        level: 'beginner',
        tajweedRule: 'Baa head followed by tall vertical Alif'
      },
      {
        id: 'w-203',
        arabic: 'تا',
        transliteration: 'Taa-Alif',
        makhraj: 'Tip of tongue for Taa + stretch of Alif',
        phoneticTarget: 'taa alif',
        level: 'beginner',
        tajweedRule: 'Two dots above denote initial Taa'
      },
      {
        id: 'w-204',
        arabic: 'ثا',
        transliteration: 'Thaa-Alif',
        makhraj: 'Tip of tongue between teeth + Alif',
        phoneticTarget: 'thaa alif',
        level: 'beginner',
        tajweedRule: 'Three dots above denote initial Thaa'
      },
      {
        id: 'w-205',
        arabic: 'بل',
        transliteration: 'Baa-Laam',
        makhraj: 'Lips + Tongue tip to upper gums',
        phoneticTarget: 'baa laam',
        level: 'beginner',
        tajweedRule: 'Short Baa tooth connecting upward to tall Laam'
      },
      {
        id: 'w-206',
        arabic: 'جا',
        transliteration: 'Jeem-Alif',
        makhraj: 'Middle of tongue + open throat',
        phoneticTarget: 'jeem alif',
        level: 'beginner',
        tajweedRule: 'Jeem head with lower dot joining Alif'
      },
      {
        id: 'w-207',
        arabic: 'حق',
        transliteration: 'Haa-Qaaf',
        makhraj: 'Middle throat Haa + Deep back tongue Qaaf',
        phoneticTarget: 'haa qaaf',
        level: 'intermediate',
        tajweedRule: 'Pure throaty Haa joined with deep Qaaf'
      },
      {
        id: 'w-208',
        arabic: 'خب',
        transliteration: 'Khaa-Baa',
        makhraj: 'Upper throat Khaa + Both lips Baa',
        phoneticTarget: 'khaa baa',
        level: 'intermediate',
        tajweedRule: 'Heavy Khaa leading into soft Baa'
      },
      {
        id: 'w-209',
        arabic: 'نل',
        transliteration: 'Noon-Laam',
        makhraj: 'Upper gums Noon + Upper gums Laam',
        phoneticTarget: 'noon laam',
        level: 'beginner',
        tajweedRule: 'Single dot above identifies initial Noon'
      },
      {
        id: 'w-210',
        arabic: 'يل',
        transliteration: 'Yaa-Laam',
        makhraj: 'Middle tongue Yaa + Upper gums Laam',
        phoneticTarget: 'yaa laam',
        level: 'beginner',
        tajweedRule: 'Two dots beneath identify initial Yaa'
      }
    ]
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'Harakat (Short Vowels: Zabar, Zer, Pesh)',
    arabicTitle: 'الْحَرَكَات : فَتْحَة ، كَسْرَة ، ضَمَّة',
    description: 'Learn the three primary short vowels: Fatha (Zabar), Kasrah (Zer), and Dammah (Pesh).',
    rulesSummary: [
      'Harakat must be read quickly without stretching (each is 1 count / Harakah).',
      'Fatha / Zabar (ـَ) produces an "a" vowel sound (e.g., Ba).',
      'Kasrah / Zer (ـِ) produces an "i" vowel sound (e.g., Bi).',
      'Dammah / Pesh (ـُ) produces an "u" vowel sound with rounded lips (e.g., Bu).'
    ],
    passingScore: 80,
    words: [
      {
        id: 'w-301',
        arabic: 'بَ',
        transliteration: 'Ba',
        makhraj: 'Lips + quick open vowel',
        phoneticTarget: 'ba',
        level: 'beginner',
        tajweedRule: '1 Harakah, open mouth without stretching'
      },
      {
        id: 'w-302',
        arabic: 'بِ',
        transliteration: 'Bi',
        makhraj: 'Lips + lower jaw lowering',
        phoneticTarget: 'bi',
        level: 'beginner',
        tajweedRule: '1 Harakah, crisp short "i" sound'
      },
      {
        id: 'w-303',
        arabic: 'بُ',
        transliteration: 'Bu',
        makhraj: 'Lips rounded forward',
        phoneticTarget: 'bu',
        level: 'beginner',
        tajweedRule: '1 Harakah, round lips into circle'
      },
      {
        id: 'w-304',
        arabic: 'تَ',
        transliteration: 'Ta',
        makhraj: 'Tip of tongue to upper teeth roots + short vowel',
        phoneticTarget: 'ta',
        level: 'beginner',
        tajweedRule: 'Light, crisp short "a"'
      },
      {
        id: 'w-305',
        arabic: 'تِ',
        transliteration: 'Ti',
        makhraj: 'Tip of tongue + short "i"',
        phoneticTarget: 'ti',
        level: 'beginner',
        tajweedRule: 'Light, crisp short "i"'
      },
      {
        id: 'w-306',
        arabic: 'تُ',
        transliteration: 'Tu',
        makhraj: 'Tip of tongue + rounded lips',
        phoneticTarget: 'tu',
        level: 'beginner',
        tajweedRule: 'Short rounded vowel'
      },
      {
        id: 'w-307',
        arabic: 'دَرَسَ',
        transliteration: 'Da-ra-sa',
        englishMeaning: 'He studied',
        makhraj: 'Tip of tongue + heavy Raa + light Seen',
        phoneticTarget: 'darasa',
        level: 'intermediate',
        tajweedRule: 'Read each harakah with equal short timing'
      },
      {
        id: 'w-308',
        arabic: 'كَتَبَ',
        transliteration: 'Ka-ta-ba',
        englishMeaning: 'He wrote',
        makhraj: 'Palate + teeth roots + lips',
        phoneticTarget: 'kataba',
        level: 'intermediate',
        tajweedRule: 'All three letters are light (Tarqeeq)'
      },
      {
        id: 'w-309',
        arabic: 'رُزِقَ',
        transliteration: 'Ru-zi-qa',
        englishMeaning: 'Was provided',
        makhraj: 'Tongue tip + teeth + deep palate',
        phoneticTarget: 'ruziqa',
        level: 'intermediate',
        tajweedRule: 'Raa is heavy with Dammah; Qaaf is heavy with Fatha'
      }
    ]
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'Tanween (Double Vowels)',
    arabicTitle: 'التَّنْوِين : فَتْحَتَان ، كَسْرَتَان ، ضَمَّتَان',
    description: 'Learn double short vowels that end in a hidden Noon Sakinah sound.',
    rulesSummary: [
      'Two Zabars / Tanween Fath (ـً): sounds like "an". Usually written with an Alif support.',
      'Two Zers / Tanween Kasr (ـٍ): sounds like "in".',
      'Two Pesh / Tanween Damm (ـٌ): sounds like "un".',
      'The sound comes from the nasal passage (Khayshoom).'
    ],
    passingScore: 80,
    words: [
      {
        id: 'w-401',
        arabic: 'بً',
        transliteration: 'Ban',
        makhraj: 'Lips + nasal Noon sound',
        phoneticTarget: 'ban',
        level: 'beginner',
        tajweedRule: 'Tanween Fath with hidden Noon sound'
      },
      {
        id: 'w-402',
        arabic: 'بٍ',
        transliteration: 'Bin',
        makhraj: 'Lips + lower jaw + nasal cavity',
        phoneticTarget: 'bin',
        level: 'beginner',
        tajweedRule: 'Tanween Kasr'
      },
      {
        id: 'w-403',
        arabic: 'بٌ',
        transliteration: 'Bun',
        makhraj: 'Rounded lips + nasal sound',
        phoneticTarget: 'bun',
        level: 'beginner',
        tajweedRule: 'Tanween Damm'
      },
      {
        id: 'w-404',
        arabic: 'كِتَابًا',
        transliteration: 'Kitaaban',
        englishMeaning: 'A book',
        makhraj: 'Light letters + nasal Tanween at end',
        phoneticTarget: 'kitaaban',
        level: 'intermediate',
        tajweedRule: 'Taa is stretched 2 counts before Tanween'
      },
      {
        id: 'w-405',
        arabic: 'عَلِيمٌ',
        transliteration: 'Aleemun',
        englishMeaning: 'All-Knowing',
        makhraj: 'Deep throat Ayn + stretched Yaa + Tanween',
        phoneticTarget: 'aleemun',
        level: 'intermediate',
        tajweedRule: 'Maddah on Leem + clear Tanween Damm'
      },
      {
        id: 'w-406',
        arabic: 'رَحِيمًا',
        transliteration: 'Raheeman',
        englishMeaning: 'Most Merciful',
        makhraj: 'Heavy Raa + middle throat Haa + Tanween',
        phoneticTarget: 'raheeman',
        level: 'intermediate',
        tajweedRule: 'Heavy Raa followed by soft Haa and Madd'
      }
    ]
  },
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: 'Huroof-e-Maddah & Leen (Prolongation)',
    arabicTitle: 'حُرُوفُ الْمَدِّ وَاللِّين',
    description: 'Learn the letters that prolong sounds for 2 counts (Alif, Waw, and Yaa).',
    rulesSummary: [
      'Alif Maddah: An empty Alif preceded by a Fatha (ـَا) - stretch 2 counts.',
      'Waw Maddah: A Waw Saakin preceded by a Dammah (ـُو) - stretch 2 counts.',
      'Yaa Maddah: A Yaa Saakin preceded by a Kasrah (ـِي) - stretch 2 counts.',
      'Huroof-e-Leen: Waw Saakin or Yaa Saakin preceded by Fatha - read softly without jerk.'
    ],
    passingScore: 80,
    words: [
      {
        id: 'w-501',
        arabic: 'بَا',
        transliteration: 'Baa (2 counts)',
        makhraj: 'Lips + hollow mouth/throat',
        phoneticTarget: 'baa',
        level: 'beginner',
        tajweedRule: 'Madd Asli: Stretch exactly 2 Harakah counts'
      },
      {
        id: 'w-502',
        arabic: 'بُو',
        transliteration: 'Boo (2 counts)',
        makhraj: 'Round lips held for 2 counts',
        phoneticTarget: 'boo',
        level: 'beginner',
        tajweedRule: 'Waw Maddah: Smooth extended "oo"'
      },
      {
        id: 'w-503',
        arabic: 'بِي',
        transliteration: 'Bee (2 counts)',
        makhraj: 'Middle of tongue raised for 2 counts',
        phoneticTarget: 'bee',
        level: 'beginner',
        tajweedRule: 'Yaa Maddah: Smooth extended "ee"'
      },
      {
        id: 'w-504',
        arabic: 'نُوحِيهَا',
        transliteration: 'Noo-hee-haa',
        englishMeaning: 'We reveal it',
        makhraj: 'Combines all three Madd letters in one word!',
        phoneticTarget: 'nooheehaa',
        level: 'intermediate',
        tajweedRule: 'Waw Maddah (Noo) + Yaa Maddah (Hee) + Alif Maddah (Haa)'
      },
      {
        id: 'w-505',
        arabic: 'بَوْ',
        transliteration: 'Baw (Soft)',
        makhraj: 'Lips + soft slide to Waw',
        phoneticTarget: 'baw',
        level: 'beginner',
        tajweedRule: 'Waw Leen: Soft glide, not harsh'
      },
      {
        id: 'w-506',
        arabic: 'بَيْ',
        transliteration: 'Bay (Soft)',
        makhraj: 'Lips + soft slide to Yaa',
        phoneticTarget: 'bay',
        level: 'beginner',
        tajweedRule: 'Yaa Leen: Soft glide, not harsh'
      }
    ]
  },
  {
    id: 'lesson-6',
    lessonNumber: 6,
    title: 'Sukoon & Jazm (Resting Letters & Qalqalah)',
    arabicTitle: 'السُّكُون وَالْقَلْقَلَة',
    description: 'Master letters with a Sukoon (Jazm) and the 5 Qalqalah (echo/bouncing) letters.',
    rulesSummary: [
      'A letter with Sukoon (ـْ) is called Saakin and connects to the preceding moving letter.',
      'The 5 Qalqalah Letters are gathered in: قُطْبُ جَدٍ (Qaaf, Taw, Baa, Jeem, Daal).',
      'When these 5 letters have a Sukoon, pronounce them with a crisp bounce/echo.',
      'Do not bounce non-Qalqalah letters.'
    ],
    passingScore: 80,
    words: [
      {
        id: 'w-601',
        arabic: 'أَبْ',
        transliteration: 'Ab (Echo)',
        makhraj: 'Glottal stop + crisp lip rebound',
        phoneticTarget: 'ab',
        level: 'beginner',
        tajweedRule: 'Qalqalah on Baa: Let lips pop open with echo'
      },
      {
        id: 'w-602',
        arabic: 'أَقْ',
        transliteration: 'Aq (Heavy Echo)',
        makhraj: 'Hamzah + deep palate bounce',
        phoneticTarget: 'aq',
        level: 'intermediate',
        tajweedRule: 'Qalqalah on Qaaf: Deep heavy explosive bounce'
      },
      {
        id: 'w-603',
        arabic: 'أَطْ',
        transliteration: 'At (Heavy Echo)',
        makhraj: 'Hamzah + upper teeth roots full mouth',
        phoneticTarget: 'at',
        level: 'intermediate',
        tajweedRule: 'Qalqalah on Taw: Strongest bounce in Arabic'
      },
      {
        id: 'w-604',
        arabic: 'أَجْ',
        transliteration: 'Aj (Crisp Echo)',
        makhraj: 'Hamzah + middle palate bounce',
        phoneticTarget: 'aj',
        level: 'beginner',
        tajweedRule: 'Qalqalah on Jeem: Clear bounce without whistling'
      },
      {
        id: 'w-605',
        arabic: 'أَدْ',
        transliteration: 'Ad (Crisp Echo)',
        makhraj: 'Hamzah + tongue tip upper teeth bounce',
        phoneticTarget: 'ad',
        level: 'beginner',
        tajweedRule: 'Qalqalah on Daal: Light clear bounce'
      },
      {
        id: 'w-606',
        arabic: 'قُلْ',
        transliteration: 'Qul',
        englishMeaning: 'Say!',
        makhraj: 'Heavy Qaaf + resting Laam',
        phoneticTarget: 'qul',
        level: 'beginner',
        tajweedRule: 'Qaaf is heavy; Laam has NO Qalqalah (hold firmly)'
      },
      {
        id: 'w-607',
        arabic: 'الْحَمْدُ',
        transliteration: 'Al-Hamdu',
        englishMeaning: 'All Praise is due to Allah',
        makhraj: 'Laam resting + middle throat Haa + Meem resting',
        phoneticTarget: 'alhamdu',
        level: 'intermediate',
        tajweedRule: 'Pronounce Laam and Meem with moderate flow (Tawassut)'
      }
    ]
  },
  {
    id: 'lesson-7',
    lessonNumber: 7,
    title: 'Tashdeed / Shaddah (Doubled Letters)',
    arabicTitle: 'التَّشْدِيد : الْمُشَدَّد',
    description: 'Learn letters marked with a Shaddah (ـّ) which are pronounced with emphasis as two letters.',
    rulesSummary: [
      'A letter with Shaddah is read twice: the first time with Sukoon, the second with a vowel.',
      'Hold the letter with emphasis without pausing between the two halves.',
      'Noon Mushaddad and Meem Mushaddad require mandatory Ghunnah (nasal hum for 2 counts).'
    ],
    passingScore: 80,
    words: [
      {
        id: 'w-701',
        arabic: 'رَبِّ',
        transliteration: 'Rabbi',
        englishMeaning: 'My Lord',
        makhraj: 'Heavy Raa + doubled Baa with firm lip press',
        phoneticTarget: 'rabbi',
        level: 'beginner',
        tajweedRule: 'Shaddah on Baa: Press lips firmly, release into Kasrah'
      },
      {
        id: 'w-702',
        arabic: 'إِنَّ',
        transliteration: 'Inna (with Ghunnah)',
        englishMeaning: 'Indeed / Verily',
        makhraj: 'Hamzah + 2-count nasal hum on Noon',
        phoneticTarget: 'inna',
        level: 'beginner',
        tajweedRule: 'Noon Mushaddad: Mandatory Ghunnah of 2 counts'
      },
      {
        id: 'w-703',
        arabic: 'ثُمَّ',
        transliteration: 'Thumma (with Ghunnah)',
        englishMeaning: 'Then',
        makhraj: 'Soft Thaa + 2-count nasal hum on Meem',
        phoneticTarget: 'thumma',
        level: 'beginner',
        tajweedRule: 'Meem Mushaddad: Hold nasal sound for 2 counts'
      },
      {
        id: 'w-704',
        arabic: 'مُحَمَّدٌ',
        transliteration: 'Muhammadun',
        englishMeaning: 'The Praised One (Prophet)',
        makhraj: 'Meem + middle throat Haa + Meem Mushaddad + Tanween',
        phoneticTarget: 'muhammadun',
        level: 'intermediate',
        tajweedRule: 'Ghunnah on doubled Meem + Tanween Damm'
      }
    ]
  },
  {
    id: 'lesson-8',
    lessonNumber: 8,
    title: 'Rules of Noon Sakinah & Tanween',
    arabicTitle: 'أَحْكَامُ النُّونِ السَّاكِنَةِ وَالتَّنْوِين',
    description: 'Master the 4 fundamental Tajweed rules: Izhar, Idgham, Iqlab, and Ikhfa.',
    rulesSummary: [
      'Izhar (Clarity): When followed by throat letters (ء ه ع ح غ خ), read Noon clearly without extra hum.',
      'Idgham (Merging): When followed by ي ر م ل و ن (Yarmaloon), merge the Noon into the next letter.',
      'Iqlab (Conversion): When followed by Baa (ب), turn the Noon into a light Meem with Ghunnah.',
      'Ikhfa (Concealment): When followed by any of the other 15 letters, hide the Noon with a soft nasal buzz.'
    ],
    passingScore: 80,
    words: [
      {
        id: 'w-801',
        arabic: 'مَنْ ءَامَنَ',
        transliteration: 'Man aamana',
        englishMeaning: 'Whoever believed',
        makhraj: 'Clear Noon because of Hamzah (Izhar Halqi)',
        phoneticTarget: 'man aamana',
        level: 'intermediate',
        tajweedRule: 'Izhar Halqi: Clear pronunciation with zero nasal drag'
      },
      {
        id: 'w-802',
        arabic: 'مَن يَقُولُ',
        transliteration: 'May-yaqoolu',
        englishMeaning: 'Whoever says',
        makhraj: 'Noon merges into Yaa with nasal sound',
        phoneticTarget: 'may yaqoolu',
        level: 'advanced',
        tajweedRule: 'Idgham with Ghunnah: Merge Noon completely into Yaa'
      },
      {
        id: 'w-803',
        arabic: 'مِن بَعْدِ',
        transliteration: 'Mim-ba\'di',
        englishMeaning: 'After that',
        makhraj: 'Noon converts to Meem before Baa',
        phoneticTarget: 'mim ba\'di',
        level: 'advanced',
        tajweedRule: 'Iqlab: Small Meem replaces Noon, hold 2 counts'
      },
      {
        id: 'w-804',
        arabic: 'مِن قَبْلُ',
        transliteration: 'Min qablu (Heavy Ikhfa)',
        englishMeaning: 'From before',
        makhraj: 'Conceal Noon near point of Qaaf',
        phoneticTarget: 'min qablu',
        level: 'advanced',
        tajweedRule: 'Ikhfa with heavy Ghunnah because Qaaf is heavy'
      }
    ]
  },
  {
    id: 'lesson-9',
    lessonNumber: 9,
    title: 'Quranic Recitation & Short Surahs',
    arabicTitle: 'تِلاوَةُ الْقُرْآنِ الْكَرِيم : قِصَارُ السُّوَر',
    description: 'Apply all Tajweed rules in authentic Quranic verses and short Surahs.',
    rulesSummary: [
      'Begin recitation with Ta\'awwudh (Seeking refuge) and Basmalah.',
      'Stop at the end of verses cleanly, turning the final vowel into a Sukoon (Waqf).',
      'Observe all Madd, Qalqalah, and Ghunnah rules with reverence.'
    ],
    passingScore: 85,
    words: [
      {
        id: 'w-901',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillahir-Rahmanir-Raheem',
        englishMeaning: 'In the name of Allah, the Most Gracious, Most Merciful',
        makhraj: 'Full mouth Raa, light Laam, long Madd on Raheem',
        phoneticTarget: 'bismillah ir rahman ir raheem',
        level: 'intermediate',
        tajweedRule: 'Laam in Allah is light because of Kasrah before it; Waqf on Meem'
      },
      {
        id: 'w-902',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul Huwallahu Ahad',
        englishMeaning: 'Say, He is Allah, [who is] One',
        makhraj: 'Deep Qaaf + full heavy Laam in Allah + Qalqalah on Daal',
        phoneticTarget: 'qul huwallahu ahad',
        level: 'intermediate',
        tajweedRule: 'Surah Al-Ikhlas Verse 1: Powerful Qalqalah Kubra on Ahad when stopping'
      },
      {
        id: 'w-903',
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allahus-Samad',
        englishMeaning: 'Allah, the Eternal Refuge',
        makhraj: 'Heavy Laam + heavy Saad + Qalqalah on Daal',
        phoneticTarget: 'allahus samad',
        level: 'intermediate',
        tajweedRule: 'Surah Al-Ikhlas Verse 2: Heavy Saad + Qalqalah at stop'
      },
      {
        id: 'w-904',
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa lam yoolad',
        englishMeaning: 'He neither begets nor is born',
        makhraj: 'Clear Meem resting + Qalqalah on both Daals',
        phoneticTarget: 'lam yalid wa lam yoolad',
        level: 'intermediate',
        tajweedRule: 'Izhar Shafawi on Meem + Qalqalah Sughra and Kubra on Daal'
      },
      {
        id: 'w-905',
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Wa lam yakun lahu kufuwan ahad',
        englishMeaning: 'Nor is there to Him any equivalent',
        makhraj: 'Noon merges into Laam without Ghunnah + Qalqalah at stop',
        phoneticTarget: 'wa lam yakul lahu kufuwan ahad',
        level: 'advanced',
        tajweedRule: 'Idgham Bila Ghunnah on Noon-Laam + Qalqalah on final Daal'
      }
    ]
  }
];
