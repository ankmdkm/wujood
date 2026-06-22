"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  const productId = searchParams.get("product");
  const [product, setProduct] = useState<any>(null);
  const [store, setStore] = useState<any>(null);
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qty, setQty] = useState(1);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    supabase.from("stores").select("*").eq("slug", slug as string).single().then(({ data }) => setStore(data));
    if (productId) supabase.from("products").select("*").eq("id", productId).single().then(({ data }) => setProduct(data));
  }, [slug, productId]);

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!store || !product) return;
    setLoading(true);
    const { data: customer } = await supabase.from("customers").insert({ store_id: store.id, name: form.name, phone: form.phone, city: form.city || null, address: form.address || null }).select().single();
    if (!customer) { setLoading(false); return; }
    const total = product.price * qty;
    const { data: order } = await supabase.from("orders").insert({ store_id: store.id, customer_id: customer.id, total_amount: total, notes: form.notes || null }).select().single();
    if (!order) { setLoading(false); return; }
    await supabase.from("order_items").insert({ order_id: order.id, product_id: product.id, quantity: qty, unit_price: product.price });
    // Notify store owner via WhatsApp link (auto-opens on mobile)
    if (store.whatsapp_number) {
      const msg = `طلب جديد من ${form.name}!\nالمنتج: ${product.name} ×${qty}\nالإجمالي: $${total.toFixed(2)}\nالهاتف: ${form.phone}\nالعنوان: ${form.address || form.city}`;
      window.open(`https://wa.me/${store.whatsapp_number.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`, "_blank");
    }
    setSuccess(true);
    setLoading(false);
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center max-w-sm">
        <CheckCircle size={64} className="mx-auto text-[#22C55E] mb-4"/>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">تم إرسال طلبك!</h1>
        <p className="text-gray-500 mb-6">سيتواصل معك التاجر قريباً لتأكيد الطلب</p>
        <Button onClick={() => router.push(`/store/${slug}`)}>العودة للمتجر</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
        {store && <p className="text-gray-500 text-sm mb-8">من متجر {store.name}</p>}

        {product && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 flex gap-4 items-center">
            {product.image_url && <img src={product.image_url} className="w-16 h-16 rounded-xl object-cover"/>}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-[#1E40AF] font-bold">${(product.price * qty).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">−</button>
              <span className="w-6 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock_quantity, q+1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">+</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <form onSubmit={handleOrder} className="space-y-4">
            <Input id="name" label="الاسم الكامل *" placeholder="محمد أحمد" value={form.name} onChange={set("name")} required/>
            <Input id="phone" label="رقم الهاتف / واتساب *" type="tel" placeholder="+963912345678" value={form.phone} onChange={set("phone")} required dir="ltr" className="text-left"/>
            <Input id="city" label="المدينة" placeholder="دمشق" value={form.city} onChange={set("city")}/>
            <Input id="address" label="العنوان التفصيلي" placeholder="الحي، الشارع..." value={form.address} onChange={set("address")}/>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">ملاحظات (اختياري)</label>
              <textarea value={form.notes} onChange={set("notes")} className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none h-20" placeholder="أي تعليمات خاصة..."/>
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">تأكيد الطلب</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
