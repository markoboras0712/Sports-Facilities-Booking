type SportType =
  | 'basketball'
  | 'football'
  | 'volleyball'
  | 'handball'
  | 'swimming'
  | 'gym'
  | 'running'
  | 'tennis'
  | 'badminton'
  | 'squash'
  | 'multisport'
  | 'other';

interface GetAvailableFacilities {
  userUid: string;
}
