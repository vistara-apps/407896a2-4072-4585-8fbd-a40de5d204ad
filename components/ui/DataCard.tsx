'use client';

import { Campaign } from '../../lib/types';
import { ProgressBar } from './ProgressBar';
import { RewardDisplay } from './RewardDisplay';
import { cn } from '../../lib/utils';

interface DataCardProps {
  variant: 'consentView' | 'campaignOffer';
  campaign?: Campaign;
  className?: string;
}

export function DataCard({ 
  variant, 
  campaign,
  className 
}: DataCardProps) {
  if (variant === 'campaignOffer' && campaign) {
    return (
      <div className={cn(
        'bg-surface rounded-lg p-6 card-shadow card-hover border border-border',
        className
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-textPrimary mb-2">
              {campaign.title}
            </h3>
            <p className="text-textSecondary text-sm mb-3">
              {campaign.description}
            </p>
            
            {/* Required Data */}
            <div className="flex flex-wrap gap-2 mb-4">
              {campaign.requiredDataAttributes.map((attr) => (
                <span 
                  key={attr}
                  className="px-2 py-1 bg-bg rounded text-xs text-textSecondary"
                >
                  {attr.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
          
          {/* Reward */}
          <div className="ml-4">
            <RewardDisplay
              variant="token"
              amount={campaign.rewardStructure.amount}
              token={campaign.rewardStructure.token}
              label="Reward"
            />
          </div>
        </div>

        {/* Progress */}
        {campaign.progress !== undefined && (
          <div className="mb-4">
            <ProgressBar
              variant="campaignProgress"
              progress={campaign.progress}
              label={`${campaign.progress}% complete`}
            />
          </div>
        )}

        {/* Action Button */}
        <button className="w-full btn-primary">
          Join Campaign
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-surface rounded-lg p-6 card-shadow',
      className
    )}>
      <div className="text-center text-textSecondary">
        Data card variant not implemented
      </div>
    </div>
  );
}
