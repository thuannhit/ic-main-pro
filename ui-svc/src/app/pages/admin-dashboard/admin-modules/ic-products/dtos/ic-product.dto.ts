import {
    IsNotEmpty,
    IsNumber,
    Allow
} from 'class-validator';
export class ICProductDTO {
   
    @IsNotEmpty()
    @IsNumber()
    _company_id: number

    @IsNotEmpty()
    @IsNumber()
    _id: number

    @IsNotEmpty()
    @IsNumber()
    interest_rate: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsNumber()
    period: number

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    updated_at: string

    @IsNotEmpty()
    @Allow(null)
    updated_by: null

    @IsNotEmpty()
    created_at: string

    @IsNotEmpty()
    @IsNumber()
    created_by: number

}