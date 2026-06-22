"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Copy } from "lucide-react";

export default function SettingsPage() {
  const supabase = createClient();
  const [store, setStore] = useState<any>(null);
  const [form, setForm] = useState({ name: "", whatsapp_number: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("stores").select("*").eq("owner_id", user.id).single().then(({ data }) => {
        if (data) { setStore(data); setForm({ name: data.name, whatsapp_number: data.whatsapp_number ?? "", description: data.description ?? "" }); }
      });
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("stores").update({ name: form.name, whatsapp_number: form.whatsapp_number || null, description: form.description || null }).eq("id", store.id);
    setLoading(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }

  const storeUrl = store ? `${process.env.NEXT_PUBLIC_SITE_URL}/store/${store.slug}` : "";

  function copyUrl() { navigator.clipboard.writeText(storeUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">إعدادات المتجر</h1>
      </div>

      {store && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
          <p className="text-sm font-medium text-[#1E40AF] mb-2">رابط متجرك العام</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm text-gray-700 bg-white px-3 py-2 rounded-lg border border-blue-100 truncate dir-ltr" dir="ltr">{storeUrl}</code>
            <button onClick={copyUrl} className="flex items-center gap-1.5 text-sm text-[#1E40AF] bg-white border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-50 transition font-medium">
              {copied ? <CheckCircle size={15}/> : <Copy size={15}/>}
              {copied ? "تم" : "نسخ"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <form onSubmit={handleSave} className="space-y-5">
          <Input id="name" label="اسم المتجر *" value={form.name} onChange={set("name")} required/>
          <Input id="whatsapp" label="رقم واتساب (للإشعارات)" type="tel" value={form.whatsapp_number} onChange={set("whatsapp_number")} dir="ltr" className="text-left" placeholder="+963912345678"/>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">وصف المتجر</label>
            <textarea value={form.description} onChange={set("description")}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none h-24"
              placeholder="وصف مختصر عن متجرك..."/>
          </div>
          <Button type="submit" loading={loading}>
            {saved ? <><CheckCircle size={16}/> تم الحفظ</> : "حفظ التغييرات"}
          </Button>
        </form>
      </div>
    </div>
  );
}
// force dynamic already handled by useEffect
