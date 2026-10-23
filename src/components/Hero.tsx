import React, { useState } from 'react';
import { soundEngine } from '../utils/audioSynth';
import { 
  Sparkles, 
  Mic, 
  Volume2, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Play,
  Award
} from 'lucide-react';

interface HeroProps {
  onStartQaida: () => void;
  onExploreCourses: () => void;
  onOpenSchedule: () => void;
  onOpenVoiceDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQaida,
  onExploreCourses,
  onOpenSchedule,
  onOpenVoiceDemo
}) => {
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  const handlePlaySample = async () => {
    setIsPlayingSample(true);
    await soundEngine.speakArabic('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 0.85);
    setIsPlayingSample(false);
  };

  return (
    <div className="relative overflow-hidden bg-black text-white pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-zinc-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-12 right-12 w-96 h-96 bg-red-700/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>International Online Quran Learning Platform</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Master the Holy Quran with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-rose-400">
                  True Articulation.
                </span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Step-by-step <strong>Madani Qaida</strong> tailored for international students. Speak into your microphone and receive instant <strong>AI voice pronunciation feedback</strong> on every Arabic letter, vowel, and Tajweed rule.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStartQaida}
                className="w-full sm:w-auto px-7 py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl transition shadow-xl hover:shadow-red-600/30 glow-red-sm flex items-center justify-center gap-2 group"
              >
                <span>Start Madani Qaida Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-6 py-4 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-red-500" />
                <span>Browse Paid Courses</span>
              </button>

              <button
                onClick={onOpenSchedule}
                className="w-full sm:w-auto px-5 py-4 text-xs font-bold text-zinc-400 hover:text-white transition flex items-center justify-center gap-1.5"
              >
                <Globe className="w-4 h-4 text-red-500" />
                <span>1-on-1 Class Schedule</span>
              </button>
            </div>

            {/* Proof Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-850 text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">2,400+</span>
                <span className="text-xs text-zinc-400">Students Worldwide</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-red-500 block">75%+</span>
                <span className="text-xs text-zinc-400">Accuracy Threshold Gate</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">15+</span>
                <span className="text-xs text-zinc-400">Timezones Supported</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Pronunciation Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Live Pronunciation Engine</h3>
                    <p className="text-[10px] text-zinc-400">Sample: Surah Al-Fatihah Basmalah</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                  AI Active
                </span>
              </div>

              {/* Central Arabic Calligraphy Showcase */}
              <div className="py-6 text-center space-y-2">
                <div className="font-arabic text-3xl sm:text-4xl font-bold text-white leading-relaxed dir-rtl drop-shadow">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <p className="text-xs font-bold text-red-500 tracking-wide">
                  Bismillahir-Rahmanir-Raheem
                </p>
                <p className="text-[11px] text-zinc-400 italic">
                  "In the name of Allah, the Most Gracious, Most Merciful"
                </p>
              </div>

              {/* Interactive Audio & Assessment Demo */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 font-semibold">Teacher Pronunciation:</span>
                  <button
                    onClick={handlePlaySample}
                    disabled={isPlayingSample}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold border border-zinc-700 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-red-500" />
                    <span>{isPlayingSample ? 'Reciting...' : 'Listen'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <div className="text-xs text-zinc-400">
                    <span>Makhraj Target: </span>
                    <strong className="text-zinc-200">Throat & Tongue Tip</strong>
                  </div>
                  <button
                    onClick={onStartQaida}
                    className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1"
                  >
                    <span>Try With Mic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Score Indicator Box */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Passing threshold enforced (75%+)</span>
                </div>
                <span className="font-mono text-zinc-300 font-bold">98.4% Precision</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
