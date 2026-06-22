"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard",           icon: LayoutDashboard, label: "لوحة التحكم" },
  { href: "/dashboard/products",  icon: Package,         label: "المنتجات" },
  { href: "/dashboard/orders",    icon: ShoppingCart,    label: "الطلبات" },
  { href: "/dashboard/customers", icon: Users,           label: "العملاء" },
  { href: "/dashboard/settings",  icon: Settings,        label: "الإعدادات" },
];

interface DashboardSidebarProps {
  storeName: string;
  storeSlug: string;
}

export function DashboardSidebar({ storeName, storeSlug }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0B1220] flex flex-col fixed right-0 top-0 z-40 border-l border-white/5" dir="rtl">
      {/* Logo */}
      <div className="p-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/40">
            <svg viewBox="0 0 100 100" className="w-5 h-5">
              <path d="M24 26 C24 50,27 70,36 70 C43 70,45.5 58,47.5 51 C49.5 58,52 70,59 70 C68 70,71 50,71 26"
                fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="47.5" cy="51" r="5.5" fill="#22C55E"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-none mb-1">وجود</p>
            <p className="text-gray-400 text-xs truncate">{storeName}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-[#1E40AF] text-white shadow-lg shadow-blue-900/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}>
              <Icon size={17} className="flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/8 space-y-0.5">
        <Link
          href={`/store/${storeSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
          <ExternalLink size={17} className="flex-shrink-0" />
          معاينة المتجر
        </Link>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut size={17} className="flex-shrink-0" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
