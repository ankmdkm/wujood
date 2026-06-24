import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    title: "متجر احترافي",
    desc: "صفحة متجر جاهزة فوراً قابلة للمشاركة مع تصميم نظيف ومحترف",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-9 5.25-9-5.25v-2.25m18 0l-9 5.25m-9-5.25l9 5.25" />
      </svg>
    ),
    title: "إدارة المخزون",
    desc: "تتبع كميات منتجاتك تلقائياً — لا مخزون يفوتك ولا طلب يُخيّب",
    color: "from-cyan-500/10 to-cyan-600/5",
    border: "border-cyan-500/20",
    iconBg: "bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "إدارة الطلبات",
    desc: "تابع كل طلب من الاستلام حتى التسليم في لوحة واحدة واضحة",
    color: "from-green-500/10 to-green-600/5",
    border: "border-green-500/20",
    iconBg: "bg-green-500/10 text-green-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "إشعارات واتساب",
    desc: "لحظة ما يجي طلب جديد — بتعرف فوراً على واتساب بدون ما تفتح التطبيق",
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "تقارير الأرباح",
    desc: "شوف صافي ربحك الحقيقي من كل منتج وكل مبيعة — أرقام واضحة بلا تعقيد",
    color: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/10 text-violet-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "فواتير PDF",
    desc: "أنشئ وشارك فواتير احترافية مع عملائك بضغطة زر واحدة",
    color: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-500/20",
    iconBg: "bg-orange-500/10 text-orange-400",
  },
];

const stats = [
  { value: "٥", unit: "دقائق", label: "لإنشاء متجرك الأول" },
  { value: "صفر", unit: "رسوم", label: "للبدء مجاناً" },
  { value: "٢٤", unit: "/٧", label: "إشعارات فورية" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white" dir="rtl">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B1220]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
              <svg viewBox="0 0 100 100" className="w-5 h-5">
                <path d="M24 26 C24 50,27 70,36 70 C43 70,45.5 58,47.5 51 C49.5 58,52 70,59 70 C68 70,71 50,71 26"
                  fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="47.5" cy="51" r="5.5" fill="#22C55E" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">وجود</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="#pricing"
              className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors hidden sm:block">
              الأسعار
            </Link>
            <Link href="/login"
              className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors">
              تسجيل الدخول
            </Link>
            <Link href="/signup"
              className="text-sm bg-[#1E40AF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-900/30">
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-radial from-[#1E40AF]/20 via-[#06B6D4]/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-sm px-4 py-1.5 rounded-full mb-10 text-gray-300 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
            متاح الآن للتجار السوريين والعرب
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            <span className="text-white">متجرك الإلكتروني</span>
            <br />
            <span className="bg-gradient-to-l from-[#06B6D4] to-[#1E40AF] bg-clip-text text-transparent">
              في دقائق — مش أيام
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            وجود منصة تجارة إلكترونية متكاملة مصممة للتاجر العربي. أنشئ متجرك، أدر طلباتك، وتابع أرباحك — كل شي بمكان واحد.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup"
              className="w-full sm:w-auto bg-gradient-to-l from-[#1E40AF] to-[#2563EB] hover:from-[#1d39a0] hover:to-[#1d4ed8] text-white px-9 py-4 rounded-2xl text-base font-bold transition-all shadow-xl shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5">
              ابدأ مجاناً الآن ←
            </Link>
            <Link href="#features"
              className="w-full sm:w-auto text-gray-300 hover:text-white px-7 py-4 rounded-2xl text-base font-medium border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm">
              اعرف أكثر
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-14 grid grid-cols-3 gap-8 text-center">
          {stats.map(({ value, unit, label }) => (
            <div key={label}>
              <p className="text-4xl font-extrabold tracking-tight mb-1">
                <span className="bg-gradient-to-l from-[#06B6D4] to-white bg-clip-text text-transparent">
                  {value}
                </span>
                <span className="text-[#22C55E] text-2xl ml-1">{unit}</span>
              </p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">المميزات</p>
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            كل شي تحتاجه لتنمية مبيعاتك
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            منصة متكاملة مصممة خصيصاً للسوق العربي — بساطة في الاستخدام، قوة في الأداء
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc, color, border, iconBg }) => (
            <div
              key={title}
              className={`relative group rounded-2xl p-6 border ${border} bg-gradient-to-br ${color} backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-1`}>
              <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-5`}>
                {icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#22C55E] text-sm font-semibold uppercase tracking-widest mb-3">كيف تبدأ</p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">ثلاث خطوات وخلصت</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "١", title: "أنشئ حسابك", desc: "سجّل بإيميلك في أقل من دقيقة — بدون بطاقة ائتمان" },
              { step: "٢", title: "أضف منتجاتك", desc: "حمّل صور منتجاتك، حدد الأسعار والكميات، وانتهيت" },
              { step: "٣", title: "شارك متجرك", desc: "انسخ رابط متجرك وشاركه على واتساب وإنستغرام مباشرة" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] flex items-center justify-center text-2xl font-black mx-auto mb-5 shadow-lg shadow-blue-900/40">
                  {step}
                </div>
                <h3 className="font-bold text-white text-xl mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">الأسعار</p>
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">بسيط وشفاف — بلا مفاجآت</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">ابدأ مجاناً، وارقَّ مع نمو مبيعاتك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">مجاني</h3>
              <p className="text-gray-500 text-sm">للبدء وتجربة المنصة</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$0</span>
              <span className="text-gray-500 text-sm mr-2">/ للأبد</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "متجر واحد",
                "٢٠ منتج كحد أقصى",
                "إدارة الطلبات الأساسية",
                "رابط متجر قابل للمشاركة",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-4 h-4 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                  {f}
                </li>
              ))}
              {["تقارير الأرباح", "إشعارات واتساب"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-xs text-gray-600">✕</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup"
              className="block text-center py-3 rounded-xl border border-white/15 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all">
              ابدأ مجاناً
            </Link>
          </div>

          {/* Growth — highlighted */}
          <div className="relative rounded-2xl border border-[#1E40AF]/60 bg-gradient-to-b from-[#1E40AF]/20 via-[#0B1220] to-[#06B6D4]/10 p-8 flex flex-col shadow-2xl shadow-blue-900/30 -mt-4 md:-mt-6">
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-l from-[#1E40AF] to-[#06B6D4] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                الأشهر ⭐
              </span>
            </div>

            <div className="mb-6 mt-2">
              <h3 className="text-lg font-bold text-white mb-1">النمو</h3>
              <p className="text-gray-400 text-sm">للتجار الجادين في التوسع</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$9</span>
              <span className="text-gray-400 text-sm mr-2">/ شهر</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "متجر واحد",
                "منتجات غير محدودة",
                "إدارة الطلبات الكاملة",
                "رابط متجر قابل للمشاركة",
                "تقارير الأرباح",
                "إشعارات واتساب",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-200">
                  <span className="w-4 h-4 rounded-full bg-[#06B6D4]/20 text-[#06B6D4] flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup"
              className="block text-center py-3 rounded-xl bg-gradient-to-l from-[#1E40AF] to-[#2563EB] hover:from-[#1d39a0] hover:to-[#1d4ed8] text-white text-sm font-bold transition-all shadow-lg shadow-blue-900/40 hover:-translate-y-0.5">
              ابدأ تجربتك المجانية
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/5 to-transparent p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">الاحترافي</h3>
              <p className="text-gray-500 text-sm">للأعمال الكبيرة والمحترفين</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$19</span>
              <span className="text-gray-500 text-sm mr-2">/ شهر</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "كل مميزات خطة النمو",
                "دعم أولوية على مدار الساعة",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-4 h-4 rounded-full bg-violet-500/15 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-sm text-violet-300">
                <span className="w-4 h-4 rounded-full bg-violet-500/15 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs">✦</span>
                <span>أدوات الذكاء الاصطناعي <span className="text-xs text-violet-400 bg-violet-500/15 px-1.5 py-0.5 rounded-md mr-1">قريباً</span></span>
              </li>
            </ul>
            <Link href="/signup"
              className="block text-center py-3 rounded-xl border border-violet-500/30 text-sm font-semibold text-violet-300 hover:bg-violet-500/10 hover:text-white transition-all">
              ابدأ الآن
            </Link>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-6 py-28 text-center">
        <div className="relative rounded-3xl border border-[#1E40AF]/30 bg-gradient-to-br from-[#1E40AF]/20 via-[#0B1220] to-[#06B6D4]/10 p-16 overflow-hidden">
          {/* glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1E40AF]/20 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-900/40">
              <svg viewBox="0 0 100 100" className="w-9 h-9">
                <path d="M24 26 C24 50,27 70,36 70 C43 70,45.5 58,47.5 51 C49.5 58,52 70,59 70 C68 70,71 50,71 26"
                  fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="47.5" cy="51" r="5.5" fill="#22C55E" />
              </svg>
            </div>

            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">جاهز تبدأ تبيع؟</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              انضم لأول التجار على منصة وجود — مجاناً، بلا شروط، بلا بطاقة ائتمان
            </p>

            <Link href="/signup"
              className="inline-block bg-white hover:bg-gray-100 text-[#1E40AF] px-12 py-4 rounded-2xl text-base font-extrabold transition-all hover:-translate-y-0.5 shadow-xl">
              أنشئ متجرك مجاناً ←
            </Link>

            <p className="text-gray-500 text-sm mt-6">لا حاجة لبطاقة ائتمان · مجاني ١٠٠٪</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#1E40AF] to-[#06B6D4] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-4 h-4">
                <path d="M24 26 C24 50,27 70,36 70 C43 70,45.5 58,47.5 51 C49.5 58,52 70,59 70 C68 70,71 50,71 26"
                  fill="none" stroke="white" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="47.5" cy="51" r="5.5" fill="#22C55E" />
              </svg>
            </div>
            <span className="font-bold text-white">وجود</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 وجود — جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-gray-300 transition-colors">تسجيل الدخول</Link>
            <Link href="/signup" className="hover:text-gray-300 transition-colors">إنشاء حساب</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
