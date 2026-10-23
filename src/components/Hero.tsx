import React, { useState } from 'react';
import { POPULAR_RECITERS } from '../data/quranData';
import { soundEngine } from '../utils/audioSynth';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  Sparkles, 
  Volume2, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Play,
  Pause,
  Award,
  Users,
  Heart,
  Baby,
  Star,
  Phone
} from 'lucide-react';

interface HeroProps {
  onStartQaida: () => void;
  onExploreCourses: () => void;
  onOpenQuranReader: () => void;
  onOpenTrialBooking: () => void;
  onSelectTrack: (track: 'kids' | 'adults' | 'female') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQaida,
  onExploreCourses,
  onOpenQuranReader,
  onOpenTrialBooking,
  onSelectTrack
}) => {
  const [selectedReciterId, setSelectedReciterId] = useState<string>('alafasy');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const activeReciter = POPULAR_RECITERS.find(r => r.id === selectedReciterId) || POPULAR_RECITERS[0];

  const handlePlayRecitation = () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingAudio(false);
      return;
    }

    // Basmalah audio stream from EveryAyah public domain CDN
    const audioUrl = `${activeReciter.audioBaseUrl}001001.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => setIsPlayingAudio(true);
    audio.onended = () => setIsPlayingAudio(false);
    audio.onerror = async () => {
      // Fallback voice
      await soundEngine.speakArabic('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 0.85);
      setIsPlayingAudio(false);
    };

    audio.play().catch(async () => {
      await soundEngine.speakArabic('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 0.85);
      setIsPlayingAudio(false);
    });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f3e8ff]/40 via-white to-[#faf8ff] text-slate-900 pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-100">
      
      {/* Soft background purple ambient blurs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-purple-400/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-fuchsia-400/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Trust Badges & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top UK & Worldwide Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-purple-200 rounded-full text-xs font-bold text-purple-950 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              <span>Online Quran Academy UK & Worldwide · 1-on-1 Classes</span>
            </div>

            {/* Main Title like learnquraan.co.uk */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-purple-950 leading-[1.12]">
                Learn Quran Online with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600">
                  Tajweed from Home.
                </span>
              </h1>
              
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                Connect with certified male & female Quran tutors worldwide. Personalized 1-on-1 classes tailored for <strong>Kids</strong>, <strong>Adults</strong>, and <strong>Sisters</strong> with AI pronunciation assessment and 24/7 flexible scheduling.
              </p>
            </div>

            {/* Quick Track Selection Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <button
                onClick={() => onSelectTrack('kids')}
                className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Baby className="w-3.5 h-3.5 text-purple-600" />
                <span>Classes for Kids</span>
              </button>

              <button
                onClick={() => onSelectTrack('female')}
                className="px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 text-pink-600" />
                <span>Classes for Sisters (100% Female Tutors)</span>
              </button>

              <button
                onClick={() => onSelectTrack('adults')}
                className="px-3.5 py-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-950 border border-fuchsia-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Users className="w-3.5 h-3.5 text-fuchsia-700" />
                <span>Classes for Adults</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenTrialBooking}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 active:scale-[0.99] text-white font-extrabold text-sm rounded-xl transition shadow-xl shadow-pink-500/25 glow-brand flex items-center justify-center gap-2 group"
              >
                <span>Claim 3-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-pink-200" />
              </button>

              <button
                onClick={onOpenQuranReader}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-purple-50 text-purple-950 border-2 border-purple-800 font-extrabold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-purple-700" />
                <span>Listen Holy Quran</span>
              </button>

              <button
                onClick={onStartQaida}
                className="w-full sm:w-auto px-5 py-4 text-xs font-bold text-purple-800 hover:text-pink-600 transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Open Madani Qaida</span>
              </button>
            </div>

            {/* Social Proof & Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-purple-100 text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-950 to-purple-800 block">5,000+</span>
                <span className="text-xs text-slate-500">Students Worldwide</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 block">100%</span>
                <span className="text-xs text-slate-500">Certified Tutors</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-950 to-pink-600 block">4.9 / 5</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Star className="w-3 h-3 text-pink-500 fill-pink-500" /> Parent Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scholar Audio Recitation Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white border border-purple-200 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header with Animated Logo badge */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-purple-950">Popular Scholar Voice Player</h3>
                    <p className="text-[10px] text-slate-500">Surah Al-Fatihah (Public Domain CDN)</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Audio Active
                </span>
              </div>

              {/* Verse Display */}
              <div className="py-6 text-center space-y-2">
                <div className="font-arabic text-3xl sm:text-4xl font-bold text-purple-950 leading-relaxed dir-rtl drop-shadow-xs">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <p className="text-xs font-bold text-purple-700 tracking-wide">
                  Bismillahir-Rahmanir-Raheem
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  "In the name of Allah, the Entirely Merciful, the Especially Merciful."
                </p>
              </div>

              {/* Scholar Switcher */}
              <div className="space-y-3 pt-2 border-t border-purple-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Select Scholar Voice:</span>
                  <select
                    value={selectedReciterId}
                    onChange={(e) => {
                      setSelectedReciterId(e.target.value);
                      if (isPlayingAudio && audioRef.current) {
                        audioRef.current.pause();
                        setIsPlayingAudio(false);
                      }
                    }}
                    className="bg-purple-50 text-purple-950 border border-purple-200 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none"
                  >
                    {POPULAR_RECITERS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reciter Bio Box */}
                <div className="bg-purple-50/70 p-3 rounded-2xl border border-purple-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {activeReciter.avatar}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-purple-950 block">{activeReciter.name}</span>
                      <span className="text-[10px] text-slate-500 block">{activeReciter.title}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlayRecitation}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
                      isPlayingAudio
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white ring-2 ring-pink-400/40 animate-pulse'
                        : 'bg-gradient-to-r from-purple-800 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white shadow-pink-500/20'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Playing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current text-pink-200" />
                        <span>Listen Voice</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500 border-t border-purple-50">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free 3-Day Trial Classes</span>
                </div>
                <button
                  onClick={onOpenQuranReader}
                  className="font-bold text-purple-700 hover:text-purple-950 flex items-center gap-1"
                >
                  <span>Full Quran</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
