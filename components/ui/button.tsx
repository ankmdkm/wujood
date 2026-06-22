import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary:   "bg-[#1E40AF] text-white hover:bg-blue-800 focus:ring-blue-500",
      secondary: "bg-[#06B6D4] text-white hover:bg-cyan-600 focus:ring-cyan-400",
      outline:   "border-2 border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 focus:ring-blue-500",
      ghost:     "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
      danger:    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };
    const sizes = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
        {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
