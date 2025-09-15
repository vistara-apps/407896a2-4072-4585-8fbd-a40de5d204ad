'use client';

import { formatTokenAmount, formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface RewardDisplayProps {
  variant: 'token' | 'fiat';
  amount: number;
  token?: string;
  currency?: string;
  label?: string;
  className?: string;
}

export function RewardDisplay({ 
  variant, 
  amount, 
  token = 'BYTE',
  currency = 'USD',
  label,
  className 
}: RewardDisplayProps) {
  return (
    <div className={cn(
      'bg-surface rounded-lg p-4 text-center',
      className
    )}>
      {label && (
        <div className="text-sm text-textSecondary mb-2">
          {label}
        </div>
      )}
      
      <div className="flex items-center justify-center space-x-2">
        {variant === 'token' && (
          <>
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
            <div className="text-2xl font-bold text-accent">
              {formatTokenAmount(amount)}
            </div>
            <div className="text-sm text-textSecondary">
              {token}
            </div>
          </>
        )}
        
        {variant === 'fiat' && (
          <>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(amount, currency)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
