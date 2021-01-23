import { Request } from 'express';
import { UserWithTokens } from './user-with-tokens.dto'

export interface RequestWithUserAndTokens extends Request {
    user: UserWithTokens
}