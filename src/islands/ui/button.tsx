import { forwardRef, type ButtonHTMLAttributes } from "react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { cn } from "~/core/utils";

export const buttonVariants = cva(
  "inline-flex justify-center items-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/80 hover:text-white dark:hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:text-white dark:hover:text-white",
        outline:
          "border border-input bg-background shadow-sm hover:bg-background/70",
        secondary:
          "bg-card shadow-sm hover:bg-secondary/80 border border-slate-200 dark:border-slate-600 hover:text-accent dark:hover:text-white",
        ghost: "hover:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline hover:text-white dark:hover:text-white",
        tertiary:
          "text-black dark:text-white bg-transparent py-2 px-4 disabled:opacity-25 hover:text-white dark:hover:text-white",
        danger:
          "border border-red-500 hover:bg-red-500 transition-colors hover:text-white dark:hover:text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
      brightness: {
        dim: "",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {props.children}{" "}
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };
