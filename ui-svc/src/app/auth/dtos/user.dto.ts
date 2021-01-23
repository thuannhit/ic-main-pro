import {
    IsEmail,
    IsString,
    IsNumber, Allow
} from 'class-validator';
export class UserDTO {
    @IsString()
    user_name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @Allow(null)
    _role_id?: number

    @IsNumber()
    _id: number
}