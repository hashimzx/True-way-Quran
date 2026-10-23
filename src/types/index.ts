export type UserRole = 'student' | 'admin' | 'instructor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  country: string;
  timezone: string;
  enrolledCourseIds: string[];
  subscriptionPlan?: 'monthly' | 'quarterly' | 'annual' | 'lifetime';
  progress: {
    completedLessonIds: string[];
    masteredWordIds: string[];
    averagePronunciationScore: number;
    practiceMinutes: number;
    streakDays: number;
    lastPracticeDate: string;
  };
  bookmarks: string[]; // word IDs
}

export interface QaidaWord {
  id: string;
  arabic: string;
  transliteration: string;
  englishMeaning?: string;
  makhraj: string; // Articulation point
  tajweedRule?: string;
  audioClip?: string;
  phoneticTarget: string; // for speech matching
  level: 'beginner' | 'intermediate' | 'advanced';
  teacherVoiceUrl?: string; // custom teacher audio
}

export interface QaidaLesson {
  id: string;
  lessonNumber: number;
  title: string;
  arabicTitle: string;
  description: string;
  rulesSummary: string[];
  passingScore: number; // e.g. 75%
  words: QaidaWord[];
}

export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  tagline: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  totalLessons: number;
  featured?: boolean;
  instructorName: string;
  instructorTitle: string;
  prices: {
    USD: number;
    GBP: number;
    EUR: number;
    CAD: number;
    AUD: number;
  };
  syllabus: { title: string; topics: string[] }[];
  features: string[];
}

export interface PronunciationAttempt {
  id: string;
  wordId: string;
  arabic: string;
  transliteration: string;
  spokenText: string;
  score: number; // 0-100
  passed: boolean;
  makhrajFeedback: string;
  tajweedNotes: string[];
  timestamp: string;
  audioUrl?: string;
}

export interface PrayerTimeData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface IslamicDua {
  id: string;
  category: 'daily' | 'morning_evening' | 'prayer' | 'forgiveness' | 'protection';
  title: string;
  arabic: string;
  transliteration: string;
  englishTranslation: string;
  reference: string;
  virtue?: string;
}

export interface LiveBooking {
  id: string;
  studentId: string;
  studentName: string;
  instructorName: string;
  date: string;
  timeSlot: string;
  timezone: string;
  courseTitle: string;
  status: 'confirmed' | 'pending' | 'completed';
}
