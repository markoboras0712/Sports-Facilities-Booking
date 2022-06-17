export interface Onboarding {
  address: string;
  country?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  photoUrl?: string;
}
