'use client';

import { cn } from '../../lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
}

export function AppShell({ 
  children, 
  variant = 'default',
  className 
}: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen w-full',
      variant === 'glass' && 'glass-effect',
      className
    )}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
