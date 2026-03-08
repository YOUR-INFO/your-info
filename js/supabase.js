import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
}

export function requireAuth() {
  (async () => {
    const user = await getCurrentUser();
    if (!user) {
      window.location.href = '/login.html';
    }
  })();
}
