import { AvatarData } from 'modules/authorization';

export interface Notification {
  /**
   * Unique identifier for the user who created the notification
   */
  creatorId: string;
  /**
   * Name of the user who created the notification
   */
  creatorName: string;
  /**
   *  Avatar of user who created notification
   */
  avatar?: AvatarData;
  /**
   * Unique identifier of facility on which user is making notification
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
   * Date of the creation of the notification
   */
  createdAt: Date | null;
  /**
   * Type of notification
   */
  type: ReservationType;
  /**
   *  Name of the facility
   */
  facilityName: string;
}

export class Notification {
  constructor(data: Notification) {
    this.creatorId = data.creatorId;
    this.creatorName = data.creatorName;
    this.avatar = data.avatar || undefined;
    this.createdAt = data.createdAt;
    this.facilityId = data.facilityId;
    this.startTime = data.startTime || new Date();
    this.endTime = data.endTime || new Date();
    this.type = data.type || 'pending';
    this.creatorId = data.creatorId;
    this.createdAt = data.createdAt;
    this.facilityName = data.facilityName;
  }
}
