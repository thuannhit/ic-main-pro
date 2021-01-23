import { BaseResponseDTO } from './common-response.interface'
import { FinancialStatementDTO } from '../dtos/financial-statement.dto'
export interface ITopupWithdrawRes extends BaseResponseDTO {
  data: FinancialStatementDTO
}
