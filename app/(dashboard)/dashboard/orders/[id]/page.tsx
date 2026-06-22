"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { OrderStatus } from "@/types/database";

const statusFlow: OrderStatus[] = ["new", "confirmed", "shipped", "delivered"];
const statusLabels: Record<OrderStatus, string> = {
  new: "جديد", confirmed: "مؤكد", shipped: "تم الشحن", delivered: "تم التسليم", cancelled: "ملغي"
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from("orders").select("*, customers(*), order_items(*, products(name,price))").eq("id", id).single()
      .then(({ data }) => setOrder(data));
  }, [id]);

  async function updateStatus(status: OrderStatus) {
    setLoading(true);
    await supabase.from("orders").update({ status }).eq("id", id as string);
    setOrder((o: any) => ({ ...o, status }));
    setLoading(false);
  }

  if (!order) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin"/></div>;

  const waLink = `https://wa.me/${order.customers?.phone?.replace(/\D/g,"")}?text=${encodeURIComponent(`مرحباً ${order.customers?.name}، طلبك رقم #${order.id.slice(-6).toUpperCase()} حالته الآن: ${statusLabels[order.status as OrderStatus] ?? order.status}`)}`;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/orders" className="text-gray-400 hover:text-gray-600"><ArrowRight size={20}/></Link>
        <h1 className="text-2xl font-bold text-gray-900">طلب #{order.id.slice(-6).toUpperCase()}</h1>
        <StatusBadge status={order.status}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">بيانات العميل</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">الاسم:</span> <span className="font-medium">{order.customers?.name}</span></p>
            <p><span className="text-gray-500">الهاتف:</span> <span dir="ltr">{order.customers?.phone}</span></p>
            {order.customers?.city && <p><span className="text-gray-500">المدينة:</span> {order.customers.city}</p>}
            {order.customers?.address && <p><span className="text-gray-500">العنوان:</span> {order.customers.address}</p>}
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium">
            <MessageCircle size={16}/> تواصل عبر واتساب
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">المنتجات</h2>
          <div className="space-y-3">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.products?.name} × {item.quantity}</span>
                <span className="font-medium">${(item.unit_price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
              <span>الإجمالي</span>
              <span className="text-[#1E40AF]">${Number(order.total_amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {order.status !== "cancelled" && order.status !== "delivered" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">تحديث حالة الطلب</h2>
          <div className="flex flex-wrap gap-3">
            {statusFlow.filter(s => s !== order.status).map(s => (
              <Button key={s} variant="outline" size="sm" loading={loading} onClick={() => updateStatus(s)}>
                {statusLabels[s]}
              </Button>
            ))}
            <Button variant="danger" size="sm" loading={loading} onClick={() => updateStatus("cancelled")}>إلغاء الطلب</Button>
          </div>
        </div>
      )}
    </div>
  );
}
