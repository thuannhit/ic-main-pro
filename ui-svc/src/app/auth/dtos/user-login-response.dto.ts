import {
    IsEmail,
    IsString,
    IsNumber, Allow
} from 'class-validator';
import { LoggedUser } from './logged-user.dto'
export class UserLoginResponseDTO {
    data: LoggedUser
    error: any | null
    message: string
}