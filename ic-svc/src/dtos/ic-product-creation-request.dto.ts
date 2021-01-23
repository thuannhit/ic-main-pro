import { IsNotEmpty } from 'class-validator';

export class ICProductCreationReqDTO {
    @IsNotEmpty()
    _company_id: number

    @IsNotEmpty()
    name: string 

    @IsNotEmpty()
    period: string 

    @IsNotEmpty()
    price: number 
    
    @IsNotEmpty()
    interest_rate: number 

    @IsNotEmpty()
    created_by: number | null
}
