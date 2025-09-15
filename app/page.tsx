'use client';

import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { ProfileHeader } from '../components/ui/ProfileHeader';
import { DataCard } from '../components/ui/DataCard';
import { RewardDisplay } from '../components/ui/RewardDisplay';
import { ConsentToggle } from '../components/ui/ConsentToggle';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useMiniKit } from '@coinbase/minikit';

export default function HomePage() {
  const { user } = useMiniKit();
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockUserData = {
    userId: '1',
    address: user?.address || '0x1234...5678',
    profileData: {
      name: user?.displayName || 'BytePlus User',
      avatar: user?.pfpUrl || '/api/placeholder/40/40',
    },
    tokenBalance: 1250.75,
    reputationScore: 85,
  };

  const mockCampaigns = [
    {
      campaignId: '1',
      title: 'Consumer Electronics Survey',
      description: 'Share your purchase history for tech products',
      requiredDataAttributes: ['purchase_history', 'preferences'],
      rewardStructure: { amount: 50, token: 'BYTE' },
      status: 'active',
      progress: 75,
    },
    {
      campaignId: '2',
      title: 'Fitness & Wellness Research',
      description: 'Help improve health apps with your activity data',
      requiredDataAttributes: ['activity_data', 'health_metrics'],
      rewardStructure: { amount: 75, token: 'BYTE' },
      status: 'active',
      progress: 45,
    },
  ];

  return (
    <AppShell>
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-surface">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <ProfileHeader
              user={mockUserData}
              variant="withAvatarAndReputation"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex space-x-1 bg-surface rounded-lg p-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'campaigns', label: 'Campaigns', icon: '🎯' },
              { id: 'data', label: 'My Data', icon: '🔒' },
              { id: 'community', label: 'Community', icon: '👥' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-surface'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Rewards Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RewardDisplay
                  variant="token"
                  amount={mockUserData.tokenBalance}
                  token="BYTE"
                  label="Total Earned"
                />
                <RewardDisplay
                  variant="fiat"
                  amount={187.61}
                  currency="USD"
                  label="Estimated Value"
                />
              </div>

              {/* Fascinating Facts */}
              <div className="bg-surface rounded-lg p-6 card-shadow">
                <h3 className="text-xl font-semibold mb-4">Fascinating Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">13</div>
                    <div className="text-sm text-textSecondary">Data points shared</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">185</div>
                    <div className="text-sm text-textSecondary">Community members</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-surface rounded-lg p-6 card-shadow">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-bg rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm">
                        🛍️
                      </div>
                      <div>
                        <div className="font-medium">Purchase data shared</div>
                        <div className="text-sm text-textSecondary">2 hours ago</div>
                      </div>
                    </div>
                    <div className="text-accent font-medium">+25 BYTE</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm">
                        📊
                      </div>
                      <div>
                        <div className="font-medium">Survey completed</div>
                        <div className="text-sm text-textSecondary">1 day ago</div>
                      </div>
                    </div>
                    <div className="text-accent font-medium">+50 BYTE</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Available Campaigns</h2>
                <div className="text-sm text-textSecondary">
                  {mockCampaigns.length} active campaigns
                </div>
              </div>
              
              <div className="grid gap-6">
                {mockCampaigns.map((campaign) => (
                  <DataCard
                    key={campaign.campaignId}
                    variant="campaignOffer"
                    campaign={campaign}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Data Consent Management</h2>
              
              <div className="bg-surface rounded-lg p-6 card-shadow">
                <h3 className="text-lg font-medium mb-4">Your Data Categories</h3>
                <div className="space-y-4">
                  {[
                    { category: 'Purchase History', enabled: true, description: 'Your shopping patterns and preferences' },
                    { category: 'Location Data', enabled: false, description: 'Places you visit and travel patterns' },
                    { category: 'Social Activity', enabled: true, description: 'Your social media interactions' },
                    { category: 'Health Metrics', enabled: false, description: 'Fitness and wellness data' },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-4 bg-bg rounded-md">
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-textSecondary">{item.description}</div>
                      </div>
                      <ConsentToggle
                        variant={item.enabled ? 'on' : 'off'}
                        enabled={item.enabled}
                        onChange={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Community</h2>
              
              <div className="bg-surface rounded-lg p-6 card-shadow">
                <h3 className="text-lg font-medium mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: 'DataMaster', score: 2450, avatar: '👑' },
                    { name: 'PrivacyPro', score: 1890, avatar: '🔒' },
                    { name: 'ByteCollector', score: 1650, avatar: '💎' },
                  ].map((user, index) => (
                    <div key={user.name} className="flex items-center justify-between p-3 bg-bg rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-textSecondary">Rank #{index + 1}</div>
                        </div>
                      </div>
                      <div className="text-accent font-medium">{user.score} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
