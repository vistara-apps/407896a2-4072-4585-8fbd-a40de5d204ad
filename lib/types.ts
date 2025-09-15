export interface User {
  userId: string;
  address: string;
  profileData: {
    name: string;
    avatar?: string;
  };
  dataConsentSettings?: Record<string, boolean>;
  tokenBalance: number;
  reputationScore: number;
}

export interface DataPermission {
  permissionId: string;
  userId: string;
  dataType: string;
  dataConsumer: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'expired' | 'revoked';
}

export interface DataShare {
  shareId: string;
  userId: string;
  dataType: string;
  dataConsumer: string;
  timestamp: Date;
  rewardEarned: number;
}

export interface Campaign {
  campaignId: string;
  requesterId: string;
  title: string;
  description: string;
  requiredDataAttributes: string[];
  rewardStructure: {
    amount: number;
    token: string;
  };
  status: 'active' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
  progress?: number;
}

export interface DataConsumer {
  consumerId: string;
  name: string;
  type: 'brand' | 'researcher' | 'institution';
  contactInfo: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
