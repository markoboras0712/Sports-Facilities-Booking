import { AvatarData } from 'modules/authorization';

export interface Chat {
  id?: string;
  creatorId: string;
  userName: string;
  avatar?: AvatarData;
  facilityId?: string;
  facilityName?: string;
  createdAt: Date | null;
}

export class Chat {
  constructor(data: Chat) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.userName = data.userName;
    this.avatar = data.avatar || undefined;
    this.createdAt = data.createdAt || new Date();
    this.facilityId = data.facilityId;
    this.facilityName = data.facilityName;
  }
}
