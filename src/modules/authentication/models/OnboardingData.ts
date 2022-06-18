export interface Onboarding {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  address: string;
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

export interface PersonalData {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  avatar?: AvatarData;
}
