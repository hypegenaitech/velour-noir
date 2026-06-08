import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'rose' | 'muted';
  className?: string;
}

export default function Badge({ children, variant = 'gold', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-jost text-[10px] uppercase tracking-widest px-2 py-1',
        variant === 'gold' && 'bg-gold text-black',
        variant === 'rose' && 'bg-rose text-white',
        variant === 'muted' && 'border border-muted text-muted',
        className
      )}
    >
      {children}
    </span>
  );
}
