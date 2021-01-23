import { UserTokenEntity } from '../entities/user-token.entity'
export interface IUserTokenFindByIdRes {
    status: number;
    message: string;
    data: UserTokenEntity | null;
    error: any;
}
