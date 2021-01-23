import { IUser } from '../user.interface'
export class UserWithTokens {
    accessToken: string
    refreshToken: string
    user: IUser
}
