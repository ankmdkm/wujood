import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full px-3 py-2.5 text-sm border rounded-lg bg-white text-gray-900 placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition",
          error ? "border-red-400" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
);
Input.displayName = "Input";
export { Input };
