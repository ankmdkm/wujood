"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", description: "", price: "", cost_price: "", stock_quantity: "0" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: store } = await supabase.from("stores").select("id").eq("owner_id", user!.id).single();
    if (!store) { setError("لم يتم العثور على المتجر"); setLoading(false); return; }
    const { error: err } = await supabase.from("products").insert({
      store_id: store.id,
      name: form.name,
      description: form.description || null,
      price: parseFloat(form.price),
      cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
      stock_quantity: parseInt(form.stock_quantity),
    });
    if (err) { setError("حدث خطأ أثناء الحفظ"); setLoading(false); return; }
    router.push("/dashboard/products");
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/products" className="text-gray-400 hover:text-gray-600 transition">
          <ArrowRight size={20}/>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">إضافة منتج جديد</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input id="name" label="اسم المنتج *" placeholder="مثال: قميص قطن رجالي" value={form.name} onChange={set("name")} required/>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">وصف المنتج</label>
            <textarea value={form.description} onChange={set("description")}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none h-24"
              placeholder="وصف مختصر للمنتج..."/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input id="price" label="سعر البيع ($) *" type="number" step="0.01" min="0" placeholder="0.00"
              value={form.price} onChange={set("price")} required dir="ltr"/>
            <Input id="cost_price" label="سعر التكلفة ($)" type="number" step="0.01" min="0" placeholder="اختياري"
              value={form.cost_price} onChange={set("cost_price")} dir="ltr"/>
          </div>
          <Input id="stock" label="الكمية في المخزون *" type="number" min="0" placeholder="0"
            value={form.stock_quantity} onChange={set("stock_quantity")} required dir="ltr"/>
          {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading}>حفظ المنتج</Button>
            <Link href="/dashboard/products">
              <Button type="button" variant="outline">إلغاء</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
