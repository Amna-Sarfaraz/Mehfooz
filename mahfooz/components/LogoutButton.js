'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function LogoutButton({ style, className }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} disabled={loading} style={style} className={className}>
      {loading ? 'Signing out...' : 'Logout'}
    </button>
  );
}
