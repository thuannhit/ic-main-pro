import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserRefreshTokenFindByIdReqDTO {
    @IsNotEmpty()
    @IsNumber()
    _user_id: number;
}