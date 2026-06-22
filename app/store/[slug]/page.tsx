import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, MessageCircle } from "lucide-react";

export default async function StorefrontPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: store } = await supabase.from("stores").select("*").eq("slug", params.slug).eq("is_active", true).single();
  if (!store) notFound();

  const { data: products } = await supabase.from("products").select("*").eq("store_id", store.id).eq("is_active", true).order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Store header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {store.logo_url ? (
              <img src={store.logo_url} className="w-10 h-10 rounded-xl object-cover"/>
            ) : (
              <div className="w-10 h-10 bg-[#1E40AF] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {store.name[0]}
              </div>
            )}
            <h1 className="font-bold text-gray-900 text-lg">{store.name}</h1>
          </div>
          {store.whatsapp_number && (
            <a href={`https://wa.me/${store.whatsapp_number.replace(/\D/g,"")}`} target="_blank"
              className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition font-medium">
              <MessageCircle size={16}/>
              تواصل معنا
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      {store.description && (
        <div className="bg-[#1E40AF] text-white py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
          <p className="text-blue-200 text-sm max-w-md mx-auto">{store.description}</p>
        </div>
      )}

      {/* Products */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {!products?.length ? (
          <div className="text-center py-24">
            <Package size={48} className="mx-auto text-gray-300 mb-4"/>
            <p className="text-gray-400">لا توجد منتجات متاحة حالياً</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">المنتجات ({products.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <Link key={product.id} href={`/store/${params.slug}/product/${product.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={32} className="text-gray-300"/>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-[#1E40AF] font-bold">${Number(product.price).toFixed(2)}</p>
                    {product.stock_quantity === 0 && <p className="text-xs text-red-500 mt-1">نفد المخزون</p>}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-xs border-t border-gray-100 mt-10">
        مدعوم من <Link href="/" className="text-[#1E40AF] font-medium">وجود</Link>
      </footer>
    </div>
  );
}

export const dynamic = "force-dynamic";
