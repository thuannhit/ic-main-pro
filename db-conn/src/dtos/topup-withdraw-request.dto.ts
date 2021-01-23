import { IsNotEmpty, IsNumber } from 'class-validator';

export class TopupWithdrawReqDTO {
    @IsNotEmpty()
    @IsNumber()
    date: number

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    note: string 

    @IsNotEmpty()
    @IsNumber()
    _user_id: number

    @IsNotEmpty()
    @IsNumber()
    created_by: number

    @IsNotEmpty()
    @IsNumber()
    balance: number

    @IsNotEmpty()
    @IsNumber()
    action: number

    @IsNotEmpty()
    @IsNumber()
    financial_statement_group: number
}
