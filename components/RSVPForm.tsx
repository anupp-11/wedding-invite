/**
 * RSVP Form Component
 * Handles form submission for wedding RSVP responses
 */

'use client';

import { useState, FormEvent } from 'react';
import type { RSVPFormData, RSVPResponse } from '@/lib/types';

export default function RSVPForm() {
  // Form state
  const [name, setName] = useState('');
  const [response, setResponse] = useState<RSVPResponse>('yes');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData: RSVPFormData = {
        name,
        response,
        guests,
        message: message || undefined,
      };

      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit');
      }

      // Mark as submitted to disable resubmission
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state - show thank you message
  if (isSubmitted) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-rose-800 mb-2">Thank You!</h2>
        <p className="text-gray-600">
          Your response has been recorded. We look forward to celebrating with you!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-serif text-rose-800 text-center mb-6">
        RSVP to Our Wedding
      </h2>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Name field */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none transition-all"
          placeholder="Enter your full name"
        />
      </div>

      {/* Response radio buttons */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">
          Will you attend? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes, I will be there!', emoji: '🎉' },
            { value: 'no', label: 'No, I cannot attend', emoji: '😢' },
            { value: 'maybe', label: 'Maybe, I will confirm later', emoji: '🤔' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                response === option.value
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-gray-200 hover:border-rose-200'
              }`}
            >
              <input
                type="radio"
                name="response"
                value={option.value}
                checked={response === option.value}
                onChange={(e) => setResponse(e.target.value as RSVPResponse)}
                className="sr-only"
              />
              <span className="mr-2">{option.emoji}</span>
              <span className="text-gray-700">{option.label}</span>
              {response === option.value && (
                <svg
                  className="w-5 h-5 text-rose-500 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Number of guests */}
      <div className="mb-6">
        <label htmlFor="guests" className="block text-gray-700 font-medium mb-2">
          Number of Guests
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none transition-all bg-white"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Guest' : 'Guests'}
            </option>
          ))}
        </select>
      </div>

      {/* Message field */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
          Message for the Couple (Optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Send your wishes..."
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold py-3 px-6 rounded-lg hover:from-rose-500 hover:to-pink-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}
