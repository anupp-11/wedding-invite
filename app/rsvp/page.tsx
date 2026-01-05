/**
 * RSVP Page
 * Contains the RSVP form for guests to respond
 */

import Link from 'next/link';
import RSVPForm from '@/components/RSVPForm';

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 py-12 md:py-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Invitation
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-rose-800 mb-2">
            Raju & Devi
          </h1>
          <p className="text-gray-600">Friday, February 20, 2026</p>
          <div className="flex items-center justify-center gap-3 mt-4 text-rose-300">
            <span className="h-px w-12 bg-rose-300"></span>
            <span className="text-lg">💕</span>
            <span className="h-px w-12 bg-rose-300"></span>
          </div>
        </div>

        {/* RSVP Form Component */}
        <RSVPForm />

        {/* Help text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Having trouble? Contact us at{' '}
          <a
            href="tel:+18064019200"
            className="text-rose-600 hover:underline"
          >
            8064019200
          </a>
        </p>
      </div>
    </main>
  );
}
