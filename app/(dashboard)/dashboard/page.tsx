import { createClient } from "@/lib/supabase/server";
import { ShoppingCart, Package, Users, TrendingUp, Plus, ArrowLeft, ExternalLink, Copy } from "lucide-react";
import Link from "next/link";
import type { OrderStatus } from "@/types/database";

const statusConfig: Record<OrderStatus, { label: string; dot: string }> = {
  new:       { label: "جديد",        dot: "bg-gray-400" },
  confirmed: { label: "مؤكد",        dot: "bg-blue-400" },
  shipped:   { label: "تم الشحن",    dot: "bg-cyan-400" },
  delivered: { label: "تم التسليم",  dot: "bg-green-400" },
  cancelled: { label: "ملغي",        dot: "bg-red-400" },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: store } = await supabase
    .from("stores")
    .select("id, name, slug")
    .eq("owner_id", user!.id)
    .single();

  let stats = { orders: 0, products: 0, customers: 0, revenue: 0 };
  let recentOrders: any[] = [];

  if (store) {
    const [
      { count: orders },
      { count: products },
      { count: customers },
      { data: rev },
      { data: recent },
    ] = await Promise.all([
      supabase.from("orders").select("*", { count: "exact", head: true }).eq("store_id", store.id),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("store_id", store.id),
      supabase.from("customers").select("*", { count: "exact", head: true }).eq("store_id", store.id),
      supabase.from("orders").select("total_amount").eq("store_id", store.id).eq("status", "delivered"),
      supabase.from("orders")
        .select("id, status, total_amount, created_at, customers(name)")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    stats = {
      orders: orders ?? 0,
      products: products ?? 0,
      customers: customers ?? 0,
      revenue: rev?.reduce((s, o) => s + Number(o.total_amount), 0) ?? 0,
    };
    recentOrders = recent ?? [];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const storeUrl = store ? `${siteUrl}/store/${store.slug}` : "";

  const cards = [
    {
      label: "إجمالي الطلبات",
      value: stats.orders,
      icon: ShoppingCart,
      gradient: "from-blue-500/15 to-blue-600/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/15 text-blue-400",
      href: "/dashboard/orders",
    },
    {
      label: "المنتجات النشطة",
      value: stats.products,
      icon: Package,
      gradient: "from-cyan-500/15 to-cyan-600/5",
      border: "border-cyan-500/20",
      iconBg: "bg-cyan-500/15 text-cyan-400",
      href: "/dashboard/products",
    },
    {
      label: "العملاء",
      value: stats.customers,
      icon: Users,
      gradient: "from-green-500/15 to-green-600/5",
      border: "border-green-500/20",
      iconBg: "bg-green-500/15 text-green-400",
      href: "/dashboard/customers",
    },
    {
      label: "إيرادات مسلَّمة",
      value: `$${stats.revenue.toFixed(0)}`,
      icon: TrendingUp,
      gradient: "from-violet-500/15 to-violet-600/5",
      border: "border-violet-500/20",
      iconBg: "bg-violet-500/15 text-violet-400",
      href: "/dashboard/orders",
    },
  ];

  const quickActions = [
    {
      label: "إضافة منتج",
      desc: "أضف منتجاً جديداً للمتجر",
      icon: Plus,
      href: "/dashboard/products/new",
      accent: "bg-[#1E40AF]/10 border-[#1E40AF]/20 hover:border-[#1E40AF]/40",
      iconBg: "bg-[#1E40AF]/15 text-blue-400",
    },
    {
      label: "عرض الطلبات",
      desc: "تابع ومعالجة طلباتك",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      accent: "bg-green-500/5 border-green-500/20 hover:border-green-500/40",
      iconBg: "bg-green-500/15 text-green-400",
    },
    {
      label: "إعدادات المتجر",
      desc: "عدّل بيانات متجرك",
      icon: ExternalLink,
      href: "/dashboard/settings",
      accent: "bg-violet-500/5 border-violet-500/20 hover:border-violet-500/40",
      iconBg: "bg-violet-500/15 text-violet-400",
    },
  ];

  return (
    <div className="max-w-5xl" dir="rtl">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            مرحباً بك، <span className="text-[#1E40AF]">{store?.name ?? "متجري"}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString("ar-SY", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 bg-[#1E40AF] hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20">
          <Plus size={16} />
          إضافة منتج
        </Link>
      </div>

      {/* ── Store URL card ── */}
      {store && (
        <div className="bg-gradient-to-l from-[#1E40AF]/10 via-[#06B6D4]/5 to-transparent border border-[#1E40AF]/20 rounded-2xl p-4 mb-7 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1E40AF]/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <ExternalLink size={16} className="text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-blue-400 font-medium mb-0.5">رابط متجرك العام</p>
            <p className="text-sm text-gray-700 truncate font-mono" dir="ltr">{storeUrl}</p>
          </div>
          <Link
            href={`/store/${store.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] bg-white border border-[#1E40AF]/20 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <ExternalLink size={13} />
            فتح
          </Link>
        </div>
      )}

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, gradient, border, iconBg, href }) => (
          <Link
            key={label}
            href={href}
            className={`group bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5`}>
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={19} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mb-1">{value}</p>
            <p className="text-gray-500 text-xs font-medium">{label}</p>
          </Link>
        ))}
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickActions.map(({ label, desc, icon: Icon, href, accent, iconBg }) => (
          <Link
            key={label}
            href={href}
            className={`group flex items-center gap-4 p-4 rounded-2xl border bg-white ${accent} transition-all hover:-translate-y-0.5 hover:shadow-md`}>
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-400 truncate">{desc}</p>
            </div>
            <ArrowLeft size={15} className="text-gray-300 group-hover:text-gray-400 mr-auto flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>

      {/* ── Recent orders ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">آخر الطلبات</h2>
          {recentOrders.length > 0 && (
            <Link href="/dashboard/orders" className="text-xs text-[#1E40AF] font-medium hover:underline">
              عرض الكل
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={24} className="text-gray-300" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">لا توجد طلبات بعد</h3>
            <p className="text-gray-400 text-xs mb-5">شارك رابط متجرك مع عملائك وابدأ البيع</p>
            {store && (
              <Link
                href={`/store/${store.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] border border-[#1E40AF]/30 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                <ExternalLink size={13} />
                افتح المتجر
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/60">
                <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">رقم الطلب</th>
                <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">العميل</th>
                <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">المبلغ</th>
                <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">الحالة</th>
                <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">التاريخ</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order: any) => {
                const sc = statusConfig[order.status as OrderStatus] ?? { label: order.status, dot: "bg-gray-400" };
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-xs font-mono text-gray-500">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-800">
                      {(order.customers as any)?.name ?? "—"}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-gray-900">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("ar-SY")}
                    </td>
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="text-xs text-[#1E40AF] hover:underline font-medium">
                        عرض
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
