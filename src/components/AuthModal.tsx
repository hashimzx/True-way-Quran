import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  Globe, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      setForgotSuccess(true);
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: mode === 'register' ? name : (email.includes('admin') ? 'TWG Director' : 'Hashim Zafar'),
      email: email || 'student@truewaygrowth.com',
      role: email.toLowerCase().includes('admin') ? 'admin' : 'student',
      country: country,
      timezone: 'Europe/London (GMT)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules'],
      progress: {
        completedLessonIds: ['lesson-1', 'lesson-2'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-201', 'w-202'],
        averagePronunciationScore: 88,
        practiceMinutes: 145,
        streakDays: 5,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };

    onLogin(newUser);
    onClose();
  };

  const loginAsDemoStudent = () => {
    const studentUser: User = {
      id: 'demo-student-1',
      name: 'Hashim Zafar',
      email: 'hashimzafar2k@gmail.com',
      role: 'student',
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules'],
      progress: {
        completedLessonIds: ['lesson-1', 'lesson-2'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-201', 'w-202'],
        averagePronunciationScore: 88,
        practiceMinutes: 160,
        streakDays: 7,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };
    onLogin(studentUser);
    onClose();
  };

  const loginAsDemoAdmin = () => {
    const adminUser: User = {
      id: 'demo-admin-1',
      name: 'TWG Academy Admin',
      email: 'admin@truewaygrowth.com',
      role: 'admin',
      country: 'International Academy',
      timezone: 'Asia/Dubai (GST)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules', 'course-tarteel-fluent', 'course-hifz-memorization', 'course-islamic-studies'],
      progress: {
        completedLessonIds: ['lesson-1', 'lesson-2', 'lesson-3'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-201', 'w-202'],
        averagePronunciationScore: 96,
        practiceMinutes: 480,
        streakDays: 24,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: []
    };
    onLogin(adminUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-600/20 text-red-500 rounded-lg">
              <UserIcon className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white">
              {mode === 'login' && 'Student & Tutor Login'}
              {mode === 'register' && 'Create Student Account'}
              {mode === 'forgot' && 'Reset Password'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Demo Switchers for easy test access */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="font-semibold text-zinc-300">Quick Demo Accounts:</span>
              <span>1-Click Sign In</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="py-2 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold border border-zinc-700 transition flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-red-500" />
                <span>Student Portal</span>
              </button>

              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="py-2 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-red-400 hover:text-white rounded-xl text-xs font-bold border border-zinc-700 transition flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {forgotSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Reset Link Dispatched</h4>
              <p className="text-xs text-zinc-400">
                A password reset authorization link has been forwarded to <strong>{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForgotSuccess(false);
                  setMode('login');
                }}
                className="mt-2 text-xs font-bold text-red-500 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Hashim Zafar"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-zinc-400">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-zinc-500 hover:text-red-400 transition"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Country of Residence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg glow-red-sm"
              >
                <span>
                  {mode === 'login' && 'Sign In to My Dashboard'}
                  {mode === 'register' && 'Register Student Account'}
                  {mode === 'forgot' && 'Send Reset Email'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Toggle between Login and Register */}
          <div className="pt-2 border-t border-zinc-850 text-center text-xs text-zinc-400">
            {mode === 'login' && (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-red-500 hover:underline"
                >
                  Create Student Account
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-red-500 hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-red-500 hover:underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
