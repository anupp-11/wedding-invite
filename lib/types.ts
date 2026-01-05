/**
 * TypeScript types for the Wedding RSVP application
 */

// RSVP response options
export type RSVPResponse = 'yes' | 'no' | 'maybe';

// RSVP record from database
export interface RSVP {
  id: string;
  name: string;
  response: RSVPResponse;
  guests: number;
  message: string | null;
  created_at: string;
}

// Form data for creating a new RSVP
export interface RSVPFormData {
  name: string;
  response: RSVPResponse;
  guests: number;
  message?: string;
}

// API response types
export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// Admin stats
export interface RSVPStats {
  totalYes: number;
  totalNo: number;
  totalMaybe: number;
  totalGuests: number;
}
