import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'bg-deep border border-gold/40 text-platinum placeholder-gold/50',
        'px-4 h-12 w-full font-jost text-sm',
        'focus:outline-none focus:border-gold transition-colors',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
export default Input;
