'use client';

import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { ProfileHeader } from '../components/ui/ProfileHeader';
import { DataCard } from '../components/ui/DataCard';
import { RewardDisplay } from '../components/ui/RewardDisplay';
import { ConsentToggle } from '../components/ui/ConsentToggle';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useMiniKit } from '@coinbase/minikit';
import { BarChart3, Target, Shield, Users, ShoppingCart, TrendingUp } from 'lucide-react';

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
        <div className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <ProfileHeader
              user={mockUserData}
              variant="withAvatarAndReputation"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex space-x-1 bg-surface rounded-lg p-1 border border-border overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'campaigns', label: 'Campaigns', icon: Target },
              { id: 'data', label: 'My Data', icon: Shield },
              { id: 'community', label: 'Community', icon: Users },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-surface-hover'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Rewards Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
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
              <div className="bg-surface rounded-lg p-6 card-shadow border border-border animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 text-textPrimary">Fascinating Facts</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-bg rounded-lg border border-border">
                    <div className="text-3xl font-bold text-accent mb-1">13</div>
                    <div className="text-sm text-textMuted">Data points shared</div>
                  </div>
                  <div className="text-center p-4 bg-bg rounded-lg border border-border">
                    <div className="text-3xl font-bold text-accent mb-1">185</div>
                    <div className="text-sm text-textMuted">Community members</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-surface rounded-lg p-6 card-shadow border border-border animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 text-textPrimary">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:bg-surface-hover transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <ShoppingCart size={20} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-textPrimary">Purchase data shared</div>
                        <div className="text-sm text-textMuted">2 hours ago</div>
                      </div>
                    </div>
                    <div className="text-success font-semibold">+25 BYTE</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:bg-surface-hover transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <BarChart3 size={20} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-textPrimary">Survey completed</div>
                        <div className="text-sm text-textMuted">1 day ago</div>
                      </div>
                    </div>
                    <div className="text-success font-semibold">+50 BYTE</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-textPrimary">Available Campaigns</h2>
                  <p className="text-textMuted mt-1">Earn rewards by sharing your data with trusted partners</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">{mockCampaigns.length}</div>
                  <div className="text-sm text-textMuted">active campaigns</div>
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
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-textPrimary">Data Consent Management</h2>
                <p className="text-textMuted mt-1">Control what data you share and earn rewards securely</p>
              </div>

              <div className="bg-surface rounded-lg p-8 card-shadow border border-border">
                <h3 className="text-xl font-semibold mb-6 text-textPrimary">Your Data Categories</h3>
                <div className="space-y-4">
                  {[
                    { category: 'Purchase History', enabled: true, description: 'Your shopping patterns and preferences', icon: ShoppingCart },
                    { category: 'Location Data', enabled: false, description: 'Places you visit and travel patterns', icon: Target },
                    { category: 'Social Activity', enabled: true, description: 'Your social media interactions', icon: Users },
                    { category: 'Health Metrics', enabled: false, description: 'Fitness and wellness data', icon: TrendingUp },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.category} className="flex items-center justify-between p-5 bg-bg rounded-lg border border-border hover:bg-surface-hover transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                            <IconComponent size={24} className="text-accent" />
                          </div>
                          <div>
                            <div className="font-semibold text-textPrimary">{item.category}</div>
                            <div className="text-sm text-textMuted">{item.description}</div>
                          </div>
                        </div>
                        <ConsentToggle
                          variant={item.enabled ? 'on' : 'off'}
                          enabled={item.enabled}
                          onChange={() => {}}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-textPrimary">Community</h2>
                <p className="text-textMuted mt-1">Connect with fellow data contributors and build your reputation</p>
              </div>

              <div className="bg-surface rounded-lg p-8 card-shadow border border-border">
                <h3 className="text-xl font-semibold mb-6 text-textPrimary">Top Contributors</h3>
                <div className="space-y-4">
                  {[
                    { name: 'DataMaster', score: 2450, avatar: Crown, color: 'text-warning' },
                    { name: 'PrivacyPro', score: 1890, avatar: Shield, color: 'text-accent' },
                    { name: 'ByteCollector', score: 1650, avatar: Star, color: 'text-success' },
                  ].map((user, index) => {
                    const IconComponent = user.avatar;
                    return (
                      <div key={user.name} className="flex items-center justify-between p-4 bg-bg rounded-lg border border-border hover:bg-surface-hover transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                            <IconComponent size={24} className={user.color} />
                          </div>
                          <div>
                            <div className="font-semibold text-textPrimary">{user.name}</div>
                            <div className="text-sm text-textMuted">Rank #{index + 1}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-accent">{user.score.toLocaleString()}</div>
                          <div className="text-xs text-textMuted">points</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
