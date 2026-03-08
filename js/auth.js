import { supabase } from './supabase.js';

export async function handleSignup(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  const email = `${username}@your-info.local`;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username
      }
    }
  });

  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        username: username,
        full_name: '',
        title: '',
        bio: ''
      });

    if (profileError) throw profileError;
  }

  return data;
}

export async function handleLogin(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const email = `${username}@your-info.local`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) throw error;

  return data;
}

export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
