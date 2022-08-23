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
  startWorkingHour: Date | null;
  /**
   * Hour of the closing of the facility
   */
  endWorkingHour: Date | null;
  /**
   * Capacity of the facility
   */
  capacity: number;
  /**
   * Price of the facility
   */
  price: number;
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
  postalCode?: string;
  /**
   * Country of the facility
   */
  country: string;
  /**
   * Phone number of the facility
   */
  phone?: string;
  /**
   * Email of the facility
   */
  email?: string;
  /**
   * Website of the facility
   */
  website?: string;
}

export class Facility {
  constructor(data: Facility) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.facilityName = data.facilityName;
    this.sportType = data.sportType;
    this.image = data.image || undefined;
    this.startWorkingHour = data.startWorkingHour;
    this.endWorkingHour = data.endWorkingHour;
    this.capacity = data.capacity;
    this.price = data.price;
    this.description = data.description || undefined;
    this.address = data.address;
    this.city = data.city;
    this.postalCode = data.postalCode || undefined;
    this.country = data.country;
    this.phone = data.phone || undefined;
    this.email = data.email || undefined;
    this.website = data.website || undefined;
  }
}
