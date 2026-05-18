import type {ApprovalStatus} from '../constants/status';

export const USER_ROLE = {
  DRIVER: 'DRIVER',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface User {
  id: string;
  nickname: string;
  role: UserRole;
  createdAt: string;  // ISO 8601
}

export interface ProviderProfile {
  userId: string;
  businessName?: string;
  approvalStatus: ApprovalStatus;
  registeredAt: string;
}
