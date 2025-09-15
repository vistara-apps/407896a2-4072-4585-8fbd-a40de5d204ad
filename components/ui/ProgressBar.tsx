'use client';

import { cn } from '../../lib/utils';

interface ProgressBarProps {
  variant: 'campaignProgress';
  progress: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ 
  variant, 
  progress, 
  label,
  className 
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-textSecondary">{label}</span>
          <span className="text-sm font-medium text-textPrimary">
            {clampedProgress}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-bg rounded-full h-2">
        <div 
          className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
