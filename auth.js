// auth.js
import { supabase } from './supabase.js';

export async function checkSessionOrRedirect() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
  }
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}
