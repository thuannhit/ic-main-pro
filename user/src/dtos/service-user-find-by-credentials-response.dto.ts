import { AnyARecord } from 'dns';
import { UserEntity } from '../entities/user.entity'
export interface ServiceUserFindByCredentialsResDTO {
    status: number;
    message: string;
    data: UserEntity | null;
    error: any;
}
