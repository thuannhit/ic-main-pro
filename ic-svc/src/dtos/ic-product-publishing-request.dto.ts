import { IsNotEmpty } from 'class-validator';

export class ICProductPublishingReqDTO {
    @IsNotEmpty()
    _ic_product_id: number

    @IsNotEmpty()
    published_amount: number

    @IsNotEmpty()
    published_date: number

    @IsNotEmpty()
    published_price: number

    @IsNotEmpty()
    end_date: number

    @IsNotEmpty()
    published_by: number | null
}
