export interface OnboardingData {
  firstName: string | null;
  lastName: string | null;
  photoUrl?: string;
  avatar?: AvatarData;
  address: string | null;
  country?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
}

export interface AvatarData {
  skinTone: string;
  eyes: string;
  eyebrows: string;
  mouth: string;
  hair: string;
  facialHair: string;
  clothing: string;
  accessory: string;
  graphic: string;
  hat: string;
  body: string;
  hairColor: string;
  clothingColor: string;
  circleColor: string;
  lipColor: string;
  hatColor: string;
  faceMaskColor: string;
  mask: boolean;
  faceMask: boolean;
  lashes: boolean;
}
