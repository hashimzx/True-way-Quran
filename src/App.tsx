/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, QaidaLesson, Course, SubscriptionTier, PronunciationAttempt, LiveBooking } from './types';
import { INITIAL_QAIDA_LESSONS } from './data/qaidaData';
import { COURSES_DATA } from './data/coursesData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QaidaViewer } from './components/QaidaViewer';
import { CoursesSection } from './components/CoursesSection';
import { IslamicResources } from './components/IslamicResources';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { ScheduleModal } from './components/ScheduleModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD'>('USD');
  const [timezone, setTimezone] = useState<string>('Europe/London');

  // Lessons state with custom teacher recordings capability
  const [lessons, setLessons] = useState<QaidaLesson[]>(() => {
    const saved = localStorage.getItem('twg_qaida_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_QAIDA_LESSONS;
  });

  // Current logged in student/admin
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('twg_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    // Default international student profile for immediate seamless preview
    return {
      id: 'usr-student-1',
      name: 'Hashim Zafar',
      email: 'hashimzafar2k@gmail.com',
      role: 'student',
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT)',
      enrolledCourseIds: ['course-madani-qaida'],
      progress: {
        completedLessonIds: ['lesson-1'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-8', 'w-201', 'w-202'],
        averagePronunciationScore: 86,
        practiceMinutes: 95,
        streakDays: 4,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };
  });

  // Pronunciation history
  const [pronunciationAttempts, setPronunciationAttempts] = useState<PronunciationAttempt[]>([
    {
      id: 'att-1',
      wordId: 'w-1',
      arabic: 'ا',
      transliteration: 'Alif',
      spokenText: 'alif',
      score: 95,
      passed: true,
      makhrajFeedback: 'Flawless glottal release from the mouth cavity.',
      tajweedNotes: ['Light letter properly observed.'],
      timestamp: 'Today at 09:15 AM'
    },
    {
      id: 'att-2',
      wordId: 'w-2',
      arabic: 'ب',
      transliteration: 'Baa',
      spokenText: 'baa',
      score: 92,
      passed: true,
      makhrajFeedback: 'Accurate lip closure on inner moist lips.',
      tajweedNotes: ['Clear pronunciation.'],
      timestamp: 'Today at 09:20 AM'
    },
    {
      id: 'att-3',
      wordId: 'w-6',
      arabic: 'ح',
      transliteration: 'Haa',
      spokenText: 'haa',
      score: 84,
      passed: true,
      makhrajFeedback: 'Good middle throat friction produced.',
      tajweedNotes: ['Ensure difference from chest haa is maintained.'],
      timestamp: 'Today at 09:35 AM'
    }
  ]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<Course | SubscriptionTier | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('twg_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('twg_qaida_lessons', JSON.stringify(lessons));
  }, [lessons]);

  // Handle successful student pronunciation assessment
  const handleRecordSuccess = (attempt: PronunciationAttempt) => {
    setPronunciationAttempts(prev => [attempt, ...prev]);

    if (currentUser) {
      const alreadyMastered = currentUser.progress.masteredWordIds.includes(attempt.wordId);
      const newMastered = alreadyMastered
        ? currentUser.progress.masteredWordIds
        : [...currentUser.progress.masteredWordIds, attempt.wordId];

      const newScores = [...pronunciationAttempts.map(a => a.score), attempt.score];
      const avgScore = Math.round(newScores.reduce((a, b) => a + b, 0) / newScores.length);

      setCurrentUser({
        ...currentUser,
        progress: {
          ...currentUser.progress,
          masteredWordIds: newMastered,
          averagePronunciationScore: avgScore,
          practiceMinutes: currentUser.progress.practiceMinutes + 3,
          streakDays: Math.max(currentUser.progress.streakDays, 5),
          lastPracticeDate: new Date().toISOString()
        }
      });
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = (wordId: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    const exists = currentUser.bookmarks.includes(wordId);
    const newBookmarks = exists
      ? currentUser.bookmarks.filter(id => id !== wordId)
      : [...currentUser.bookmarks, wordId];

    setCurrentUser({
      ...currentUser,
      bookmarks: newBookmarks
    });
  };

  // Handle enrollment / purchase
  const handleEnrollCourse = (course: Course) => {
    setSelectedCheckoutItem(course);
    setIsCheckoutOpen(true);
  };

  const handleSubscribe = (tier: SubscriptionTier) => {
    setSelectedCheckoutItem(tier);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (itemId: string, itemType: 'course' | 'subscription') => {
    if (currentUser) {
      const updatedEnrolled = currentUser.enrolledCourseIds.includes(itemId)
        ? currentUser.enrolledCourseIds
        : [...currentUser.enrolledCourseIds, itemId];

      setCurrentUser({
        ...currentUser,
        enrolledCourseIds: updatedEnrolled,
        subscriptionPlan: itemType === 'subscription' ? (itemId as any) : currentUser.subscriptionPlan
      });
    }
  };

  // Admin save custom teacher voice recording
  const handleSaveTeacherVoice = (lessonId: string, wordId: string, audioUrl: string) => {
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          words: lesson.words.map(word => {
            if (word.id === wordId) {
              return {
                ...word,
                teacherVoiceUrl: audioUrl
              };
            }
            return word;
          })
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setCurrentUser(null)}
        currency={currency}
        setCurrency={setCurrency}
        timezone={timezone}
        setTimezone={setTimezone}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-16">
            <Hero
              onStartQaida={() => setCurrentView('qaida')}
              onExploreCourses={() => setCurrentView('courses')}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenVoiceDemo={() => setCurrentView('qaida')}
            />

            {/* Quick Preview of Madani Qaida */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                    Course 1: Madani Qaida
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Master Arabic Letters & Exact Articulation Points
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                    9 fully structured lessons based on authentic Qaida standards. Click any letter to listen, record your voice, and unlock lessons upon reaching the passing score threshold.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('qaida')}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg glow-red-sm shrink-0"
                >
                  <span>Open Interactive Qaida</span>
                </button>
              </div>
            </div>

            {/* Courses Overview */}
            <CoursesSection
              currency={currency}
              onEnrollCourse={handleEnrollCourse}
              onSubscribe={handleSubscribe}
            />

            {/* Islamic Resources Overview */}
            <IslamicResources />
          </div>
        )}

        {currentView === 'qaida' && (
          <QaidaViewer
            lessons={lessons}
            currentUser={currentUser}
            onRecordSuccess={handleRecordSuccess}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'courses' && (
          <CoursesSection
            currency={currency}
            onEnrollCourse={handleEnrollCourse}
            onSubscribe={handleSubscribe}
          />
        )}

        {currentView === 'resources' && (
          <IslamicResources />
        )}

        {currentView === 'dashboard' && currentUser && (
          <StudentDashboard
            user={currentUser}
            onNavigateToQaida={() => setCurrentView('qaida')}
            onOpenSchedule={() => setIsScheduleOpen(true)}
            attemptsHistory={pronunciationAttempts}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            lessons={lessons}
            onUpdateLessons={setLessons}
            students={currentUser ? [currentUser] : []}
            attempts={pronunciationAttempts}
            onSaveTeacherVoice={handleSaveTeacherVoice}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentView}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setCurrentView('admin');
          } else {
            setCurrentView('dashboard');
          }
        }}
      />

      <CheckoutModal
        item={selectedCheckoutItem}
        currency={currency}
        currentUser={currentUser}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        onNavigateToQaida={() => setCurrentView('qaida')}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        currentUser={currentUser}
        timezone={timezone}
        onConfirmBooking={(booking) => {
          // Booking recorded
        }}
      />
    </div>
  );
}
