import React, { useState } from 'react';
import { User } from '../types';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  BookOpen, 
  GraduationCap, 
  Mic, 
  Compass, 
  Calendar, 
  User as UserIcon, 
  ShieldCheck, 
  Globe, 
  LogOut, 
  Sparkles,
  Menu,
  X,
  Phone,
  FileText,
  Users
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
  setCurrency: (c: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD') => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  onOpenTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onLogout,
  currency,
  setCurrency,
  timezone,
  setTimezone,
  onOpenTrial
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: Array<'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD'> = ['USD', 'GBP', 'EUR', 'CAD', 'AUD'];

  const timezones = [
    { label: 'London (GMT)', value: 'Europe/London' },
    { label: 'New York (EST)', value: 'America/New_York' },
    { label: 'Chicago (CST)', value: 'America/Chicago' },
    { label: 'Toronto (EST)', value: 'America/Toronto' },
    { label: 'Dubai (GST)', value: 'Asia/Dubai' },
    { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
    { label: 'Paris (CET)', value: 'Europe/Paris' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services', icon: GraduationCap },
    { id: 'quran', label: 'Holy Quran', icon: BookOpen, badge: 'Audio' },
    { id: 'qaida', label: 'Madani Qaida', icon: Mic, badge: 'AI Voice' },
    { id: 'classes', label: 'Kids & Sisters', icon: Users },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 text-slate-800 shadow-xs">
      
      {/* Top International Announcement & Hotline Bar */}
      <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] text-white px-4 py-1.5 text-xs border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-3 text-purple-200">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shadow-xs">
              Free Trial
            </span>
            <span>3 Days Free Online Quran Classes with Certified Male & Female Scholars.</span>
            <span className="hidden sm:inline text-purple-400">·</span>
            <span className="hidden sm:inline text-white font-bold flex items-center gap-1">
              <Phone className="w-3 h-3 text-pink-400" />
              <span>UK: +44 808 5310 303</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-purple-200 hover:text-white font-medium py-0.5 px-2 rounded hover:bg-white/10 transition"
              >
                <Globe className="w-3.5 h-3.5 text-pink-300" />
                <span>{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-[#2e0854] border border-purple-800 rounded-lg shadow-2xl py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-purple-800 transition flex items-center justify-between ${
                        currency === curr ? 'text-pink-300 font-bold bg-purple-900' : 'text-purple-200'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Timezone Selector */}
            <div className="hidden sm:flex items-center gap-1.5 text-purple-300">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-purple-900/80 text-purple-100 text-xs border border-purple-700/60 rounded px-1.5 py-0.5 focus:outline-none focus:border-pink-400"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Animated Realistic Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center focus:outline-none text-left py-1 shrink-0"
          >
            <AnimatedLogo size="md" showUrl={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  currentView === item.id
                    ? 'text-purple-950 bg-gradient-to-r from-purple-100/80 to-pink-50/70 border border-purple-300/80 shadow-xs'
                    : 'text-slate-700 hover:text-purple-900 hover:bg-purple-50/60'
                }`}
              >
                {item.icon && <item.icon className={`w-3.5 h-3.5 ${currentView === item.id ? 'text-pink-600' : 'text-purple-600'}`} />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-black bg-gradient-to-r from-purple-700 to-pink-600 text-white px-1.5 py-0.2 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-purple-700 via-pink-600 to-pink-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTrial}
              className="bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition flex items-center gap-1.5 animate-pulse-glow"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>3-Day Free Trial</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition ${
                      currentView === 'admin'
                        ? 'bg-purple-700 text-white border-purple-700'
                        : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Admin</span>
                  </button>
                )}

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition ${
                    currentView === 'dashboard'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2.5 rounded-xl transition"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-purple-900 bg-purple-50 border border-purple-200 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  currentView === item.id ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4 text-purple-600" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-purple-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTrial();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-black bg-amber-400 text-purple-950 rounded-xl shadow-md"
            >
              Book 3-Day Free Trial
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-bold bg-purple-50 border border-purple-200 text-purple-900 rounded-xl"
              >
                My Student Dashboard ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-bold bg-purple-50 border border-purple-200 text-purple-900 rounded-xl"
              >
                Student Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
