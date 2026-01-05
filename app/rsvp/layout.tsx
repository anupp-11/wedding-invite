/**
 * RSVP Layout
 * Forces dynamic rendering to avoid prerendering without env vars
 */

// Force dynamic rendering for RSVP page (contains RSVPForm with Supabase)
export const dynamic = 'force-dynamic';

export default function RSVPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
