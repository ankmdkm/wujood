import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

export default async function ProductPage({ params }: { params: { slug: string; id: string } }) {
  const supabase = await createClient();
  const { data: store } = await supabase.from("stores").select("*").eq("slug", params.slug).single();
  if (!store) notFound();
  const { data: product } = await supabase.from("products").select("*, categories(name)").eq("id", params.id).single();
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href={`/store/${params.slug}`} className="text-gray-400 hover:text-gray-600"><ArrowRight size={20}/></Link>
          <span className="text-gray-600 font-medium">{store.name}</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full aspect-video object-cover"/>
          ) : (
            <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
              <Package size={64} className="text-gray-300"/>
            </div>
          )}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-[#1E40AF] mb-4">${Number(product.price).toFixed(2)}</p>
            {product.description && <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>}
            {product.stock_quantity === 0 ? (
              <p className="text-red-500 font-medium">نفد المخزون حالياً</p>
            ) : (
              <Link href={`/store/${params.slug}/checkout?product=${product.id}`}
                className="inline-block bg-[#1E40AF] text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-800 transition">
                اطلب الآن
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
