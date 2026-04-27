"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormInput } from "@/components/auth/form-input";
import { PasswordInput } from "@/components/ui/password-input";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      if (result.error.includes("pending admin approval")) {
        setError("Account pending verification");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    } else {
      // Use the new server-side dashboard redirect for better performance
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200">
          <p className="text-sm font-medium text-amber-800">{error}</p>
        </div>
      )}

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

      <Button type="submit" disabled={loading} className="w-full h-14">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Signing In...</span>
          </div>
        ) : "Sign In"}
      </Button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <AuthShell title="Welcome Back" subtitle="Sign in to your account to manage your fields.">
      <Suspense fallback={<div className="h-40 animate-pulse bg-slate-100 rounded-2xl" />}>
        <SignInForm />
      </Suspense>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-emerald-600 font-bold hover:text-emerald-500">
            Sign Up
          </Link>
        </p>
        <div>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-slate-900 transition">
            Back to home
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}