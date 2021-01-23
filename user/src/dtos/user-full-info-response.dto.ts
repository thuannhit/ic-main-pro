import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserFullResDTO {
    @IsNotEmpty()
    _id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    user_name: string;

    @IsNotEmpty()
    _role_id: number;

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    is_deleted: number

    @IsNotEmpty()
    is_active: number

    @IsNotEmpty()
    is_verified: number
}