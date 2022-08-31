import { AvatarData } from './AvatarData';

export interface OnboardingData {
  firstName: string | null;
  lastName: string | null;
  avatar?: AvatarData;
  address: string | null;
  country?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  isOnboardingInProgress: boolean;
  activeChats: string[] | null;
}

export class OnboardingData {
  constructor(data: OnboardingData) {
    this.firstName = data.firstName || null;
    this.lastName = data.lastName || null;
    this.avatar = data.avatar || undefined;
    this.address = data.address || null;
    this.country = data.country || undefined;
    this.city = data.city || undefined;
    this.postalCode = data.postalCode || undefined;
    this.phone = data.phone || undefined;
    this.isOnboardingInProgress = data.isOnboardingInProgress || false;
    this.activeChats = data.activeChats || [];
  }
}
