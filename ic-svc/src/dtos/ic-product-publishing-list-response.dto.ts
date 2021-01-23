import { ICProductPublishedDTO } from './ic-product-publishing.dto'
import { BaseResponseDTO } from '../interfaces/common-response.interface'

import { IsNotEmpty } from 'class-validator';

export class ICProductPublishingListResDTO implements BaseResponseDTO {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    data: ICProductPublishedDTO[] | []

    @IsNotEmpty()
    message: string | null

    @IsNotEmpty()
    error: string | null
}
