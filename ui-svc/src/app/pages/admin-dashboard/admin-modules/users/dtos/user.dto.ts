import {
    IsNotEmpty,
    IsNumber,
    Allow,
    IsEmail
} from 'class-validator';
export class UserDTO {
   
    @IsNotEmpty()
    @IsNumber()
    _id: number

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    user_name: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    @IsNumber()
    _role_id: number

    @IsNotEmpty()
    @IsNumber()
    is_deleted: number

    @IsNotEmpty()
    is_active: number

    @IsNotEmpty()
    is_verified: number

}