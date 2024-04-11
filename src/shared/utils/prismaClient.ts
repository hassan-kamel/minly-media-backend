import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ model, operation, args, query }) {
        console.log('operation: ', operation);
        console.log('model: ', model);
        args.data.password = await bcrypt.hash(args.data.password, 12);
        return query(args);
      }
    }
  }
});
