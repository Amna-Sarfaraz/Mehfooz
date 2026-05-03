import { NextResponse } from 'next/server';

const allowedModules = new Set(['savings', 'gold', 'mutual-funds', 'psx', 'budgeting']);

export async function POST(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Supabase environment variables are missing.' }, { status: 500 });
    }

    const { accessToken, userId, moduleSlug, progress, completed } = await request.json();

    if (!accessToken || !userId || !allowedModules.has(moduleSlug)) {
      return NextResponse.json({ error: 'Invalid progress request.' }, { status: 400 });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/user_progress?on_conflict=user_id,module_slug`,
      {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify([
          {
            user_id: userId,
            module_slug: moduleSlug,
            progress,
            completed,
            updated_at: new Date().toISOString(),
          },
        ]),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        { error: details || 'Supabase rejected the progress update.' },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Unexpected server error while saving progress.' },
      { status: 500 },
    );
  }
}
