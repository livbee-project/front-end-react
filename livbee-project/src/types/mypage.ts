import type React from 'react';
import type { UserType } from '@/domain/entities/User';

/**
 * 마이페이지 관련 타입 정의
 */

export interface MenuItemData {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  description: string;
  count?: number;
  onClick: () => void;
}

export interface ProfileStat {
  label: string;
  value: number;
  unit?: string;
  format?: 'count' | 'rating' | 'compact';
}

export interface ProfileData {
  name: string;
  role: string;
  badges: string[];
  contact?: string;
  stats: ProfileStat[];
}

