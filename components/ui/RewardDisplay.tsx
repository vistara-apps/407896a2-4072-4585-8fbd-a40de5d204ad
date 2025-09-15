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
      'bg-surface rounded-lg p-6 text-center card-shadow card-hover border border-border',
      className
    )}>
      {label && (
        <div className="text-sm text-textMuted mb-3 font-medium">
          {label}
        </div>
      )}

      <div className="flex items-center justify-center space-x-2">
        {variant === 'token' && (
          <>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
              B
            </div>
            <div className="text-3xl font-bold text-accent">
              {formatTokenAmount(amount)}
            </div>
            <div className="text-sm text-textMuted font-medium">
              {token}
            </div>
          </>
        )}

        {variant === 'fiat' && (
          <>
            <div className="text-sm text-textMuted mr-2">$</div>
            <div className="text-3xl font-bold text-accent">
              {formatCurrency(amount, currency).replace('$', '')}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
