import React, { useState } from 'react';
import { QaidaLesson, QaidaWord, PronunciationAttempt, User } from '../types';
import { soundEngine } from '../utils/audioSynth';
import { VoicePracticeModal } from './VoicePracticeModal';
import { 
  BookOpen, 
  Mic, 
  Volume2, 
  CheckCircle, 
  Lock, 
  ChevronRight, 
  Search, 
  Award, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  ListFilter,
  CheckCircle2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface QaidaViewerProps {
  lessons: QaidaLesson[];
  currentUser: User | null;
  onRecordSuccess: (attempt: PronunciationAttempt) => void;
  onToggleBookmark: (wordId: string) => void;
}

export const QaidaViewer: React.FC<QaidaViewerProps> = ({
  lessons,
  currentUser,
  onRecordSuccess,
  onToggleBookmark
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || 'lesson-1');
  const [activeWordForVoice, setActiveWordForVoice] = useState<QaidaWord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  const currentLesson = lessons.find(l => l.id === selectedLessonId) || lessons[0];

  // Helper to determine if a word has been mastered by student
  const isWordMastered = (wordId: string): boolean => {
    return currentUser?.progress.masteredWordIds.includes(wordId) || false;
  };

  const isWordBookmarked = (wordId: string): boolean => {
    return currentUser?.bookmarks.includes(wordId) || false;
  };

  // Play audio for a word
  const handlePlayWord = async (e: React.MouseEvent, word: QaidaWord, rate: number = 0.85) => {
    e.stopPropagation();
    setPlayingWordId(word.id);
    if (word.teacherVoiceUrl) {
      const audio = new Audio(word.teacherVoiceUrl);
      audio.playbackRate = rate;
      audio.onended = () => setPlayingWordId(null);
      audio.onerror = async () => {
        await soundEngine.speakArabic(word.arabic, rate);
        setPlayingWordId(null);
      };
      audio.play().catch(async () => {
        await soundEngine.speakArabic(word.arabic, rate);
        setPlayingWordId(null);
      });
    } else {
      await soundEngine.speakArabic(word.arabic, rate);
      setPlayingWordId(null);
    }
  };

  // Filter words
  const filteredWords = currentLesson.words.filter(word => {
    const matchesSearch = 
      word.arabic.includes(searchQuery) ||
      word.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (word.englishMeaning && word.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase())) ||
      word.makhraj.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = levelFilter === 'all' || word.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Calculate lesson completion %
  const masteredCountInLesson = currentLesson.words.filter(w => isWordMastered(w.id)).length;
  const lessonProgressPercent = Math.round((masteredCountInLesson / currentLesson.words.length) * 100);

  // Next word handler in modal
  const handleNextWordInModal = () => {
    if (!activeWordForVoice) return;
    const currentIndex = currentLesson.words.findIndex(w => w.id === activeWordForVoice.id);
    if (currentIndex >= 0 && currentIndex < currentLesson.words.length - 1) {
      setActiveWordForVoice(currentLesson.words[currentIndex + 1]);
    }
  };

  const hasNextWord = Boolean(
    activeWordForVoice &&
    currentLesson.words.findIndex(w => w.id === activeWordForVoice.id) < currentLesson.words.length - 1
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Course Header */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded-full text-xs font-semibold text-red-400">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Certified Curriculum · Madani Qaida System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Interactive Madani Qaida
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Step-by-step authentic Quran foundation. Click any Arabic letter or word to listen to pure pronunciation, then use the microphone to evaluate your Makhraj against the required accuracy threshold.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl shrink-0">
            <div className="text-center px-3 border-r border-zinc-800">
              <span className="block text-2xl font-black text-white">{lessons.length}</span>
              <span className="text-[11px] text-zinc-400 font-medium uppercase">Lessons</span>
            </div>
            <div className="text-center px-3 border-r border-zinc-800">
              <span className="block text-2xl font-black text-red-500">
                {lessons.reduce((acc, l) => acc + l.words.length, 0)}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium uppercase">Words</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-2xl font-black text-emerald-400">
                {currentUser?.progress.masteredWordIds.length || 0}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium uppercase">Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Lessons Selector + Qaida Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidebar: Lesson Selection */}
        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 px-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-red-500" />
              <span>Qaida Curriculum</span>
            </h2>
            <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              9 Lessons
            </span>
          </div>

          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {lessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              const masteredInThis = lesson.words.filter(w => isWordMastered(w.id)).length;
              const isComplete = masteredInThis === lesson.words.length && lesson.words.length > 0;

              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded-xl transition flex flex-col gap-1 border ${
                    isSelected
                      ? 'bg-zinc-900 border-red-600 shadow-md text-white'
                      : 'bg-zinc-950/60 border-zinc-850 hover:bg-zinc-900/60 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-500">
                      Lesson {lesson.lessonNumber}
                    </span>
                    {isComplete ? (
                      <span className="text-emerald-400 text-xs flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-medium">
                        {masteredInThis}/{lesson.words.length}
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-semibold truncate text-zinc-100">
                    {lesson.title}
                  </span>

                  <span className="font-arabic text-sm text-zinc-400 text-right dir-rtl">
                    {lesson.arabicTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Lesson Board */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Lesson Header & Rules Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                    Lesson {currentLesson.lessonNumber}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs font-semibold text-zinc-400">
                    Passing Threshold: <strong className="text-white">{currentLesson.passingScore}%</strong>
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {currentLesson.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  {currentLesson.description}
                </p>
              </div>

              <div className="text-right sm:text-right font-arabic text-3xl font-bold text-red-500">
                {currentLesson.arabicTitle}
              </div>
            </div>

            {/* Lesson Rules Summary Points */}
            <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                <span>Tajweed Rules for this Lesson</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {currentLesson.rulesSummary.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold leading-none mt-0.5">•</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search and Level Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Arabic, transliteration or Makhraj..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                      levelFilter === lvl
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Word Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredWords.map((word, index) => {
              const mastered = isWordMastered(word.id);
              const bookmarked = isWordBookmarked(word.id);
              const isPlaying = playingWordId === word.id;

              return (
                <div
                  key={word.id}
                  onClick={() => setActiveWordForVoice(word)}
                  className={`group relative bg-zinc-950 border rounded-2xl p-5 text-center flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.02] shadow-md hover:shadow-xl ${
                    mastered
                      ? 'border-emerald-600/40 hover:border-emerald-500'
                      : 'border-zinc-800 hover:border-red-600'
                  }`}
                >
                  {/* Top indicators: Bookmark & Mastered Badge */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold text-zinc-400">
                      #{index + 1}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {mastered && (
                        <span className="p-0.5 text-emerald-400" title="Pronunciation Mastered">
                          <CheckCircle2 className="w-4 h-4 fill-emerald-950" />
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(word.id);
                        }}
                        className="text-zinc-500 hover:text-red-500 transition p-0.5"
                        title={bookmarked ? 'Remove Bookmark' : 'Bookmark for Review'}
                      >
                        {bookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-red-500 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Large Arabic Calligraphy */}
                  <div className="my-2">
                    <span className="font-arabic text-5xl sm:text-6xl font-bold text-white tracking-normal group-hover:text-red-400 transition-colors drop-shadow">
                      {word.arabic}
                    </span>
                  </div>

                  {/* Transliteration */}
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-200">
                      {word.transliteration}
                    </p>
                    {word.englishMeaning && (
                      <p className="text-[10px] text-zinc-400 truncate">
                        {word.englishMeaning}
                      </p>
                    )}
                  </div>

                  {/* Articulation / Makhraj Brief Tag */}
                  <div className="mt-3 pt-3 border-t border-zinc-850 text-[10px] text-zinc-400 leading-tight">
                    <span className="truncate block" title={word.makhraj}>
                      {word.makhraj}
                    </span>
                  </div>

                  {/* Actions Bar: Audio Listen + Mic Assessment */}
                  <div className="mt-3 pt-2 flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => handlePlayWord(e, word, 0.85)}
                      className={`p-2 rounded-lg transition ${
                        isPlaying
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800'
                      }`}
                      title="Listen Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveWordForVoice(word);
                      }}
                      className="flex-1 py-1.5 px-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Assess</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWords.length === 0 && (
            <div className="text-center py-12 bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
              <p className="text-sm text-zinc-400">No words match your search query or filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLevelFilter('all');
                }}
                className="mt-3 text-xs font-bold text-red-500 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Voice Practice Modal */}
      {activeWordForVoice && (
        <VoicePracticeModal
          word={activeWordForVoice}
          passingScore={currentLesson.passingScore}
          isOpen={Boolean(activeWordForVoice)}
          onClose={() => setActiveWordForVoice(null)}
          onSuccess={(attempt) => {
            onRecordSuccess(attempt);
          }}
          onNextWord={handleNextWordInModal}
          hasNextWord={hasNextWord}
        />
      )}
    </div>
  );
};
