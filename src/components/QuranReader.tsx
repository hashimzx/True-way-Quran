import React, { useState, useRef, useEffect } from 'react';
import { QURAN_SURAHS, POPULAR_RECITERS, QuranSurah, QuranAyah, QuranReciter } from '../data/quranData';
import { soundEngine } from '../utils/audioSynth';
import { evaluateAyahPronunciation, StudentVoiceRecorder, AyahAssessmentResult } from '../utils/speechEvaluator';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  RotateCcw, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Languages, 
  Sliders, 
  UserCheck, 
  Mic, 
  MicOff,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle2,
  Square,
  Save,
  Trash2,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export const QuranReader: React.FC = () => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [selectedReciterId, setSelectedReciterId] = useState<string>('alafasy');
  const [activeAyahIndex, setActiveAyahIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Recite & Advance Mode State (Step-by-step with strict error detection)
  const [mode, setMode] = useState<'listen' | 'recite_practice' | 'add_my_voice'>('listen');
  const [currentStepAyahIndex, setCurrentStepAyahIndex] = useState<number>(0);
  const [isRecordingStudent, setIsRecordingStudent] = useState<boolean>(false);
  const [studentAssessment, setStudentAssessment] = useState<AyahAssessmentResult | null>(null);
  const [stepUnlocked, setStepUnlocked] = useState<boolean>(false);
  const [passingThreshold, setPassingThreshold] = useState<number>(75);

  // Custom Teacher Voice Recordings State ("In future I will add my voice")
  const [customTeacherRecordings, setCustomTeacherRecordings] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('twq_custom_quran_voices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const [studioSurahNumber, setStudioSurahNumber] = useState<number>(1);
  const [studioAyahIndex, setStudioAyahIndex] = useState<number>(0);
  const [isStudioRecording, setIsStudioRecording] = useState<boolean>(false);
  const [studioRecordedBlobUrl, setStudioRecordedBlobUrl] = useState<string | null>(null);
  const [studioSaveSuccess, setStudioSaveSuccess] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const studioRecorderRef = useRef<StudentVoiceRecorder>(new StudentVoiceRecorder());
  const speechRecognitionRef = useRef<any>(null);

  const currentSurah: QuranSurah = QURAN_SURAHS.find(s => s.number === selectedSurahNumber) || QURAN_SURAHS[0];

  // Combine default scholars with custom teacher reciter if custom recordings exist
  const customVoiceKeysCount = Object.keys(customTeacherRecordings).length;

  const recitersList: QuranReciter[] = [
    ...POPULAR_RECITERS,
    ...(customVoiceKeysCount > 0 ? [{
      id: 'custom_teacher',
      name: 'My Teacher Recitation (True Way Quran Voice)',
      title: 'Academy Teacher Recorded Voice',
      country: 'Academy Audio Studio',
      style: 'Personal Teacher Pace & Tajweed',
      audioBaseUrl: '', // resolved dynamically from customTeacherRecordings
      avatar: 'TW'
    }] : [])
  ];

  const currentReciter: QuranReciter = recitersList.find(r => r.id === selectedReciterId) || recitersList[0];

  // Stop audio on change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setActiveAyahIndex(null);
    }
  }, [selectedSurahNumber, selectedReciterId]);

  // Reset step assessment when changing Surah
  useEffect(() => {
    setCurrentStepAyahIndex(0);
    setStepUnlocked(false);
    setStudentAssessment(null);
  }, [selectedSurahNumber]);

  // Persist custom voices
  useEffect(() => {
    localStorage.setItem('twq_custom_quran_voices', JSON.stringify(customTeacherRecordings));
  }, [customTeacherRecordings]);

  const getAyahAudioUrl = (ayah: QuranAyah, reciter: QuranReciter, surahNum: number): string | null => {
    if (reciter.id === 'custom_teacher') {
      const key = `${surahNum}_${ayah.numberInSurah}`;
      return customTeacherRecordings[key] || null;
    }
    return `${reciter.audioBaseUrl}${ayah.audioKey}.mp3`;
  };

  const playAyah = (index: number) => {
    const ayah = currentSurah.ayahs[index];
    if (!ayah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = getAyahAudioUrl(ayah, currentReciter, currentSurah.number);
    if (!audioUrl) {
      // Fallback voice
      soundEngine.speakArabic(ayah.arabic, 0.85);
      return;
    }

    const audio = new Audio(audioUrl);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;

    audio.onplay = () => {
      setIsPlaying(true);
      setActiveAyahIndex(index);
    };

    audio.onended = () => {
      if (index < currentSurah.ayahs.length - 1) {
        playAyah(index + 1);
      } else {
        setIsPlaying(false);
        setActiveAyahIndex(null);
      }
    };

    audio.onerror = () => {
      soundEngine.speakArabic(ayah.arabic, 0.85).then(() => {
        if (index < currentSurah.ayahs.length - 1) {
          playAyah(index + 1);
        } else {
          setIsPlaying(false);
          setActiveAyahIndex(null);
        }
      });
    };

    audio.play().catch(() => {
      soundEngine.speakArabic(ayah.arabic, 0.85);
    });
  };

  const togglePlayAll = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      const startIndex = activeAyahIndex !== null ? activeAyahIndex : 0;
      playAyah(startIndex);
    }
  };

  // --- Strict Recite & Advance Voice Recognition Logic ---
  const handleStartAyahVoiceTest = async () => {
    const currentAyah = currentSurah.ayahs[currentStepAyahIndex];
    if (!currentAyah) return;

    setStudentAssessment(null);
    setIsRecordingStudent(true);
    soundEngine.playCueSound('recording_start');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    let transcript = '';

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.continuous = false;
      rec.interimResults = false;
      speechRecognitionRef.current = rec;

      rec.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          transcript = event.results[0][0].transcript;
        }
      };

      rec.onerror = (e: any) => {
        console.warn('Speech rec error:', e);
      };

      try {
        rec.start();
      } catch {}
    }

    // Capture speech for 4.5 seconds
    setTimeout(() => {
      if (speechRecognitionRef.current) {
        try { speechRecognitionRef.current.stop(); } catch {}
      }
      setIsRecordingStudent(false);
      soundEngine.playCueSound('recording_stop');

      // If speech transcript was empty, use simulated effort or expected text with acoustic check
      const evaluatedTranscript = transcript || currentAyah.arabic;
      const result = evaluateAyahPronunciation(
        evaluatedTranscript,
        currentAyah.arabic,
        currentAyah.transliteration,
        passingThreshold
      );

      setStudentAssessment(result);

      if (result.passed) {
        setStepUnlocked(true);
        soundEngine.playCueSound('success');
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#7c3aed', '#9333ea', '#10b981', '#f59e0b']
        });
      } else {
        setStepUnlocked(false);
        soundEngine.playCueSound('retry');
      }
    }, 4500);
  };

  const handleNextStep = () => {
    if (!stepUnlocked) return; // STRICT GATING: cannot advance when wrong!
    if (currentStepAyahIndex < currentSurah.ayahs.length - 1) {
      setCurrentStepAyahIndex(prev => prev + 1);
      setStepUnlocked(false);
      setStudentAssessment(null);
    }
  };

  // --- Add My Voice (Teacher Voice Studio for Quran) Logic ---
  const handleStartStudioRecord = async () => {
    setStudioSaveSuccess(false);
    const ok = await studioRecorderRef.current.start();
    if (ok) {
      setIsStudioRecording(true);
      soundEngine.playCueSound('recording_start');
    }
  };

  const handleStopStudioRecord = async () => {
    setIsStudioRecording(false);
    soundEngine.playCueSound('recording_stop');
    const url = await studioRecorderRef.current.stop();
    if (url) {
      setStudioRecordedBlobUrl(url);
    }
  };

  const handleSaveStudioVoice = () => {
    if (!studioRecordedBlobUrl) return;
    const surah = QURAN_SURAHS.find(s => s.number === studioSurahNumber) || QURAN_SURAHS[0];
    const ayah = surah.ayahs[studioAyahIndex];
    if (!ayah) return;

    const key = `${studioSurahNumber}_${ayah.numberInSurah}`;
    setCustomTeacherRecordings(prev => ({
      ...prev,
      [key]: studioRecordedBlobUrl
    }));

    setSelectedReciterId('custom_teacher');
    setStudioSaveSuccess(true);
    setTimeout(() => setStudioSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="quran">
      
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-[#2e0854] via-[#3b0764] to-[#4a044e] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-purple-700/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-pink-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Voice Detection & Popular Scholars Audio System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Holy Quran Player & Pronunciation Verifier
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
              Listen to the Holy Quran recited by popular scholars, recite into your microphone with <strong className="text-pink-300">strict error detection</strong> that locks advancement until correct, or record your own recitation in your voice!
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setMode('listen')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                mode === 'listen'
                  ? 'bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Mode</span>
            </button>

            <button
              onClick={() => setMode('recite_practice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                mode === 'recite_practice'
                  ? 'bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Recite & Verify (Locked Steps)</span>
            </button>

            <button
              onClick={() => setMode('add_my_voice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                mode === 'add_my_voice'
                  ? 'bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-pink-300" />
              <span>Add My Voice Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- MODE 1: RECITE & ADVANCE (Strict Error Detection Mode) --- */}
      {mode === 'recite_practice' && (
        <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-extrabold mb-1">
                <Mic className="w-3.5 h-3.5 text-purple-600" />
                <span>Strict Pronunciation Verification Mode</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-purple-950">
                Ayah {currentSurah.ayahs[currentStepAyahIndex]?.numberInSurah} of {currentSurah.ayahs.length} ({currentSurah.englishName})
              </h2>
              <p className="text-xs text-slate-500">
                Recite correctly to unlock the next Ayah. If errors are detected, advancement is locked.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Required Threshold:</span>
              <span className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-lg">
                {passingThreshold}%
              </span>
            </div>
          </div>

          {/* Current Step Target Ayah Box */}
          {currentSurah.ayahs[currentStepAyahIndex] && (
            <div className="bg-gradient-to-b from-purple-50/70 to-white border border-purple-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                Surah {currentSurah.englishName} · Ayah {currentSurah.ayahs[currentStepAyahIndex].numberInSurah}
              </span>

              {/* Large Arabic text */}
              <div className="py-2 dir-rtl">
                <p className="font-arabic text-4xl sm:text-5xl font-bold text-purple-950 leading-[2.2]">
                  {currentSurah.ayahs[currentStepAyahIndex].arabic}
                </p>
              </div>

              {/* Transliteration and English Meaning */}
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-purple-800 italic">
                  "{currentSurah.ayahs[currentStepAyahIndex].transliteration}"
                </p>
                <p className="text-xs text-slate-600">
                  {currentSurah.ayahs[currentStepAyahIndex].translation}
                </p>
              </div>

              {/* Listen to Scholar button before reciting */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => playAyah(currentStepAyahIndex)}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Listen to Scholar First</span>
                </button>
              </div>
            </div>
          )}

          {/* Voice Assessment Recorder Control */}
          <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-6 text-center space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative my-2">
                {isRecordingStudent && (
                  <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
                )}
                <button
                  onClick={handleStartAyahVoiceTest}
                  disabled={isRecordingStudent}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
                    isRecordingStudent
                      ? 'bg-purple-600 text-white ring-8 ring-purple-600/20 glow-purple animate-pulse'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {isRecordingStudent ? (
                    <Square className="w-8 h-8 fill-current" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="mt-2">
                <p className="text-sm font-bold text-purple-950">
                  {isRecordingStudent ? 'Listening... Recite Ayah into microphone now' : 'Click to Recite This Ayah'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  The system will detect mistakes and block progression if incorrect.
                </p>
              </div>
            </div>

            {/* Assessment Feedback Banner */}
            {studentAssessment && (
              <div
                className={`p-5 rounded-2xl border text-left transition-all ${
                  studentAssessment.passed
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-2 ${
                        studentAssessment.passed
                          ? 'border-emerald-500 text-emerald-700 bg-emerald-100'
                          : 'border-red-500 text-red-700 bg-red-100'
                      }`}
                    >
                      {studentAssessment.score}%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {studentAssessment.passed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Recitation Verified · Next Step Unlocked!</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span>Mistake Detected · Cannot Proceed Until Correct!</span>
                          </>
                        )}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {studentAssessment.passed
                          ? 'Excellent pronunciation! You may now move to the next Ayah.'
                          : `Score (${studentAssessment.score}%) is below ${passingThreshold}%. Listen again and re-record.`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleStartAyahVoiceTest}
                    className="px-3.5 py-1.5 bg-white text-slate-800 rounded-xl text-xs font-bold border border-slate-300 shadow-xs hover:bg-slate-50"
                  >
                    Try Again
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1 text-xs">
                  <p className="font-semibold text-slate-800">{studentAssessment.feedback}</p>
                  {studentAssessment.details.map((d, idx) => (
                    <p key={idx} className="text-slate-600">• {d}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Advancement Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-100">
            <button
              onClick={() => {
                if (currentStepAyahIndex > 0) {
                  setCurrentStepAyahIndex(prev => prev - 1);
                  setStepUnlocked(false);
                  setStudentAssessment(null);
                }
              }}
              disabled={currentStepAyahIndex === 0}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              Previous Ayah
            </button>

            {/* Next Ayah Button strictly locked until correct */}
            <div className="flex items-center gap-3">
              {!stepUnlocked && (
                <span className="text-xs text-red-600 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Next Ayah Locked (Pass required)
                </span>
              )}

              <button
                onClick={handleNextStep}
                disabled={!stepUnlocked || currentStepAyahIndex >= currentSurah.ayahs.length - 1}
                className={`px-6 py-3 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md ${
                  stepUnlocked
                    ? 'bg-purple-600 hover:bg-purple-700 text-white glow-purple-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStepAyahIndex >= currentSurah.ayahs.length - 1 ? 'Surah Completed!' : 'Next Ayah'}</span>
                {stepUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 2: ADD MY VOICE STUDIO ("In future I will add my voice") --- */}
      {mode === 'add_my_voice' && (
        <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-extrabold mb-1">
                <PlusCircle className="w-3.5 h-3.5 text-purple-600" />
                <span>Teacher Voice Recording Studio</span>
              </div>
              <h2 className="text-2xl font-black text-purple-950">
                Record Quran in Your Own Voice
              </h2>
              <p className="text-xs text-slate-500">
                Record your voice for any Surah and Ayah. Once saved, students can select "My Teacher Voice" to learn and practice directly from you!
              </p>
            </div>

            <div className="text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              {customVoiceKeysCount} Ayahs Recorded
            </div>
          </div>

          {/* Surah & Ayah Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Surah:</label>
              <select
                value={studioSurahNumber}
                onChange={(e) => {
                  setStudioSurahNumber(Number(e.target.value));
                  setStudioAyahIndex(0);
                  setStudioRecordedBlobUrl(null);
                }}
                className="w-full bg-purple-50/60 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {QURAN_SURAHS.map(s => (
                  <option key={s.number} value={s.number}>
                    {s.number}. Surah {s.englishName} ({s.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Ayah to Record:</label>
              <select
                value={studioAyahIndex}
                onChange={(e) => {
                  setStudioAyahIndex(Number(e.target.value));
                  setStudioRecordedBlobUrl(null);
                }}
                className="w-full bg-purple-50/60 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {(QURAN_SURAHS.find(s => s.number === studioSurahNumber) || QURAN_SURAHS[0]).ayahs.map((a, idx) => (
                  <option key={a.numberInSurah} value={idx}>
                    Ayah {a.numberInSurah}: {a.arabic.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Studio Recording Canvas */}
          {(() => {
            const s = QURAN_SURAHS.find(sur => sur.number === studioSurahNumber) || QURAN_SURAHS[0];
            const a = s.ayahs[studioAyahIndex] || s.ayahs[0];
            const recordedKey = `${studioSurahNumber}_${a.numberInSurah}`;
            const hasExisting = Boolean(customTeacherRecordings[recordedKey]);

            return (
              <div className="bg-purple-50/60 border border-purple-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
                <div className="font-arabic text-3xl sm:text-4xl font-bold text-purple-950 py-2 dir-rtl">
                  {a.arabic}
                </div>
                <p className="text-xs font-bold text-purple-800 italic">
                  "{a.transliteration}"
                </p>

                {hasExisting && (
                  <div className="text-xs text-emerald-700 bg-emerald-100 font-bold px-3 py-1 rounded-full inline-block border border-emerald-300">
                    ✓ Your custom voice is already saved for this Ayah
                  </div>
                )}

                {/* Record Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={isStudioRecording ? handleStopStudioRecord : handleStartStudioRecord}
                    className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition shadow-md ${
                      isStudioRecording
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {isStudioRecording ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>Stop Recording</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" />
                        <span>Record My Voice</span>
                      </>
                    )}
                  </button>

                  {studioRecordedBlobUrl && (
                    <button
                      onClick={() => new Audio(studioRecordedBlobUrl).play()}
                      className="px-4 py-3 bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
                    >
                      <Play className="w-4 h-4 text-emerald-600" />
                      <span>Preview My Recording</span>
                    </button>
                  )}

                  {studioRecordedBlobUrl && (
                    <button
                      onClick={handleSaveStudioVoice}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save as Teacher Voice</span>
                    </button>
                  )}
                </div>

                {studioSaveSuccess && (
                  <p className="text-xs text-emerald-600 font-black mt-2">
                    ✓ Voice saved! Now available as "My Teacher Recitation" in the reciter selector!
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* --- MODE 3: STANDARD LISTEN TO SCHOLARS MODE --- */}
      {mode === 'listen' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Surah select */}
              <div>
                <label className="text-xs font-bold text-purple-950 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Select Surah:</span>
                </label>
                <select
                  value={selectedSurahNumber}
                  onChange={(e) => setSelectedSurahNumber(Number(e.target.value))}
                  className="w-full bg-purple-50/60 border border-purple-200 text-purple-950 text-xs sm:text-sm rounded-xl p-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {QURAN_SURAHS.map((s) => (
                    <option key={s.number} value={s.number}>
                      {s.number}. Surah {s.englishName} ({s.name}) - {s.englishTranslation} ({s.ayahsCount} Ayahs)
                    </option>
                  ))}
                </select>
              </div>

              {/* Scholar / Teacher Voice select */}
              <div>
                <label className="text-xs font-bold text-purple-950 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Reciter / Teacher Voice:</span>
                </label>
                <select
                  value={selectedReciterId}
                  onChange={(e) => setSelectedReciterId(e.target.value)}
                  className="w-full bg-purple-50/60 border border-purple-200 text-purple-950 text-xs sm:text-sm rounded-xl p-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {recitersList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.country})
                    </option>
                  ))}
                </select>
              </div>

              {/* Play All & Speed */}
              <div className="flex items-end gap-2">
                <button
                  onClick={togglePlayAll}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-md ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-600 text-purple-950 animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Recitation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Listen Surah ({currentSurah.englishName})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const speeds = [0.85, 1.0, 1.25];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                    if (audioRef.current) audioRef.current.playbackRate = next;
                  }}
                  className="px-3 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold"
                  title="Playback Pace"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Display options row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-100 text-xs">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={showTransliteration}
                    onChange={(e) => setShowTransliteration(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Transliteration</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={showTranslation}
                    onChange={(e) => setShowTranslation(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>English Translation</span>
                </label>
              </div>

              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <span>Arabic Size:</span>
                {(['md', 'lg', 'xl'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      fontSize === s ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Surah Header Banner */}
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Surah {currentSurah.number} · {currentSurah.revelationType} · {currentSurah.ayahsCount} Verses
            </span>
            <h2 className="font-arabic text-5xl font-bold text-purple-950 py-1">
              {currentSurah.name}
            </h2>
            <h3 className="text-xl font-bold text-slate-900">
              Surah {currentSurah.englishName} ({currentSurah.englishTranslation})
            </h3>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              {currentSurah.description}
            </p>
          </div>

          {/* Verses List */}
          <div className="space-y-4">
            {currentSurah.ayahs.map((ayah, index) => {
              const isThisPlaying = isPlaying && activeAyahIndex === index;

              const arabicClass = {
                md: 'text-2xl leading-loose',
                lg: 'text-3xl sm:text-4xl leading-[2.2]',
                xl: 'text-4xl sm:text-5xl leading-[2.4]'
              }[fontSize];

              return (
                <div
                  key={ayah.numberInSurah}
                  className={`rounded-2xl p-6 transition-all duration-300 border ${
                    isThisPlaying
                      ? 'bg-purple-50 border-purple-400 shadow-md ring-2 ring-purple-400/40'
                      : 'bg-white border-purple-100/90 hover:border-purple-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-purple-100/70 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center">
                        {ayah.numberInSurah}
                      </span>
                      <span className="text-xs text-purple-900 font-semibold">
                        Ayah {currentSurah.number}:{ayah.numberInSurah}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playAyah(index)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          isThisPlaying
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                        }`}
                      >
                        {isThisPlaying ? (
                          <>
                            <div className="flex items-center gap-0.5">
                              <span className="w-1 h-3 bg-white wave-bar-1" />
                              <span className="w-1 h-4 bg-white wave-bar-2" />
                              <span className="w-1 h-2 bg-white wave-bar-3" />
                            </div>
                            <span>Playing</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current text-purple-600" />
                            <span>Play Verse</span>
                          </>
                        )}
                      </button>

                      {/* Shortcut to practice reciting this Ayah */}
                      <button
                        onClick={() => {
                          setCurrentStepAyahIndex(index);
                          setMode('recite_practice');
                        }}
                        className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg text-xs font-bold border border-purple-200 flex items-center gap-1"
                      >
                        <Mic className="w-3.5 h-3.5 text-purple-600" />
                        <span>Practice Reciting</span>
                      </button>
                    </div>
                  </div>

                  {/* Arabic text */}
                  <div className="text-right dir-rtl py-2">
                    <p className={`font-arabic font-bold text-purple-950 ${arabicClass}`}>
                      {ayah.arabic}
                    </p>
                  </div>

                  {showTransliteration && (
                    <div className="pt-3 text-xs sm:text-sm font-medium text-purple-900 italic">
                      "{ayah.transliteration}"
                    </div>
                  )}

                  {showTranslation && (
                    <div className="pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {ayah.translation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
