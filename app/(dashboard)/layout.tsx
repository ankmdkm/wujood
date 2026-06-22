import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: store } = await supabase
    .from("stores")
    .select("name, slug")
    .eq("owner_id", user.id)
    .single();

  // User confirmed email but hasn't created a store yet
  if (!store) redirect("/setup");

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <DashboardSidebar storeName={store.name} storeSlug={store.slug} />
      <main className="mr-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
