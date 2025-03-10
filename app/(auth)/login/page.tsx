"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClientComponentClient();
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        router.push("/");
      }
    }
  };

  if (isLoggedIn) return null;
  return (
    <div className="w-full max-w-md mx-auto p-6 m-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold m-6 text-center">Login</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <span> {`Don't have an account?`}</span>
        <Link className="text-blue-500 ml-1" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
