import { createClient } from "@/lib/supabase/server";
import { Users } from "lucide-react";

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: store } = await supabase.from("stores").select("id").eq("owner_id", user!.id).single();
  const { data: customers } = store
    ? await supabase.from("customers").select("*, orders(count)").eq("store_id", store.id).order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">العملاء</h1>
        <p className="text-gray-500 text-sm mt-1">{customers?.length ?? 0} عميل مسجل</p>
      </div>

      {!customers?.length ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
          <Users size={48} className="mx-auto text-gray-300 mb-4"/>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">لا توجد عملاء بعد</h2>
          <p className="text-gray-400 text-sm">سيظهر هنا عملاؤك بعد أول طلب</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">الاسم</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">الهاتف</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">المدينة</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c: any) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1E40AF]/10 text-[#1E40AF] rounded-full flex items-center justify-center text-sm font-bold">{c.name[0]}</div>
                      <span className="text-sm font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dir-ltr" dir="ltr">{c.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.city ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(c.created_at).toLocaleDateString("ar-SY")}</td>
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
