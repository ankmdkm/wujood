"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function DarkInput({
  label, id, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
      <input
        id={id}
        className="w-full px-4 py-2.5 text-sm border border-white/15 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition"
        {...props}
      />
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/40">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                <path d="M24 26 C24 50,27 70,36 70 C43 70,45.5 58,47.5 51 C49.5 58,52 70,59 70 C68 70,71 50,71 26"
                  fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="47.5" cy="51" r="5.5" fill="#22C55E"/>
              </svg>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">تسجيل الدخول إلى وجود</h1>
          <p className="text-gray-400 text-sm mt-1">أدر متجرك ومبيعاتك من مكان واحد</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <DarkInput
              id="email" label="البريد الإلكتروني"
              type="email" placeholder="example@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required dir="ltr"
            />
            <DarkInput
              id="password" label="كلمة المرور"
              type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              required dir="ltr"
            />

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-l from-[#1E40AF] to-[#2563EB] hover:from-[#1d39a0] hover:to-[#1d4ed8] text-white py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
              )}
              تسجيل الدخول
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ليس لديك حساب؟{" "}
          <Link href="/signup" className="text-[#06B6D4] font-medium hover:underline">أنشئ حساباً جديداً</Link>
        </p>
      </div>
    </main>
  );
}
