import React, { useState, useEffect, useRef } from 'react';
import { QaidaWord, PronunciationAttempt } from '../types';
import { soundEngine } from '../utils/audioSynth';
import { evaluatePronunciation, StudentVoiceRecorder } from '../utils/speechEvaluator';
import confetti from 'canvas-confetti';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  X, 
  ChevronRight, 
  Play, 
  Square,
  Sparkles,
  Info,
  Award
} from 'lucide-react';

interface VoicePracticeModalProps {
  word: QaidaWord;
  passingScore: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (attempt: PronunciationAttempt) => void;
  onNextWord?: () => void;
  hasNextWord?: boolean;
}

export const VoicePracticeModal: React.FC<VoicePracticeModalProps> = ({
  word,
  passingScore,
  isOpen,
  onClose,
  onSuccess,
  onNextWord,
  hasNextWord = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListeningSpeech, setIsListeningSpeech] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [isPlayingTeacherAudio, setIsPlayingTeacherAudio] = useState(false);
  const [attemptResult, setAttemptResult] = useState<PronunciationAttempt | null>(null);
  const [studentAudioUrl, setStudentAudioUrl] = useState<string | null>(null);
  const [isPlayingStudentAudio, setIsPlayingStudentAudio] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const recorderRef = useRef<StudentVoiceRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const studentAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Reset state when word changes
  useEffect(() => {
    setAttemptResult(null);
    setSpokenTranscript('');
    setStudentAudioUrl(null);
    setErrorMessage(null);
  }, [word]);

  // Clean up on unmount or close
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  if (!isOpen) return null;

  const handlePlayTeacherAudio = async (rate: number = speechRate) => {
    setIsPlayingTeacherAudio(true);
    setSpeechRate(rate);

    // If word has custom teacher voice URL, play that first
    if (word.teacherVoiceUrl) {
      const audio = new Audio(word.teacherVoiceUrl);
      audio.playbackRate = rate;
      audio.onended = () => setIsPlayingTeacherAudio(false);
      audio.onerror = async () => {
        await soundEngine.speakArabic(word.arabic, rate);
        setIsPlayingTeacherAudio(false);
      };
      audio.play().catch(async () => {
        await soundEngine.speakArabic(word.arabic, rate);
        setIsPlayingTeacherAudio(false);
      });
    } else {
      await soundEngine.speakArabic(word.arabic, rate);
      setIsPlayingTeacherAudio(false);
    }
  };

  const startVoiceAssessment = async () => {
    setErrorMessage(null);
    setSpokenTranscript('');
    setAttemptResult(null);

    // Initialize Web Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    let rec: any = null;
    if (SpeechRecognition) {
      rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      recognitionRef.current = rec;
    }

    // Initialize Audio Recorder for instant student playback
    const recorder = new StudentVoiceRecorder();
    recorderRef.current = recorder;
    const recorderStarted = await recorder.start();

    if (!recorderStarted && !rec) {
      setErrorMessage('Microphone access denied or not supported in this browser. Please allow microphone permissions.');
      return;
    }

    soundEngine.playCueSound('recording_start');
    setIsRecording(true);
    setIsListeningSpeech(true);

    let transcriptDetected = '';

    if (rec) {
      rec.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          transcriptDetected = event.results[0][0].transcript;
          setSpokenTranscript(transcriptDetected);
        }
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition warning:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access blocked. Click the lock icon in your address bar to allow audio.');
        }
      };

      rec.onend = () => {
        setIsListeningSpeech(false);
      };

      try {
        rec.start();
      } catch (e) {
        console.warn('Speech rec error:', e);
      }
    }

    // Auto stop after 3.5 seconds if user finishes reciting word
    setTimeout(() => {
      if (isRecording) {
        stopVoiceAssessment(transcriptDetected);
      }
    }, 3800);
  };

  const stopVoiceAssessment = async (detectedTranscriptFallback?: string) => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsListeningSpeech(false);
    soundEngine.playCueSound('recording_stop');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    // Stop audio recorder and get recording blob URL
    let recordedUrl: string | null = null;
    if (recorderRef.current) {
      recordedUrl = await recorderRef.current.stop();
      setStudentAudioUrl(recordedUrl);
    }

    // Evaluate
    const rawTranscript = spokenTranscript || detectedTranscriptFallback || word.arabic;
    const attempt = evaluatePronunciation(rawTranscript, word, passingScore);
    if (recordedUrl) {
      attempt.audioUrl = recordedUrl;
    }

    setAttemptResult(attempt);

    if (attempt.passed) {
      soundEngine.playCueSound('success');
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#ffffff', '#fbbf24', '#10b981']
      });
      onSuccess(attempt);
    } else {
      soundEngine.playCueSound('retry');
    }
  };

  const toggleStudentAudio = () => {
    if (!studentAudioUrl) return;

    if (!studentAudioPlayerRef.current) {
      studentAudioPlayerRef.current = new Audio(studentAudioUrl);
      studentAudioPlayerRef.current.onended = () => setIsPlayingStudentAudio(false);
      studentAudioPlayerRef.current.onerror = () => setIsPlayingStudentAudio(false);
    }

    if (isPlayingStudentAudio) {
      studentAudioPlayerRef.current.pause();
      setIsPlayingStudentAudio(false);
    } else {
      studentAudioPlayerRef.current.currentTime = 0;
      studentAudioPlayerRef.current.play();
      setIsPlayingStudentAudio(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-600/20 text-red-500 rounded-lg">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Pronunciation Assessment Studio
              </h3>
              <p className="text-xs text-zinc-400">
                Minimum passing accuracy threshold: <span className="text-red-400 font-semibold">{passingScore}%</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">

          {/* Target Word Showcase */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center relative overflow-hidden">
            {/* Subtle radial background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />

            {/* Arabic Script */}
            <div className="font-arabic text-7xl font-bold text-white tracking-wide py-4 select-none drop-shadow-md">
              {word.arabic}
            </div>

            {/* Transliteration & Meaning */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold text-red-500">
                {word.transliteration}
              </span>
              {word.englishMeaning && (
                <span className="text-xs text-zinc-400 italic">
                  "{word.englishMeaning}"
                </span>
              )}
            </div>

            {/* Makhraj & Tajweed Rule Pill */}
            <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-col gap-2 text-xs text-zinc-300">
              <div className="flex items-start justify-center gap-1.5 text-zinc-300">
                <span className="text-red-400 font-semibold">Articulation Point (Makhraj):</span>
                <span>{word.makhraj}</span>
              </div>
              {word.tajweedRule && (
                <div className="inline-flex items-center justify-center gap-1 text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{word.tajweedRule}</span>
                </div>
              )}
            </div>

            {/* Listen to Teacher Recitation Buttons */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => handlePlayTeacherAudio(0.85)}
                disabled={isPlayingTeacherAudio}
                className="flex items-center gap-2 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold border border-zinc-700 hover:border-zinc-500 transition"
              >
                <Volume2 className="w-4 h-4 text-red-500" />
                <span>{isPlayingTeacherAudio ? 'Playing...' : 'Listen (Normal Speed)'}</span>
              </button>

              <button
                onClick={() => handlePlayTeacherAudio(0.6)}
                disabled={isPlayingTeacherAudio}
                className="flex items-center gap-2 px-3.5 py-2 bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold border border-zinc-800 transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Listen (Slow / Tarteel)</span>
              </button>
            </div>
          </div>

          {/* Recording / Voice Assessment Zone */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 text-center">
            {errorMessage ? (
              <div className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 p-3 rounded-lg mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            {/* Big Mic Button with Active Pulsing Ring */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative my-2">
                {isRecording && (
                  <div className="absolute inset-0 rounded-full bg-red-600/40 animate-ping" />
                )}
                <button
                  onClick={isRecording ? () => stopVoiceAssessment() : startVoiceAssessment}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
                    isRecording
                      ? 'bg-red-600 text-white ring-8 ring-red-600/30 glow-red'
                      : 'bg-zinc-800 hover:bg-red-600 text-white border-2 border-red-600/40 hover:border-red-500'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 fill-current" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="mt-3">
                <p className="text-sm font-semibold text-white">
                  {isRecording ? 'Listening... Speak into your microphone' : 'Press to Pronounce'}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isRecording
                    ? 'Recite the Arabic word clearly. Click stop when finished.'
                    : 'Your voice will be analyzed against authentic Tajweed articulation.'}
                </p>
              </div>
            </div>

            {/* Student Recording Playback if available */}
            {studentAudioUrl && (
              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-center gap-3">
                <span className="text-xs text-zinc-400">Your Recording:</span>
                <button
                  onClick={toggleStudentAudio}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md text-xs font-medium border border-zinc-700 transition"
                >
                  {isPlayingStudentAudio ? (
                    <>
                      <Square className="w-3.5 h-3.5 text-red-400" />
                      <span>Pause Playback</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Play My Voice</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Assessment Results & Makhraj Feedback */}
          {attemptResult && (
            <div
              className={`rounded-xl border p-5 transition-all ${
                attemptResult.passed
                  ? 'bg-zinc-900 border-emerald-600/50 shadow-lg'
                  : 'bg-zinc-900 border-red-800/60 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                      attemptResult.passed
                        ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40'
                        : 'border-red-500 text-red-400 bg-red-950/40'
                    }`}
                  >
                    {attemptResult.score}%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {attemptResult.passed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Makhraj Verified · Passed!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span>Threshold Not Met · Try Again</span>
                        </>
                      )}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {attemptResult.passed
                        ? `Great job! Met the ${passingScore}% requirement.`
                        : `Target is ${passingScore}%. Repeat as many times as needed to master.`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={startVoiceAssessment}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-500" />
                  <span>Retry Word</span>
                </button>
              </div>

              {/* Detailed Guidance */}
              <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2 text-xs">
                <p className="text-zinc-200 font-medium leading-relaxed">
                  {attemptResult.makhrajFeedback}
                </p>

                {attemptResult.tajweedNotes.length > 0 && (
                  <div className="space-y-1">
                    {attemptResult.tajweedNotes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-zinc-400">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              Close Studio
            </button>

            {hasNextWord && attemptResult?.passed && (
              <button
                onClick={onNextWord}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-lg hover:shadow-red-600/30 transition"
              >
                <span>Next Word</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
