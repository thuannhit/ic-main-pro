import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserFindByIdReqDTO {
    @IsNotEmpty()
    @IsNumber()
    _user_id: number;
}