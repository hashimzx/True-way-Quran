import React, { useState } from 'react';
import { User, Course, PronunciationAttempt } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { INITIAL_QAIDA_LESSONS } from '../data/qaidaData';
import { 
  User as UserIcon, 
  Award, 
  Flame, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Mic, 
  Volume2, 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  FileText, 
  RotateCcw,
  Globe,
  Download
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onNavigateToQaida: (lessonId?: string) => void;
  onOpenSchedule: () => void;
  attemptsHistory: PronunciationAttempt[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onNavigateToQaida,
  onOpenSchedule,
  attemptsHistory
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  // Enrolled courses data
  const enrolledCourses = COURSES_DATA.filter(c => user.enrolledCourseIds.includes(c.id));

  // Total words across qaida
  const totalQaidaWords = INITIAL_QAIDA_LESSONS.reduce((acc, l) => acc + l.words.length, 0);
  const wordsMastered = user.progress.masteredWordIds.length;
  const overallProgressPercent = Math.min(100, Math.round((wordsMastered / totalQaidaWords) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Student Greeting & Profile Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-black border-2 border-red-500/40 flex items-center justify-center text-white font-black text-2xl shadow-xl">
              {user.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  As-salamu alaykum, {user.name}
                </h1>
                <span className="text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-2 py-0.5 rounded-full font-bold uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-red-500" />
                <span>{user.country} · Timezone: {user.timezone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToQaida()}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg glow-red-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Resume Madani Qaida</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-red-500" />
              <span>Book 1-on-1 Class</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Qaida Mastery</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-black text-white">{overallProgressPercent}%</span>
          <span className="text-[11px] text-zinc-500 block">{wordsMastered} / {totalQaidaWords} words cleared</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Pronunciation Avg.</span>
            <Mic className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-3xl font-black text-white">
            {user.progress.averagePronunciationScore || 85}%
          </span>
          <span className="text-[11px] text-zinc-500 block">Across voice assessments</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Practice Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-white">
            {user.progress.streakDays} Days
          </span>
          <span className="text-[11px] text-zinc-500 block">Consistency is blessed</span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Study Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-3xl font-black text-white">
            {user.progress.practiceMinutes} min
          </span>
          <span className="text-[11px] text-zinc-500 block">Total recitation drills</span>
        </div>
      </div>

      {/* Main 2-column view: Enrolled Courses & Assessment History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Courses (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-500" />
                <span>My Active Enrolled Courses</span>
              </h2>
              <span className="text-xs text-zinc-400 font-semibold">
                {enrolledCourses.length} Enrolled
              </span>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                      {course.level} · {course.duration}
                    </span>
                    <h3 className="text-base font-bold text-white">{course.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">{course.tagline}</p>
                    <p className="text-[11px] text-zinc-500">Instructor: {course.instructorName}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => onNavigateToQaida()}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {enrolledCourses.length === 0 && (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  <p>You have not enrolled in additional paid courses yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Generation Preview */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600/10 text-red-500 rounded-xl shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Madani Qaida Completion Certificate</h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Reach 75%+ pronunciation accuracy on all lessons to unlock and download your official True Way Growth certificate.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCertificate(!showCertificate)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold border border-zinc-700 transition shrink-0"
            >
              {showCertificate ? 'Hide Preview' : 'Preview Certificate'}
            </button>
          </div>

          {/* Interactive Certificate Modal / Box */}
          {showCertificate && (
            <div className="bg-zinc-900 border-4 border-amber-600/60 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative">
              <div className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                True Way Growth International Quran Academy
              </div>
              <h2 className="text-3xl font-black text-white font-serif tracking-wide">
                Certificate of Tajweed Excellence
              </h2>
              <p className="text-xs text-zinc-400">This certifies that</p>
              <h3 className="text-2xl font-black text-red-500 underline decoration-red-600/40 underline-offset-8">
                {user.name}
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                has successfully fulfilled all pronunciation assessments and point-of-articulation (Makharij) requirements for the <strong>Complete Madani Qaida Foundation</strong> course.
              </p>
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between max-w-sm mx-auto text-[11px] text-zinc-400">
                <div>
                  <span className="block font-bold text-white">Qari Bilal Al-Azhari</span>
                  <span>Chief Tajweed Examiner</span>
                </div>
                <div>
                  <span className="block font-bold text-white">{new Date().toLocaleDateString()}</span>
                  <span>Issue Date</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Recent Pronunciation Assessments */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-red-500" />
                <span>Voice Assessment Log</span>
              </h2>
              <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-900 px-2 py-0.5 rounded">
                Recent
              </span>
            </div>

            <div className="space-y-3">
              {attemptsHistory.slice(0, 6).map((att) => (
                <div
                  key={att.id}
                  className="bg-zinc-900/70 border border-zinc-850 rounded-xl p-3.5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-arabic text-lg font-bold text-white">{att.arabic}</span>
                      <span className="text-zinc-400 font-medium">({att.transliteration})</span>
                    </div>

                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        att.passed
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                          : 'bg-red-950/60 text-red-400 border border-red-800/50'
                      }`}
                    >
                      {att.score}% · {att.passed ? 'Passed' : 'Retry'}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2">
                    {att.makhrajFeedback}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-500">
                    <span>{att.timestamp}</span>
                    {att.audioUrl && (
                      <button
                        onClick={() => new Audio(att.audioUrl).play()}
                        className="text-red-400 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen Voice</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {attemptsHistory.length === 0 && (
                <div className="text-center py-6 text-zinc-500 text-xs">
                  No voice recordings yet. Open any Madani Qaida word and press Assess to build your history!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
