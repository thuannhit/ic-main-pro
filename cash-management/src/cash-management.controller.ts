import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CashManagementService } from './services/cash-management.service'
import { ResponseCommon } from './utils/response-handler.util'

import { IFinancialStatementsListRes } from './interfaces/financial-statements-list-response.interface'
import { ITopupWithdrawRes } from './interfaces/topup-withdraw-response.interface'

import { TopupWithdrawReqDTO } from './dtos/topup-withdraw-request.dto'
import { FinancialStatementsListReqDTO } from './dtos/financial-statements-list-request.dto'
import { FinancialStatementDTO } from './dtos/financial-statement.dto'

@Controller()
export class CashManagementController {

  constructor(
    private cashManagementService: CashManagementService
  ) { }

  @MessagePattern('get_financial_statements')
  public async getFinancialStatements(inputData: FinancialStatementsListReqDTO): Promise<IFinancialStatementsListRes> {
    try {
      const financialStatements = await this.cashManagementService.getFinancialStatements(inputData)
      if (financialStatements !== null) {
        const message = 'Financial statements list'
        return ResponseCommon.returnResponseSuccess(financialStatements, message)
      }
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @MessagePattern('topup')
  public async topup(oData: TopupWithdrawReqDTO): Promise<ITopupWithdrawRes> {
    try {
      const statement: FinancialStatementDTO = await this.cashManagementService.topup(oData)
      const message = 'Topup'
      return ResponseCommon.returnResponseSuccess(statement, message)
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @MessagePattern('withdraw')
  public async withdraw(oData: TopupWithdrawReqDTO): Promise<ITopupWithdrawRes> {
    try {
      const statement: FinancialStatementDTO = await this.cashManagementService.withdraw(oData)
      const message = 'Withdraw'
      return ResponseCommon.returnResponseSuccess(statement, message)
    } catch (error) {
      throw new RpcException(error)
    }
  }

}
