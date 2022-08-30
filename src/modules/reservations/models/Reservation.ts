export interface Reservation {
  /**
   * The id of the reservation
   */
  id: string;
  /**
   * Unique identifier for the user who created the facility
   */
  creatorId: string;
  /**
   * Unique identifier of facility on which user is making reservation
   */
  facilityId: string;
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
}

export class Reservation {
  constructor(data: Reservation) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.createdAt = data.createdAt;
    this.facilityId = data.facilityId;
    this.startTime = data.startTime || new Date();
    this.endTime = data.endTime || new Date();
  }
}
