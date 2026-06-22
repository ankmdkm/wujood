import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Order } from "@/types/database";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: store } = await supabase.from("stores").select("id").eq("owner_id", user!.id).single();
  const { data: orders } = store
    ? await supabase.from("orders").select("*, customers(name,phone,city)").eq("store_id", store.id).order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">الطلبات</h1>
        <p className="text-gray-500 text-sm mt-1">{orders?.length ?? 0} طلب إجمالي</p>
      </div>

      {!orders?.length ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
          <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4"/>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات بعد</h2>
          <p className="text-gray-400 text-sm">شارك رابط متجرك مع عملائك لتبدأ باستقبال الطلبات</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">رقم الطلب</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">العميل</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">المبلغ</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">الحالة</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">التاريخ</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(orders as any[]).map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{order.customers?.name}</p>
                    <p className="text-xs text-gray-400">{order.customers?.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${Number(order.total_amount).toFixed(2)}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status}/></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString("ar-SY")}</td>
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/orders/${order.id}`} className="text-sm text-[#1E40AF] hover:underline font-medium">عرض التفاصيل</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
