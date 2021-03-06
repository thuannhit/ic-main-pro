import {
    IsNotEmpty
} from 'class-validator';

import { UserDTO } from './user.dto'

export class UserResDTO {
    @IsNotEmpty()
    data: UserDTO | null;

    @IsNotEmpty()
    error: string;

    @IsNotEmpty()
    message: string
}