import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/database";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  new:       { label: "جديد",        className: "bg-gray-100 text-gray-700" },
  confirmed: { label: "مؤكد",        className: "bg-blue-100 text-blue-700" },
  shipped:   { label: "تم الشحن",    className: "bg-cyan-100 text-cyan-700" },
  delivered: { label: "تم التسليم",  className: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي",        className: "bg-red-100 text-red-700" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", className)}>
      {label}
    </span>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700", className)}>
      {children}
    </span>
  );
}
