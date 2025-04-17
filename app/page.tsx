// app/page.tsx
import { createClient } from '@/utils/supabase/server';
import { logout } from './actions';

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main>
        <h1>Welcome, Guest!</h1>
        <a href="/login">Login or Signup</a>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {user.email}!</h1>
      <p>Your user ID is: {user.id}</p>
      <p>Your user metadata: {JSON.stringify(user.user_metadata)}</p>
      <p>Your user role: {user.role}</p>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}
