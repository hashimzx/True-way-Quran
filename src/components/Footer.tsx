import React from 'react';
import { Mail, Phone, MapPin, Globe, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenSchedule: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSchedule }) => {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1.5 border border-zinc-700 shadow flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_129c38c6.png"
                  alt="True Way Growth"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  TRUE WAY GROWTH
                </span>
                <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block">
                  PATH TO PROGRESS
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Empowering Muslim families and international students with certified Tajweed instruction, interactive Madani Qaida, AI-driven pronunciation feedback, and comprehensive Islamic learning.
            </p>

            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-red-500" />
                Worldwide Online Academy
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                Al-Azhar Certified Curricula
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
              Qaida & Learning
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => onNavigate('qaida')} className="hover:text-white transition">
                  Madani Qaida Lessons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qaida')} className="hover:text-white transition">
                  Makharij Pronunciation Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition">
                  Tajweed Masterclass
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition">
                  Quran Hifz Program
                </button>
              </li>
            </ul>
          </div>

          {/* Islamic Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
              Islamic Resources
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition">
                  Worldwide Prayer Times
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition">
                  Step-by-Step Salah Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition">
                  Daily Prophetic Duas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition">
                  Hajj & Umrah Handbook
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition">
                  Islamic Hijri Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* International Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500">
              International Support
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <p className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>support@truewaygrowth.com</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>+44 20 7946 0912 (UK / Global)</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>London · New York · Toronto · Dubai</span>
              </p>
              <button
                onClick={onOpenSchedule}
                className="mt-2 text-xs font-bold text-red-400 hover:text-white block underline"
              >
                Book Tutor Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} True Way Growth (TWG). All rights reserved.</p>
          <p className="flex items-center gap-1 text-zinc-400">
            <span>Dedicated to spreading authentic Quranic Tajweed globally</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
