import { FinancialStatementDTO } from './financial-statement.dto'
import { BaseResponseDTO } from '../interfaces/common-response.interface'

import { IsNotEmpty } from 'class-validator';

export class TopupWithdrawResDTO implements BaseResponseDTO {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    data: FinancialStatementDTO |  null

    @IsNotEmpty()
    message: any | null

    @IsNotEmpty()
    error: string | null
}
