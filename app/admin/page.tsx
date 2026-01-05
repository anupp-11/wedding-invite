/**
 * Admin Page
 * Protected page to view all RSVP responses
 */

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminTable from '@/components/AdminTable';

// Force dynamic rendering to avoid prerendering without env vars
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-serif text-rose-800 mb-2">RSVP Responses</h2>
          <p className="text-gray-600">
            View and manage all wedding invitation responses.
          </p>
        </div>

        {/* Admin table with RSVPs */}
        <AdminTable />
      </div>
    </ProtectedRoute>
  );
}
