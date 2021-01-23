import { Request } from 'express';
import { IUser } from '../user.interface'

export interface RequestWithSimpleUserPayload extends Request {
    user: Omit<IUser, 'expires_at' | 'expires_time'>
}