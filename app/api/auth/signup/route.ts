import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // confirmed immediately — no email sent
  });

  if (error) {
    const msgs: Record<string, string> = {
      "User already registered": "هذا البريد الإلكتروني مسجل مسبقاً — سجل دخولك",
      "Email rate limit exceeded": "حاولت كثيراً، انتظر قليلاً ثم أعد المحاولة",
      "Invalid email": "البريد الإلكتروني غير صحيح",
      "Password should be at least 6 characters": "كلمة المرور قصيرة جداً (٦ أحرف على الأقل)",
    };
    return NextResponse.json(
      { error: msgs[error.message] ?? `حدث خطأ: ${error.message}` },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, userId: data.user.id });
}
