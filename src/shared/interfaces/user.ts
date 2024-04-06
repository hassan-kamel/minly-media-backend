import { IPost } from './post';

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: IPost[];
  likedPosts?: IPost[];
}
