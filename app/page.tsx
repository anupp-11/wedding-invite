/**
 * Public Invitation Page
 * Landing page for the wedding invitation
 */

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Background Photo Hero Section */}
      <div className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/mandap.jpeg"
            alt="Wedding Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/65"></div>
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-50 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 py-12">
          {/* Header with decorative flourish */}
          <div className="mb-8">
            <p className="text-white/90 text-lg tracking-widest uppercase mb-4 animate-fade-in drop-shadow-lg">
              You are cordially invited to
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 animate-slide-up drop-shadow-2xl">
              Our Wedding
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-white/60"></span>
              <span className="text-2xl">💍</span>
              <span className="h-px w-16 bg-white/60"></span>
            </div>
          </div>

          {/* Couple Photo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/70">
              <Image
                src="/usphoto.jpeg"
                alt="Raju & Devi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Couple Names on Hero */}
          <div className="animate-fade-in-delay">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-2 drop-shadow-2xl">
              Raju & Devi
            </h2>
            <p className="text-xl text-white/90 italic drop-shadow-lg">
              are getting married
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-16 -mt-16">
        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Date & Time */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Date & Time</h3>
            <p className="text-2xl font-serif text-rose-700 mb-1">
              Friday, February 20, 2026
            </p>
            <p className="text-gray-600">8:00 AM - 12:30 PM</p>
          </div>

          {/* Venue */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Venue</h3>
            <p className="text-2xl font-serif text-rose-700 mb-1">NCSC</p>
            <p className="text-gray-600">Shree Pashupatinath Temple & Bouddha Vihar</p>
          </div>
        </div>

        {/* Love Story */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-serif text-rose-800 text-center mb-6">
            Our Love Story ❤️
          </h3>
          <p className="text-gray-600 text-center leading-relaxed max-w-2xl mx-auto">
            What began as a childhood bond has grown into an unbreakable love story. 
            Two souls, one shared path, and a lifetime ahead. Celebrate with us as 
            Raju and Devi unite in love, surrounded by joy, laughter, and unforgettable moments.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-2xl">
            <span>🥂</span>
            <span>🍾</span>
          </div>
          <p className="text-center text-rose-600 font-medium mt-4">
            Let&apos;s toast to their forever!
          </p>
        </div>

        {/* Celebration Events */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-serif text-rose-800 text-center mb-6">
            Order of Events
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🙏</div>
              <p className="font-semibold text-gray-800">8:00 AM</p>
              <p className="text-gray-600">Wedding Ceremony</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">💐</div>
              <p className="font-semibold text-gray-800">10:00 AM</p>
              <p className="text-gray-600">Blessings & Rituals</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🍽️</div>
              <p className="font-semibold text-gray-800">11:30 AM</p>
              <p className="text-gray-600">Feast & Celebration</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/rsvp"
            className="inline-block bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold text-lg py-4 px-10 rounded-full shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all transform hover:scale-105 hover:shadow-xl"
          >
            Respond to Invitation
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            Please respond by February 10, 2026
          </p>
        </div>

        {/* Footer message */}
        <div className="text-center mt-16 text-gray-500">
          <p className="italic">&quot;Two souls, one shared path, a lifetime ahead&quot;</p>
        </div>
      </div>
    </main>
  );
}
