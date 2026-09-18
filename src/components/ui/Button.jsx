import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  asChild,
  children,
  ...props
}, ref) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze disabled:opacity-50 disabled:pointer-events-none rounded-md";
  
  const variants = {
    primary: "bg-charcoal text-ivory hover:bg-ink",
    secondary: "bg-sand text-charcoal hover:bg-stone/30",
    ghost: "bg-transparent text-charcoal hover:bg-sand/50",
  };

  const sizes = {
    sm: "h-9 px-4 text-small",
    md: "h-11 px-6 text-body",
    lg: "h-14 px-8 text-body",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
