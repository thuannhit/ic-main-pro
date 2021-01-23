import { IsNotEmpty } from 'class-validator';

export class TopupWithdrawReqDTO {
    @IsNotEmpty()
    date: number

    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    note: string 

    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    created_by: number
}
