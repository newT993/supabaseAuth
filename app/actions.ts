// app/actions.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as string) || 'customer';

  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        role: role // Add role to user metadata
      }
    }
  });

  if (authError) {
    throw new Error(authError.message);
  }

  // Create profile with role
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        role: role
      });

    if (profileError) {
      throw new Error(profileError.message);
    }
  }

  redirect('/');
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  redirect('/'); // Redirect after login
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/login'); // Redirect after logout
}
