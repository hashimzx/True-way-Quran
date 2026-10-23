/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, QaidaLesson, Course, SubscriptionTier, PronunciationAttempt, LiveBooking } from './types';
import { INITIAL_QAIDA_LESSONS } from './data/qaidaData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuranReader } from './components/QuranReader';
import { SpecializedClasses } from './components/SpecializedClasses';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { BlogSection } from './components/BlogSection';
import { QaidaViewer } from './components/QaidaViewer';
import { CoursesSection } from './components/CoursesSection';
import { IslamicResources } from './components/IslamicResources';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD'>('GBP');
  const [timezone, setTimezone] = useState<string>('Europe/London');
  const [selectedTrackForTrial, setSelectedTrackForTrial] = useState<'kids' | 'adults' | 'female' | null>(null);

  // Lessons state with custom teacher recordings capability
  const [lessons, setLessons] = useState<QaidaLesson[]>(() => {
    const saved = localStorage.getItem('twq_qaida_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_QAIDA_LESSONS;
  });

  // Current logged in student/admin
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('twq_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      id: 'usr-student-1',
      name: 'Hashim Zafar',
      email: 'hashimzafar2k@gmail.com',
      role: 'student',
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT/BST)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules'],
      progress: {
        completedLessonIds: ['lesson-1'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-8', 'w-201', 'w-202'],
        averagePronunciationScore: 89,
        practiceMinutes: 110,
        streakDays: 6,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };
  });

  // Pronunciation attempts log
  const [pronunciationAttempts, setPronunciationAttempts] = useState<PronunciationAttempt[]>([
    {
      id: 'att-1',
      wordId: 'w-1',
      arabic: 'ا',
      transliteration: 'Alif',
      spokenText: 'alif',
      score: 96,
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
      score: 94,
      passed: true,
      makhrajFeedback: 'Accurate lip closure on inner moist lips.',
      tajweedNotes: ['Clear pronunciation.'],
      timestamp: 'Today at 09:20 AM'
    }
  ]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<Course | SubscriptionTier | null>(null);

  // Sync state to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('twq_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('twq_qaida_lessons', JSON.stringify(lessons));
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

  const handleOpenTrial = (track?: 'kids' | 'adults' | 'female') => {
    if (track) setSelectedTrackForTrial(track);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setCurrentUser(null)}
        currency={currency}
        setCurrency={setCurrency}
        timezone={timezone}
        setTimezone={setTimezone}
        onOpenTrial={() => handleOpenTrial()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Front like learnquraan.co.uk */}
            <Hero
              onStartQaida={() => setCurrentView('qaida')}
              onExploreCourses={() => setCurrentView('pricing')}
              onOpenQuranReader={() => setCurrentView('quran')}
              onOpenTrialBooking={() => handleOpenTrial()}
              onSelectTrack={(track) => handleOpenTrial(track)}
            />

            {/* Specialized Classes for Kids, Adults & Sisters */}
            <SpecializedClasses
              onBookTrial={(cat) => handleOpenTrial(cat)}
              onExploreQaida={() => setCurrentView('qaida')}
            />

            {/* Services Section according to learnquraan.co.uk/services.php */}
            <ServicesSection
              onSelectService={() => handleOpenTrial()}
              onOpenQaida={() => setCurrentView('qaida')}
              onBookTrial={() => handleOpenTrial()}
            />

            {/* Interactive Holy Quran Reader with Popular Scholar Voices */}
            <QuranReader />

            {/* Blog Section */}
            <BlogSection />

            {/* Contact & Free Trial Section according to learnquraan.co.uk/contact.php */}
            <ContactSection initialTrack={selectedTrackForTrial} />
          </div>
        )}

        {currentView === 'services' && (
          <ServicesSection
            onSelectService={() => handleOpenTrial()}
            onOpenQaida={() => setCurrentView('qaida')}
            onBookTrial={() => handleOpenTrial()}
          />
        )}

        {currentView === 'quran' && (
          <QuranReader />
        )}

        {currentView === 'qaida' && (
          <QaidaViewer
            lessons={lessons}
            currentUser={currentUser}
            onRecordSuccess={handleRecordSuccess}
            onToggleBookmark={handleToggleBookmark}
            onSaveTeacherVoice={handleSaveTeacherVoice}
          />
        )}

        {currentView === 'classes' && (
          <SpecializedClasses
            onBookTrial={(cat) => handleOpenTrial(cat)}
            onExploreQaida={() => setCurrentView('qaida')}
          />
        )}

        {currentView === 'pricing' && (
          <CoursesSection
            currency={currency}
            onEnrollCourse={handleEnrollCourse}
            onSubscribe={handleSubscribe}
          />
        )}

        {currentView === 'blog' && (
          <BlogSection />
        )}

        {currentView === 'contact' && (
          <ContactSection initialTrack={selectedTrackForTrial} />
        )}

        {currentView === 'dashboard' && currentUser && (
          <StudentDashboard
            user={currentUser}
            onNavigateToQaida={() => setCurrentView('qaida')}
            onOpenSchedule={() => handleOpenTrial()}
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
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTrial={() => handleOpenTrial()}
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
    </div>
  );
}
