/**
 * Admin Table Component
 * Displays all RSVP responses with statistics
 */

'use client';

import { useState, useEffect } from 'react';
import type { RSVP, RSVPStats, RSVPResponse } from '@/lib/types';

export default function AdminTable() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RSVPResponse | 'all'>('all');

  // Fetch RSVPs on mount
  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const res = await fetch('/api/rsvp');
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch RSVPs');
      }

      setRsvps(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats: RSVPStats = rsvps.reduce(
    (acc, rsvp) => {
      if (rsvp.response === 'yes') {
        acc.totalYes++;
        acc.totalGuests += rsvp.guests;
      } else if (rsvp.response === 'no') {
        acc.totalNo++;
      } else {
        acc.totalMaybe++;
      }
      return acc;
    },
    { totalYes: 0, totalNo: 0, totalMaybe: 0, totalGuests: 0 }
  );

  // Filter RSVPs
  const filteredRsvps =
    filter === 'all' ? rsvps : rsvps.filter((r) => r.response === filter);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get response badge color
  const getResponseBadge = (response: RSVPResponse) => {
    const badges = {
      yes: 'bg-green-100 text-green-800',
      no: 'bg-red-100 text-red-800',
      maybe: 'bg-yellow-100 text-yellow-800',
    };
    return badges[response];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-medium">Error loading RSVPs</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-green-600 text-sm font-medium">Total YES</p>
          <p className="text-3xl font-bold text-green-700">{stats.totalYes}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-blue-600 text-sm font-medium">Total Guests</p>
          <p className="text-3xl font-bold text-blue-700">{stats.totalGuests}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-red-600 text-sm font-medium">Total NO</p>
          <p className="text-3xl font-bold text-red-700">{stats.totalNo}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <p className="text-yellow-600 text-sm font-medium">Total MAYBE</p>
          <p className="text-3xl font-bold text-yellow-700">{stats.totalMaybe}</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'yes', 'no', 'maybe'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === f
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && (
              <span className="ml-1 text-sm opacity-75">
                ({rsvps.filter((r) => r.response === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* RSVP Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Response
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No RSVPs found
                  </td>
                </tr>
              ) : (
                filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{rsvp.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getResponseBadge(
                          rsvp.response
                        )}`}
                      >
                        {rsvp.response.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {rsvp.guests}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {rsvp.message || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {formatDate(rsvp.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refresh button */}
      <div className="text-center">
        <button
          onClick={fetchRSVPs}
          className="text-rose-600 hover:text-rose-700 font-medium text-sm"
        >
          ↻ Refresh Data
        </button>
      </div>
    </div>
  );
}
