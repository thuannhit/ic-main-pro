import { ICProductDTO } from './ic-product.dto'
import { BaseResponseDTO } from '../interfaces/common-response.interface'

import { IsNotEmpty } from 'class-validator';

export class ICProductCreationResDTO implements BaseResponseDTO {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    data: ICProductDTO |  null

    @IsNotEmpty()
    message: string | null

    @IsNotEmpty()
    error: string | null
}
