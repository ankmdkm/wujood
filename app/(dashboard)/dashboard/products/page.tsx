import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: store } = await supabase.from("stores").select("id").eq("owner_id", user!.id).single();
  const { data: products } = store
    ? await supabase.from("products").select("*").eq("store_id", store.id).order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">المنتجات</h1>
          <p className="text-gray-500 text-sm mt-1">{products?.length ?? 0} منتج في متجرك</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button><Plus size={18} />إضافة منتج</Button>
        </Link>
      </div>

      {!products?.length ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">لا توجد منتجات بعد</h2>
          <p className="text-gray-400 text-sm mb-6">أضف أول منتج وابدأ البيع</p>
          <Link href="/dashboard/products/new"><Button>إضافة أول منتج</Button></Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">المنتج</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">السعر</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">المخزون</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">الحالة</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-4">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover"/>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package size={16} className="text-gray-400"/>
                        </div>
                      )}
                      <span className="font-medium text-gray-900 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">${Number(p.price).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${p.stock_quantity === 0 ? "text-red-500" : "text-gray-700"}`}>
                      {p.stock_quantity === 0 ? "نفد المخزون" : p.stock_quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={p.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                      {p.is_active ? "نشط" : "مخفي"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/products/${p.id}/edit`}>
                        <button className="p-2 text-gray-400 hover:text-[#1E40AF] hover:bg-blue-50 rounded-lg transition">
                          <Pencil size={15}/>
                        </button>
                      </Link>
                    </div>
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
