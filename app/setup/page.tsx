"use client";
import { useState, useEffect } from "react";
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

export default function SetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login"); return; }
      supabase.from("stores").select("id").eq("owner_id", user.id).single().then(({ data }) => {
        if (data) { router.push("/dashboard"); return; }
        setChecking(false);
      });
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const randomPart = Math.random().toString(36).slice(2, 8);
    const slug = `store-${randomPart}-${Date.now().toString(36)}`;

    const { error: storeErr } = await supabase.from("stores").insert({
      owner_id: user.id,
      name: form.name,
      slug,
      whatsapp_number: form.whatsapp || null,
    });

    if (storeErr) {
      setError("حدث خطأ، حاول مرة أخرى");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-[#0B1220] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin"/>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/40">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <path d="M24 26 C24 50,27 70,36 70 C43 70,45.5 58,47.5 51 C49.5 58,52 70,59 70 C68 70,71 50,71 26"
                fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="47.5" cy="51" r="5.5" fill="#22C55E"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">أكملت التحقق! 🎉</h1>
          <p className="text-gray-400 text-sm mt-1">أدخل بيانات متجرك لتبدأ</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DarkInput
              id="name" label="اسم متجرك"
              placeholder="مثال: متجر أحمد"
              value={form.name} onChange={set("name")} required
            />
            <DarkInput
              id="whatsapp" label="رقم واتساب (لإشعارات الطلبات)"
              type="tel" placeholder="+963912345678"
              value={form.whatsapp} onChange={set("whatsapp")} dir="ltr"
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
              إنشاء المتجر والدخول
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link href="/login" className="hover:text-gray-400 transition-colors">تسجيل الخروج</Link>
        </p>
      </div>
    </main>
  );
}
