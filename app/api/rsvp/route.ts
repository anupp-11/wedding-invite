/**
 * API Route Handler for RSVP operations
 * POST: Create a new RSVP (public)
 * GET: Fetch all RSVPs (admin only - requires authentication)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase-server';
import type { RSVPFormData, RSVP, ApiResponse } from '@/lib/types';

// POST: Create a new RSVP
export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.response) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Name and response are required' },
        { status: 400 }
      );
    }

    // Validate response value
    if (!['yes', 'no', 'maybe'].includes(body.response)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid response value' },
        { status: 400 }
      );
    }

    // Use admin client to insert (bypasses RLS)
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        name: body.name.trim(),
        response: body.response,
        guests: body.guests || 1,
        message: body.message?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Failed to save RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<RSVP>>(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: Fetch all RSVPs (admin only)
export async function GET() {
  try {
    // Check if user is authenticated
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Use admin client to fetch all RSVPs
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Failed to fetch RSVPs' },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<RSVP[]>>(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
