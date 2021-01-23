import { Controller, HttpStatus, UseGuards, Post } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ITokenResponse } from './interfaces/token-response.interface';
import { ITokenDataResponse } from './interfaces/token-data-response.interface';
import { ITokenDestroyResponse } from './interfaces/token-destroy-response.interface';

import { ILoginUserResponse } from './interfaces/login-user-response.interface'
import { UserSimpleInfoDTO } from './dtos/user-simple-info.dto';

import { TJwtPayload } from './interfaces/jwt-payload.type'

import {SysConfigService} from './services/sys-config.service'
import { ResponseCommon } from './utils/response-handler.util'

@Controller()
export class SystemConfigController {

  constructor(
    private sysConfigService: SysConfigService
  ) { }

  @MessagePattern('get_company_list')
  public async goGetCompanyList({}): Promise<any> {
    try {
      const companyList = await this.sysConfigService.getCompanyList()
      if (companyList !== null) {
        const message = 'company list'
        return ResponseCommon.returnResponseSuccess(companyList, message)
      }
    } catch (error) {
      throw new RpcException(error)
    }
  }
 

  @MessagePattern('create_company')
  public async createCompany(oData): Promise<any> {
    try {
      const companyList = await this.sysConfigService.createCompany(oData)
      const message = 'created company'
      return ResponseCommon.returnResponseSuccess(companyList, message)
    } catch (error) {
      throw new RpcException(error)
    }

  }

  @MessagePattern('get_ic_product_list')
  public async getICProductList({ }): Promise<any> {
    try {
      const icProductList = await this.sysConfigService.getICProductList()
      if (icProductList !== null) {
        const message = 'IC product list'
        return ResponseCommon.returnResponseSuccess(icProductList, message)
      }
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @MessagePattern('create_ic_product')
  public async createICProduct(oData): Promise<any> {
    try {
      const icProduct = await this.sysConfigService.createICProduct(oData)
      const message = 'created IC Product'
      return ResponseCommon.returnResponseSuccess(icProduct, message)
    } catch (error) {
      throw new RpcException(error)
    }

  }
}
