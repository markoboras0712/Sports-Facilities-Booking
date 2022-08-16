export interface Facility {
  /**
   * The id of the facility
   */
  id: string;
  /**
   * Unique identifier for the user who created the facility
   */
  creatorId: string;
  /**
   * Date of the creation of the facility
   */
  createdAt: string;
  /**
   * Date of the last update of the facility
   */
  updatedAt: string;
  /**
   *  Name of the facility
   */
  facilityName: string;
  /**
   * The type of the facility
   */
  sportType: SportType;
  /**
   * Image url of the facility
   */
  image?: string;
  /**
   * Hour of the opening of the facility
   */
  startWorkingHour: string;
  /**
   * Hour of the closing of the facility
   */
  endWorkingHour: string;
  /**
   * Capacity of the facility
   */
  capacity: number;
  /**
   * Price of the facility
   */
  price: number | 'free';
  /**
   * Description of the facility
   */
  description?: string;
  /**
   * Address of the facility
   */
  address: string;
  /**
   * City of the facility
   */
  city: string;
  /**
   * Zip code of the facility
   */
  zip?: string;
  /**
   * Country of the facility
   */
  country: string;
  /**
   * Phone number of the facility
   */
  phone: string;
  /**
   * Email of the facility
   */
  email?: string;
  /**
   * Website of the facility
   */
  website?: string;
}

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
