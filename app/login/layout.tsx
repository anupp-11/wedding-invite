/**
 * Login Layout
 * Forces dynamic rendering to avoid prerendering without env vars
 */

// Force dynamic rendering for login page
export const dynamic = 'force-dynamic';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
