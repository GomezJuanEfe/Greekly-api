import { Request } from 'express';

import { User } from '../api/user/user.types';

export type PayloadType = {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: User
}
