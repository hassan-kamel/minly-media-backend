import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

const createToken = (payload: IUser) => {
  console.log('process.env.JWT_SECRET_KEY: ', process.env.JWT_SECRET_KEY);
  console.log('process.env.JWT_EXPIRE_TIME: ', process.env.JWT_EXPIRE_TIME);
  return jwt.sign({ ...payload }, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRE_TIME!
  });
};

export default createToken;
