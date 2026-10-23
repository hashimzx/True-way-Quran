import React from 'react';
import { User } from '../types';
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
  X
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
  onOpenSchedule: () => void;
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
  onOpenSchedule
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = React.useState(false);

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
    { id: 'qaida', label: 'Madani Qaida', icon: BookOpen, badge: 'Interactive' },
    { id: 'courses', label: 'Courses & Pricing', icon: GraduationCap },
    { id: 'resources', label: 'Islamic Resources', icon: Compass },
    { id: 'schedule', label: 'Schedule Class', icon: Calendar, action: onOpenSchedule }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800 text-white">
      {/* Top International Announcement Bar */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 border-b border-red-900/40 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="inline-flex items-center justify-center bg-red-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
              New
            </span>
            <span>AI Voice Pronunciation Assessment active for international students worldwide.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-zinc-300 hover:text-white font-medium py-0.5 px-2 rounded hover:bg-zinc-800 transition"
              >
                <Globe className="w-3.5 h-3.5 text-red-500" />
                <span>{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-800 transition flex items-center justify-between ${
                        currency === curr ? 'text-red-500 font-bold bg-zinc-800/60' : 'text-zinc-300'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span className="text-red-500">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Timezone Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
              <span>Timezone:</span>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-zinc-900 text-zinc-200 text-xs border border-zinc-700 rounded px-1.5 py-0.5 focus:outline-none focus:border-red-500"
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
          {/* Logo with TWG Branding */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
          >
            <div className="bg-white rounded-lg p-1.5 shadow-md border border-zinc-700 transition group-hover:scale-105 flex items-center justify-center">
              <img
                src="/assets/aistudio/image_129c38c6.png"
                alt="True Way Growth Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-red-500 transition">
                  TRUE WAY GROWTH
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-zinc-400 font-semibold uppercase">
                Path To Progress · Quran Academy
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setCurrentView(item.id);
                  }
                }}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  currentView === item.id
                    ? 'text-white bg-zinc-900 border border-red-600/60 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-red-500" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                      currentView === 'admin'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-zinc-900 text-red-400 border-red-900/60 hover:bg-zinc-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                    <span>Admin Panel</span>
                  </button>
                ) : null}

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                    currentView === 'dashboard'
                      ? 'bg-zinc-800 text-white border-red-600'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-red-500" />
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="text-sm font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-zinc-900 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentView('qaida')}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Learning</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setCurrentView(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentView === item.id ? 'bg-zinc-900 text-red-500 font-bold' : 'text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 text-sm text-zinc-300 hover:bg-zinc-900 rounded-lg flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-red-500" />
                  <span>My Student Account ({currentUser.name})</span>
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 text-sm text-red-400 hover:bg-zinc-900 rounded-lg flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                    <span>Admin Panel</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 text-sm text-zinc-400 hover:text-red-400 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-bold bg-zinc-900 border border-zinc-700 text-white rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setCurrentView('qaida');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-bold bg-red-600 text-white rounded-lg"
                >
                  Start Madani Qaida Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
