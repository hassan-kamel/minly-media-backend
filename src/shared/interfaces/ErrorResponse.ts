import { MessageResponse } from './MessageResponse';

export interface ErrorMessage extends MessageResponse {
  stack?: string;
}
