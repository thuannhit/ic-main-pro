import { Controller, Get } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { UserFullResDTO } from './dtos/user-full-info-response.dto'
import { DBConnService } from './services/db-conn.service'
import { UserRegisterReqDTO } from './dtos/user-register-request.dto'
import { UserFullEntityExceptPasswordDTO } from './dtos/user-full-entity-except-password.dto'
import { ICProductPublishingReqDTO } from './dtos/ic-product-publishing-request.dto'
import { FinancialStatementsListReqDTO } from './dtos/financial-statements-list-request.dto'
import { TopupWithdrawReqDTO } from './dtos/topup-withdraw-request.dto'

import { UserEntity } from './entities/user.entity';
import { ResponseCommon } from './utils/response-handler.util'
import { UserTokenEntity } from './entities/user-token.entity';
import { CompanyEntity } from './entities/company.entity';
import { ICProductEntity } from './entities/ic-product.entity';
import { PublishedICsEntity } from './entities/published_ics.entity'
import { FinancialStatementEntity } from './entities/financial-statements.entity';

@Controller()
export class AppController {
  constructor(private readonly dbConnService: DBConnService) { }

  @Get()
  getHello(): string {
    return ''
  }

  @MessagePattern('search_user_by_email')
  public async searchUserByCredentials(
    searchParams: { email: string }
  ): Promise<any> {
    const user = await this.dbConnService.findByEmail(searchParams.email)
    return ResponseCommon.returnResponseSuccess(user, 'Get user by email')
  }

  @MessagePattern('search_user_by_id')
  public async getEssentialUserInfoById(
    searchParams: { _id: number }
  ): Promise<any> {
    const user = await this.dbConnService.findById(searchParams._id)
    return ResponseCommon.returnResponseSuccess(user, 'Get user by id')
  }

  @MessagePattern('add_new_user')
  public async add_new_user(
    newUser: UserRegisterReqDTO
  ): Promise<any> {
    const user: UserEntity = await this.dbConnService.createNewUser(newUser)
    return ResponseCommon.returnResponseSuccess(user, 'Add new user successfully in DB')
  }

  @MessagePattern('update_user_token')
  public async update_new_user(
    userToken: { _user_id: number, token_value: string, token_type: number }
  ): Promise<any> {
    const response: UserTokenEntity = await this.dbConnService.updateUserToken(userToken)
    return ResponseCommon.returnResponseSuccess(response, 'Add new token successfully in DB')
  }

  @MessagePattern('get_user_token')
  public async get_user_token(
    inputData: { _user_id: number, token_type: number }
  ): Promise<any> {
    const userToken: UserTokenEntity = await this.dbConnService.getUserToken(inputData)
    return ResponseCommon.returnResponseSuccess(userToken, 'Get token successfully in DB')
  }

  @MessagePattern('get_company_list')
  public async get_company_list(
    { }
  ): Promise<any> {
    const response: CompanyEntity[] = await this.dbConnService.getCompanyList({})
    return ResponseCommon.returnResponseSuccess(response, 'We are getting companies')
  }

  @MessagePattern('create_company')
  public async create_company(
    oData
  ): Promise<any> {
    const response: CompanyEntity = await this.dbConnService.createCompany(oData)
    return ResponseCommon.returnResponseSuccess(response, 'Add new company successfully in DB')
  }

  @MessagePattern('create_ic_product')
  public async create_ic_product(
    oData
  ): Promise<any> {
    const response: ICProductEntity = await this.dbConnService.createICProduct(oData)
    return ResponseCommon.returnResponseSuccess(response, 'Add new company successfully in DB')
  }

  @MessagePattern('get_ic_product_list')
  public async get_ic_product_list(
    { }
  ): Promise<any> {
    const response: ICProductEntity[] = await this.dbConnService.getICProductList({})
    return ResponseCommon.returnResponseSuccess(response, 'We are getting companies')
  }

  @MessagePattern('publish_ic_product')
  public async publish_ic_produc(
    oData: ICProductPublishingReqDTO
  ): Promise<any> {
    const response: PublishedICsEntity = await this.dbConnService.publishICProduct(oData)
    return ResponseCommon.returnResponseSuccess(response, 'Publishing IC Product')
  }

  @MessagePattern('get_publish_ic_product_list')
  public async get_publish_ic_product_list(): Promise<any> {
    const response: PublishedICsEntity[] = await this.dbConnService.getPublishICProductList()
    return ResponseCommon.returnResponseSuccess(response, 'Get all published IC products')
  }

  @MessagePattern('get_available_publish_ic_product_list')
  public async get_available_publish_ic_product_list(): Promise<any> {
    const response: PublishedICsEntity[] = await this.dbConnService.getAvailablePublishICProductList()
    return ResponseCommon.returnResponseSuccess(response, 'Get all available published IC products')
  }

  @MessagePattern('get_customers_list')
  public async get_customers_list(
    oData: any
  ): Promise<any> {
    const response: UserEntity[] = await this.dbConnService.getCustomersList()
    return ResponseCommon.returnResponseSuccess(response, 'Customers List')
  }

  @MessagePattern('get_financial_statements')
  public async get_financial_statements_list(
    oData: FinancialStatementsListReqDTO
  ): Promise<any> {
    const response: { statements: FinancialStatementEntity[], count: number } = await this.dbConnService.getFinancialStatements(oData)
    return ResponseCommon.returnResponseSuccess(response, 'Financial statements list')
  }

  @MessagePattern('get_current_balance')
  public async get_current_balance(
    inputData: { _user_id: number }
  ): Promise<any> {
    const response: number = await this.dbConnService.getCurrentBalance(inputData._user_id)
    return ResponseCommon.returnResponseSuccess(response, 'User balance')
  }

  @MessagePattern('create_new_statement')
  public async create_new_statement(
    oData: TopupWithdrawReqDTO
  ): Promise<any> {
    const response: FinancialStatementEntity = await this.dbConnService.createNewFinancialStatement(oData)
    return ResponseCommon.returnResponseSuccess(response, 'New Statement created')
  }
}
