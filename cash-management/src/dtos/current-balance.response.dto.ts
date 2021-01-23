import { BaseResponseDTO } from '../interfaces/common-response.interface'

import { IsNotEmpty } from 'class-validator';

export class CurrentBalanceResDTO implements BaseResponseDTO {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    data: number

    @IsNotEmpty()
    message: string | null

    @IsNotEmpty()
    error: string | null
}
