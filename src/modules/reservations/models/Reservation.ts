export interface Reservation {
  /**
   * The id of the reservation
   */
  id: string;
  /**
   * The id of notification which gets faciltiy owner
   */
  notificationId?: string;
  /**
   * Unique identifier for the user who created the facility
   */
  creatorId: string;
  /**
   * Unique identifier for the user who is creating the reservation
   */
  reservationCreatorId?: string;
  /**
   * Unique identifier of facility on which user is making reservation
   */
  facilityId: string;
  /**
   * Unique identifier of reservation
   */
  reservationId: string;
  /**
   * Hour of the start of the reservation
   */
  startTime: Date | null;
  /**
   * Hour of the end of the reservation
   */
  endTime: Date | null;
  /**
   * Date of the creation of the reservation
   */
  createdAt: Date | null;
  /**
   * Type of reservation
   */
  type: ReservationType;
  /**
   * Image urls of the facility
   */
  imageUrls?: string[];
  /**
   * Address of the facility
   */
  address: string;
  /**
   * Capacity of the facility
   */
  capacity: number;
  /**
   * Country of the facility
   */
  country: string;
  /**
   * The type of the facility
   */
  sportType: SportType;
  /**
   *  Name of the facility
   */
  facilityName: string;
}

export class Reservation {
  constructor(data: Reservation) {
    this.id = data.id;
    this.notificationId = data.notificationId;
    this.creatorId = data.creatorId;
    this.createdAt = data.createdAt;
    this.reservationCreatorId = data.reservationCreatorId;
    this.facilityId = data.facilityId;
    this.startTime = data.startTime || new Date();
    this.endTime = data.endTime || new Date();
    this.type = data.type || 'pending';
    this.id = data.id;
    this.reservationId = data.reservationId;
    this.creatorId = data.creatorId;
    this.createdAt = data.createdAt;
    this.facilityName = data.facilityName;
    this.sportType = data.sportType;
    this.imageUrls = data.imageUrls || [];
    this.capacity = data.capacity;
    this.address = data.address;
    this.country = data.country;
  }
}
