import React from 'react';
import { AnimatedLogo } from './AnimatedLogo';
import { Mail, Phone, MapPin, Globe, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrial }) => {
  return (
    <footer className="bg-gradient-to-b from-[#1e0836] via-[#150527] to-[#0d0219] text-white pt-16 pb-12 border-t border-purple-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column with Animated Realistic Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <AnimatedLogo size="md" showUrl={true} lightBg={false} />
            </div>

            <p className="text-xs text-purple-200/80 leading-relaxed max-w-sm">
              True Way Quran is a premier international online Quran academy. We provide 1-on-1 personalized live classes for kids, adults, and sisters with certified male and female scholars across the UK, USA, Canada, Australia, and worldwide.
            </p>

            <div className="flex items-center gap-3 text-xs text-purple-300">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-pink-400" />
                UK & Global Academy
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Certified Ijazah Faculty
              </span>
            </div>

            <button
              onClick={onOpenTrial}
              className="mt-2 px-5 py-2.5 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white rounded-xl text-xs font-black shadow-lg shadow-pink-500/20 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Start 3-Day Free Trial</span>
            </button>
          </div>

          {/* Quick Courses & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Quran Services
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <button onClick={() => onNavigate('qaida')} className="hover:text-white transition">
                  Noorani & Madani Qaida
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition">
                  Quran Reading with Tajweed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition">
                  Quran Memorisation (Hifz)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition">
                  Translation & Tafseer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition">
                  Islamic Studies for Children
                </button>
              </li>
            </ul>
          </div>

          {/* Specialized Classes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Specialized Classes
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-pink-300 transition">
                  Quran Classes for Kids
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-pink-300 transition">
                  Classes for Sisters (Female Tutors)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-pink-300 transition">
                  Quran Classes for Adults
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quran')} className="hover:text-pink-300 transition">
                  Popular Scholar Voices Player
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-pink-300 transition">
                  Tajweed Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Global Contact Lines (learnquraan.co.uk reference) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Global Support Lines
            </h4>
            <div className="space-y-2 text-xs text-purple-200/80">
              <p className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>UK: +44 808 5310 303</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>USA: +1 (318) 931 0931</span>
              </p>
              <p className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp: +92 306 3339999</span>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>info@truewayquran.com</span>
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-2 text-xs font-bold text-pink-300 hover:text-white block underline"
              >
                Open Contact & Free Trial Page
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-purple-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/80">
          <p>© {new Date().getFullYear()} True Way Quran (www.truewayquran.com). All rights reserved.</p>
          <p className="flex items-center gap-1 text-purple-300/80">
            <span>Dedicated to spreading authentic Quranic recitation with Tajweed worldwide</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
