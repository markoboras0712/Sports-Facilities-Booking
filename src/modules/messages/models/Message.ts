export interface Message {
  id?: string;
  createdAt: Date | null;
  text: string;
  to: string;
  uid: string;
}

export class Message {
  constructor(data: Message) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.text = data.text;
    this.to = data.to;
    this.uid = data.uid;
  }
}
