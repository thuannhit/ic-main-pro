import {
    IsNotEmpty
} from 'class-validator';

import { ICProductDTO } from './ic-product.dto'

export class ICProductListResDTO {
    @IsNotEmpty()
    data: ICProductDTO[] | null;

    @IsNotEmpty()
    error: string;

    @IsNotEmpty()
    message: string
}