// app/login/page.tsx

import { login, signup } from "../actions";

export default function LoginPage() {
  return (
    <main>
      <h1>Login or Signup</h1>
      <form action={login}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>

      <form action={signup} style={{ marginTop: '1rem' }}>
        <input name="email" type="email" placeholder="Email" required />
        <input type="text" name="role" placeholder="Role" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}
