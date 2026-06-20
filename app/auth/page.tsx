"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const body: Record<string, string> = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    };
    if (mode === "signup") body.name = fd.get("name") as string;

    const res = await fetch(`/api/auth?action=${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    }
  }

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600";

  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-sm bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 mb-2">
            TaskFlow <span className="text-blue-500">Pro</span>
          </h1>
          <h2 className="text-zinc-400 text-sm font-medium">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className={inputStyle}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className={inputStyle}
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 text-zinc-50 font-medium px-5 py-3 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600 shadow-sm"
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-zinc-500 font-medium">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(""); }}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => { setMode("login"); setError(""); }} 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
}