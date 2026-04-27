"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role: "AGENT" }),
      });

      if (res.ok) {
        router.push("/auth/signin");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Sign Up" subtitle="Create your account">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200">
            <p className="text-sm font-medium text-amber-800">{error}</p>
          </div>
        )}

        <FormInput
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button type="submit" disabled={loading} className="w-full h-14">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Creating account...</span>
            </div>
          ) : "Sign Up"}
        </Button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-emerald-600 font-bold hover:text-emerald-500">
            Sign In
          </Link>
        </p>
        <div>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-slate-900 transition">
            Back to home
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}