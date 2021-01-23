import { FinancialStatementDTO } from './financial-statement.dto'
import { BaseResponseDTO } from '../interfaces/common-response.interface'

import { IsNotEmpty } from 'class-validator';

export class FinancialStatementsListResDTO implements BaseResponseDTO {
    @IsNotEmpty()
    status: number

    @IsNotEmpty()
    data: FinancialStatementDTO[] | [] | null

    @IsNotEmpty()
    message: string | null

    @IsNotEmpty()
    error: string | null
}
