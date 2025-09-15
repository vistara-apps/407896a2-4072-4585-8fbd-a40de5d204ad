'use client';

import { cn } from '../../lib/utils';

interface ConsentToggleProps {
  variant: 'on' | 'off';
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
}

export function ConsentToggle({ 
  variant, 
  enabled, 
  onChange,
  className 
}: ConsentToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg',
        enabled ? 'bg-accent' : 'bg-gray-600',
        className
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}
