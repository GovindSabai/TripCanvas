import React from 'react';
import { cn } from './Button';

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-stone/50 bg-transparent px-3 py-2 text-sm text-charcoal placeholder:text-stone/80 focus:outline-none focus:ring-2 focus:ring-bronze focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
