import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';


import { FinancialStatementsListResponseDto } from './interfaces/cash-management/dtos/financial-statements-list-response.dto';
import { TopupWithdrawResponseDto } from './interfaces/cash-management/dtos/topup-withdraw-response.dto';
import { TopupWithdrawReqDto } from './interfaces/cash-management/dtos/topup-withdraw-request.dto'

import { JwtAccessTokenAuthGuard } from './guards/jwt-access-token.guard'
import { request } from 'express';

@Controller('cash-management')
@ApiTags('cash-management')
export class CashManagementController {

  constructor(
    @Inject('CASH_MANAGEMENT_SERVICE') private readonly cashManagementMicroServiceClient: ClientProxy,
  ) { }

  @Get('financial-statements/:user_id')
  @ApiOkResponse({
    type: FinancialStatementsListResponseDto
  })
  @UseGuards(JwtAccessTokenAuthGuard)
  public async getFinal(@Req() request,
    @Param() params: { user_id: number }, @Query() query: { from_date: number, end_date: number, limit: number, offset: number }
  ): Promise<FinancialStatementsListResponseDto> {
    console.log('query', query)
    const finStatements = await this.cashManagementMicroServiceClient.send(
      'get_financial_statements', {
      _pic: request.user._id,
      user_id: params.user_id,
      from_date: query.from_date,
      to_date: query.end_date,
      limit: query.limit,
      offset: query.offset
    }
    ).toPromise();
    if (finStatements.status === HttpStatus.OK) {
      return {
        message: finStatements.message,
        data: finStatements.data,
        error: null
      };
    }
    throw new HttpException("Fail to get financialStatements list", HttpStatus.BAD_REQUEST);
  }

  @Post('financial-statements/:user_id/topup')
  @ApiCreatedResponse({ type: TopupWithdrawResponseDto })
  @UseGuards(JwtAccessTokenAuthGuard)
  public async topup(
    @Body() data: TopupWithdrawReqDto,
    @Param() params: { user_id: number },
    @Req() request
  ): Promise<TopupWithdrawResponseDto> {
    const newStatementData = {
      ...data,
      user_id: params.user_id,
      created_by: request.user._id
    }
    const finStatement = await this.cashManagementMicroServiceClient.send(
      'topup', newStatementData
    ).toPromise();
    if (finStatement.status === HttpStatus.OK) {

      return {
        message: finStatement.message,
        data: finStatement.data,
        error: null
      };
    }
    throw new HttpException(`Failed to topup ${finStatement.message}`, HttpStatus.BAD_REQUEST);
  }

  @Post('financial-statements/:user_id/withdraw')
  @ApiCreatedResponse({ type: TopupWithdrawResponseDto })
  @UseGuards(JwtAccessTokenAuthGuard)
  public async withdraw(
    @Body() data: TopupWithdrawReqDto,
    @Param() params: { user_id: number },
    @Req() request
  ): Promise<TopupWithdrawResponseDto> {
    const newStatementData = {
      ...data,
      user_id: params.user_id,
      created_by: request.user._id
    }
    const finStatement = await this.cashManagementMicroServiceClient.send(
      'withdraw', newStatementData
    ).toPromise();
    if (finStatement.status === HttpStatus.OK) {

      return {
        message: finStatement.message,
        data: finStatement.data,
        error: null
      };
    }
    throw new HttpException(`Failed to withdraw ${finStatement.message}`, HttpStatus.BAD_REQUEST);
  }

}
