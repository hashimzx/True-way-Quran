import React, { useState } from 'react';
import { Course, SubscriptionTier } from '../types';
import { COURSES_DATA, SUBSCRIPTION_TIERS } from '../data/coursesData';
import { 
  GraduationCap, 
  Check, 
  Sparkles, 
  Clock, 
  BookOpen, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CoursesSectionProps {
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
  onEnrollCourse: (course: Course) => void;
  onSubscribe: (tier: SubscriptionTier) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  currency,
  onEnrollCourse,
  onSubscribe
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'subscriptions'>('courses');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'CAD': return 'CA$';
      case 'AUD': return 'AU$';
      default: return '$';
    }
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded-full text-xs font-semibold text-red-400">
          <GraduationCap className="w-4 h-4 text-red-500" />
          <span>Accredited International Quran Academy</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Structured Quran & Islamic Courses
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Crafted for international learners living in the UK, USA, Canada, Europe, Australia, and the Middle East. Choose individual lifetime courses or flexible all-access membership plans.
        </p>

        {/* View Switcher Tabs */}
        <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl mt-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'courses'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Individual Courses
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'subscriptions'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Membership Plans</span>
          </button>
        </div>
      </div>

      {/* Courses Grid View */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => {
            const isExpanded = expandedSyllabusId === course.id;
            const price = course.prices[currency];

            return (
              <div
                key={course.id}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-2xl relative overflow-hidden group"
              >
                {course.featured && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category & Arabic Subtitle */}
                  <div>
                    <span className="text-[11px] font-semibold text-red-500 uppercase tracking-widest">
                      {course.level}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="font-arabic text-sm text-zinc-400 mt-0.5 dir-rtl">
                      {course.arabicTitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 text-xs text-zinc-400 py-2 border-y border-zinc-850">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-red-500" />
                      <span>{course.totalLessons} Lessons</span>
                    </div>
                  </div>

                  {/* Instructor Bio Snippet */}
                  <div className="flex items-center gap-2.5 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
                    <UserCheck className="w-4 h-4 text-red-500 shrink-0" />
                    <div className="text-[11px] truncate">
                      <span className="font-semibold text-zinc-200 block truncate">{course.instructorName}</span>
                      <span className="text-zinc-500 truncate block">{course.instructorTitle}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-1">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Syllabus preview */}
                  <div>
                    <button
                      onClick={() => setExpandedSyllabusId(isExpanded ? null : course.id)}
                      className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>{isExpanded ? 'Hide Syllabus' : 'View Course Syllabus'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300 animate-fadeIn">
                        {course.syllabus.map((mod, idx) => (
                          <div key={idx} className="space-y-1">
                            <span className="font-bold text-white block">{mod.title}</span>
                            <ul className="list-disc list-inside text-zinc-400 pl-1 text-[11px] space-y-0.5">
                              {mod.topics.map((top, tIdx) => (
                                <li key={tIdx}>{top}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and Enrollment CTA */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">One-Time Fee</span>
                    <div className="text-2xl font-black text-white">
                      <span>{symbol}{price}</span>
                      <span className="text-xs font-normal text-zinc-500 ml-1">USD equiv.</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onEnrollCourse(course)}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg hover:shadow-red-600/30"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subscription Plans View */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const price = tier.prices[currency];

            return (
              <div
                key={tier.id}
                className={`bg-zinc-950 border rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                  tier.badge
                    ? 'border-red-600 shadow-2xl ring-1 ring-red-600/40'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{tier.name}</h3>
                    <p className="text-xs text-zinc-400 mt-1">{tier.tagline}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{symbol}{price}</span>
                      <span className="text-xs text-zinc-400 font-medium">{tier.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-850">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">What's Included:</p>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => onSubscribe(tier)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                      tier.badge
                        ? 'bg-red-600 hover:bg-red-700 text-white glow-red-sm'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Choose {tier.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600/10 text-red-500 rounded-xl shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">100% Satisfaction & Tajweed Guarantee</h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              If your pronunciation does not significantly improve within 14 days, get a full refund without questions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Instant Course Activation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Encrypted Stripe Checkout
          </span>
        </div>
      </div>
    </div>
  );
};
