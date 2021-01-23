
import { IsNotEmpty } from 'class-validator';

export class FinancialStatementsListReqDTO  {
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    from_date: number

    @IsNotEmpty()
    to_date: number

    @IsNotEmpty()
    limit: number
    
    @IsNotEmpty()
    offset: number
}
