import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وجود — منصة التجارة الإلكترونية العربية",
  description: "أنشئ متجرك الإلكتروني في دقائق. وجود منصة تجارة إلكترونية متكاملة للتجار العرب.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
