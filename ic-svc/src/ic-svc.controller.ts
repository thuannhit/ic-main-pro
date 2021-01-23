import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ICSVCService } from './services/ic-svc.service'
import { ResponseCommon } from './utils/response-handler.util'

import { IICProductListRes } from './interfaces/ic-product-list-response.interface'
import { IICProductRes } from './interfaces/ic-product-response.interface'
import { IICProductPublishingRes } from './interfaces/ic-product-publishing-response.interface'

import { ICProductCreationReqDTO } from './dtos/ic-product-creation-request.dto'
import { ICProductPublishingReqDTO } from './dtos/ic-product-publishing-request.dto'
@Controller()
export class ICSVCController {

  constructor(
    private icSVCService: ICSVCService
  ) { }

  @MessagePattern('get_ic_product_list')
  public async getICProductList(inputDatya: any): Promise<IICProductListRes> {
    try {
      const icProductList = await this.icSVCService.getICProductList()
      if (icProductList !== null) {
        const message = 'IC product list'
        return ResponseCommon.returnResponseSuccess(icProductList, message)
      }
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @MessagePattern('create_ic_product')
  public async createICProduct(oData: ICProductCreationReqDTO): Promise<IICProductRes> {
    try {
      const icProduct = await this.icSVCService.createICProduct(oData)
      const message = 'created IC Product'
      return ResponseCommon.returnResponseSuccess(icProduct, message)
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @MessagePattern('publish_ic_product')
  public async publishICProduct(oData: ICProductPublishingReqDTO): Promise<IICProductPublishingRes> {
    try {
      const icProduct = await this.icSVCService.publishICProduct(oData)
      const message = 'published IC Product'
      return ResponseCommon.returnResponseSuccess(icProduct, message)
    } catch (error) {
      throw new RpcException(error)
    }

  }

  @MessagePattern('get_publish_ic_product_list')
  public async getPublishICProductList(oData: ICProductPublishingReqDTO): Promise<IICProductPublishingRes> {
    try {
      const icProduct = await this.icSVCService.getPublishICProductList()
      const message = 'get publish IC product list'
      return ResponseCommon.returnResponseSuccess(icProduct, message)
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @MessagePattern('get_available_publish_ic_product_list')
  public async getAvailablePublishICProductList(oData: ICProductPublishingReqDTO): Promise<IICProductPublishingRes> {
    try {
      const icProduct = await this.icSVCService.getAvailablePublishICProductList()
      const message = 'get available publish IC product list'
      return ResponseCommon.returnResponseSuccess(icProduct, message)
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
