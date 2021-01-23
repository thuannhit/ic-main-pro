import { IsNotEmpty, IsEmail } from 'class-validator';

export interface IUserEssentialInfo {
    email: string;

    _id: number;

    user_name: string;

    _role_id: number;

    password: string;
}