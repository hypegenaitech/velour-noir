import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-jost uppercase tracking-widest transition-all duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed select-none',
          variant === 'gold' && 'bg-gold text-black hover:bg-gold-light active:scale-95',
          variant === 'outline' && 'border border-gold text-gold hover:bg-gold hover:text-black',
          variant === 'ghost' && 'text-gold hover:text-gold-light underline-offset-4 hover:underline',
          size === 'sm' && 'text-[10px] px-4 h-9',
          size === 'md' && 'text-[11px] px-6 h-12',
          size === 'lg' && 'text-[13px] px-8 h-14',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;

// Reusable link-styled button classes
export const btnGold = 'inline-flex items-center justify-center font-jost uppercase tracking-widest bg-gold text-black hover:bg-gold-light transition-colors text-[13px] px-8 h-14 select-none';
export const btnOutline = 'inline-flex items-center justify-center font-jost uppercase tracking-widest border border-gold text-gold hover:bg-gold hover:text-black transition-colors text-[13px] px-8 h-14 select-none';
