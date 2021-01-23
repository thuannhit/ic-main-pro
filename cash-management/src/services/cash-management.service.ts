
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { FinancialStatementsListResDTO } from '../dtos/financial-statements-list-response.dto'
import { FinancialStatementsListReqDTO } from '../dtos/financial-statements-list-request.dto'
import { TopupWithdrawResDTO } from '../dtos/topup-withdraw-response.dto'
import { TopupWithdrawReqDTO } from '../dtos/topup-withdraw-request.dto'
import { FinancialStatementDTO } from '../dtos/financial-statement.dto'
import { CurrentBalanceResDTO } from '../dtos/current-balance.response.dto'

const ACTION = {
    UP: 1,
    DOWN: 2
}
const STATEMENT_GROUP = {
    TOPUP_WITHDRAW: 1,
    BUYING_SELLING: 2
}

@Injectable()
export class CashManagementService {

    constructor(
        @Inject('DBCONN_SERVICE') private readonly dbConnMicroServiceClient: ClientProxy,
    ) { }

    public async topup(oInput: TopupWithdrawReqDTO): Promise<FinancialStatementDTO> {
        try {
            const currentBalance: number = await this.getCurrentBalance(Number(oInput.user_id))
            const oTopup = {
                _user_id: oInput.user_id,
                amount: oInput.amount,
                date: oInput.date,
                created_by: oInput.created_by,
                balance: oInput.amount + currentBalance,
                action: ACTION.UP,
                financial_statement_group: STATEMENT_GROUP.TOPUP_WITHDRAW,
                note: oInput.note,
            }
            const oFinancialStatement: TopupWithdrawResDTO = await this.dbConnMicroServiceClient.send('create_new_statement', oTopup).toPromise()
            if (oFinancialStatement.status === HttpStatus.OK) {
                return oFinancialStatement.data
            }
            throw new RpcException(oFinancialStatement.error)
        } catch (oError) {
            throw oError
        }
    }

    public async withdraw(oInput: TopupWithdrawReqDTO): Promise<FinancialStatementDTO> {
        try {
            const currentBalance: number = await this.getCurrentBalance(oInput.user_id)
            console.log('current balance', currentBalance)
            const oTopup = {
                _user_id: oInput.user_id,
                amount: oInput.amount,
                date: oInput.date,
                created_by: oInput.created_by,
                balance: currentBalance - oInput.amount,
                action: ACTION.DOWN,
                financial_statement_group: STATEMENT_GROUP.TOPUP_WITHDRAW,
                note: oInput.note,
            }
            const oFinancialStatement: TopupWithdrawResDTO = await this.dbConnMicroServiceClient.send('create_new_statement', oTopup).toPromise()
            if (oFinancialStatement.status === HttpStatus.OK) {
                return oFinancialStatement.data
            }
            throw new RpcException(oFinancialStatement.error)
        } catch (oError) {
            throw oError
        }
    }

    public async getFinancialStatements(inputData: FinancialStatementsListReqDTO): Promise<FinancialStatementDTO[] | []> {
        try {
            const response: FinancialStatementsListResDTO = await this.dbConnMicroServiceClient.send('get_financial_statements', inputData).toPromise()
            if (response !== null && response.status === HttpStatus.OK) {
                return response.data
            } else {
                throw new RpcException(response.error)
            }
        } catch (error) {
            throw error
        }
    }

    private async getCurrentBalance(user_id: number): Promise<number> {
        try {
            const response: CurrentBalanceResDTO = await this.dbConnMicroServiceClient.send('get_current_balance', { _user_id: user_id }).toPromise()
            if (response !== null && response.status === HttpStatus.OK) {
                return response.data
            } else {
                throw new RpcException(response.error)
            }
        } catch (error) {
            throw error
        }
    }
}
