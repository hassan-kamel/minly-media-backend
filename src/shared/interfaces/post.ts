import { MediaTypeEnum } from '../enums/mediaType';
import { IUser } from './user';

export interface IPost {
  id: string;
  caption: string;
  mediaUrl: string;
  type: MediaTypeEnum;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  likedBy?: IUser[];
}
