import { UserEntity } from '../entities/user.entity'
export class CustomersListResDTO {
    status: number;
    message: string;
    data: UserEntity[] | null;
    error: any;
}
