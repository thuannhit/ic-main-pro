import { IsNotEmpty, IsEmail } from 'class-validator';
export class UserLoginRequestDTO {
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    password: string;
}