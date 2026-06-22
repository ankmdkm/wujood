"use client";
import { useState } from "react";
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

export default function SignupPage() {
  const supabase = createClient();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authErr } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authErr) {
      const msgs: Record<string, string> = {
        "User already registered": "هذا البريد الإلكتروني مسجل مسبقاً — سجل دخولك",
        "Password should be at least 6 characters": "كلمة المرور قصيرة جداً (٦ أحرف على الأقل)",
        "Invalid email": "البريد الإلكتروني غير صحيح",
        "Email rate limit exceeded": "حاولت كثيراً، انتظر قليلاً ثم أعد المحاولة",
      };
      setError(msgs[authErr.message] ?? `حدث خطأ: ${authErr.message}`);
      setLoading(false);
      return;
    }

    setEmailSent(true);
    setLoading(false);
  }

  if (emailSent) {
    return (
      <main className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">تفقد بريدك الإلكتروني</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            تم إرسال رابط التأكيد لإيميلك
          </p>
          <p className="text-white font-semibold mb-4" dir="ltr">{form.email}</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            أكد إيميلك ثم سجل دخولك لإكمال إعداد متجرك.<br/>
            لم يصلك البريد؟ تفقد مجلد الـ Spam.
          </p>
          <Link
            href="/login"
            className="inline-block mt-8 bg-gradient-to-l from-[#1E40AF] to-[#2563EB] text-white px-8 py-3 rounded-xl text-sm font-bold hover:from-[#1d39a0] hover:to-[#1d4ed8] transition-all">
            سجل دخولك الآن
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
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
          <h1 className="text-2xl font-bold text-white">أنشئ حسابك مجاناً</h1>
          <p className="text-gray-400 text-sm mt-1">دقائق وتكون جاهزاً للبيع</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSignup} className="space-y-4">
            <DarkInput
              id="email" label="البريد الإلكتروني"
              type="email" placeholder="example@email.com"
              value={form.email} onChange={set("email")} required dir="ltr"
            />
            <DarkInput
              id="password" label="كلمة المرور"
              type="password" placeholder="٨ أحرف على الأقل"
              value={form.password} onChange={set("password")} required dir="ltr" minLength={8}
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
              إنشاء الحساب
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          لديك حساب؟{" "}
          <Link href="/login" className="text-[#06B6D4] font-medium hover:underline">سجل دخولك</Link>
        </p>
      </div>
    </main>
  );
}
