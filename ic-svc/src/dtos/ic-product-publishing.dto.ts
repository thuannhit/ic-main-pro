import { Allow, IsNotEmpty } from 'class-validator';
export class ICProductPublishedDTO {
    @IsNotEmpty()
    _id: number

    @IsNotEmpty()
    _ic_product_id: number

    @IsNotEmpty()
    publishing_date: number

    @IsNotEmpty()
    publishing_amount: number

    @IsNotEmpty()
    publishing_price: number

    @IsNotEmpty()
    end_date: number

    @IsNotEmpty()
    @Allow(null)
    published_by: number
}