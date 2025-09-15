'use client';

import { User } from '../../lib/types';
import { truncateAddress, calculateReputationLevel, getReputationColor } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { Star, Crown } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  variant?: 'withAvatarAndReputation';
  className?: string;
}

export function ProfileHeader({ 
  user, 
  variant = 'withAvatarAndReputation',
  className 
}: ProfileHeaderProps) {
  const reputationLevel = calculateReputationLevel(user.reputationScore);
  const reputationColor = getReputationColor(user.reputationScore);

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user.profileData.avatar ? (
              <img 
                src={user.profileData.avatar} 
                alt={user.profileData.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.profileData.name.charAt(0).toUpperCase()
            )}
          </div>
          {variant === 'withAvatarAndReputation' && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-bg">
              <Star size={12} className="text-white fill-current" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-textPrimary">
              {user.profileData.name}
            </h1>
            {variant === 'withAvatarAndReputation' && (
              <div className="flex items-center space-x-1">
                {reputationLevel === 'Elite' && <Crown size={14} className="text-warning" />}
                <span className={cn('text-sm font-medium', reputationColor)}>
                  {reputationLevel}
                </span>
              </div>
            )}
          </div>
          <div className="text-sm text-textSecondary">
            {truncateAddress(user.address)}
          </div>
        </div>
      </div>

      {/* Reputation Score */}
      {variant === 'withAvatarAndReputation' && (
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">
            {user.reputationScore}
          </div>
          <div className="text-xs text-textSecondary">
            Reputation
          </div>
        </div>
      )}
    </div>
  );
}
