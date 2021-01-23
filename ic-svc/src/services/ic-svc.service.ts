
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ICProductListResDTO } from '../dtos/ic-product-list-response.dto'
import { ICProductCreationResDTO } from '../dtos/ic-product-creation-response.dto'
import { ICProductCreationReqDTO } from '../dtos/ic-product-creation-request.dto'
import { ICProductPublishingReqDTO } from '../dtos/ic-product-publishing-request.dto'
import { ICProductPublishingResDTO } from '../dtos/ic-product-publishing-response.dto'
import { ICProductPublishingListResDTO } from '../dtos/ic-product-publishing-list-response.dto'
import { ICProductDTO } from '../dtos/ic-product.dto'
import { ICProductPublishedDTO } from '../dtos/ic-product-publishing.dto'
@Injectable()
export class ICSVCService {

    constructor(
        @Inject('DBCONN_SERVICE') private readonly dbConnMicroServiceClient: ClientProxy,
    ) { }

    public async createICProduct(oInput: ICProductCreationReqDTO): Promise<ICProductDTO> {
        try {
            const oNewICProduct = {
                _company_id: oInput._company_id,
                name: oInput.name,
                period: oInput.period,
                price: oInput.price,
                interest_rate: oInput.interest_rate,
                status: 1,
                created_by: 1, //TODO: get user created
            }
            const icProductRes: ICProductCreationResDTO = await this.dbConnMicroServiceClient.send('create_ic_product', oNewICProduct).toPromise()
            if (icProductRes.status === HttpStatus.OK) {
                return icProductRes.data
            }
            throw new RpcException(icProductRes.error)
        } catch (oError) {
            throw oError
        }
    }

    public async publishICProduct(oInput: ICProductPublishingReqDTO): Promise<ICProductPublishedDTO> {
        console.log('data', oInput)
        try {
            const icProductRes: ICProductPublishingResDTO = await this.dbConnMicroServiceClient.send('publish_ic_product', oInput).toPromise()
            if (icProductRes.status === HttpStatus.OK) {
                return icProductRes.data
            }
            console.log('data', icProductRes)
            throw new RpcException(icProductRes.message)
        } catch (oError) {
            throw oError
        }
    }

    public async getICProductList(): Promise<ICProductDTO[] | []> {
        try {
            const response: ICProductListResDTO = await this.dbConnMicroServiceClient.send('get_ic_product_list', {}).toPromise()
            if (response !== null && response.status === HttpStatus.OK) {
                return response.data
            } else {
                throw new RpcException(response.error)
            }
        } catch (error) {
            throw error
        }
    }

    public async getPublishICProductList(): Promise<ICProductPublishedDTO[] | []> {
        try {
            const response: ICProductPublishingListResDTO = await this.dbConnMicroServiceClient.send('get_publish_ic_product_list', {}).toPromise()
            if (response !== null && response.status === HttpStatus.OK) {
                return response.data
            } else {
                throw new RpcException(response.error)
            }
        } catch (error) {
            throw error
        }
    }

    public async getAvailablePublishICProductList(): Promise<ICProductPublishedDTO[] | []> {
        try {
            const response: ICProductPublishingListResDTO = await this.dbConnMicroServiceClient.send('get_available_publish_ic_product_list', {}).toPromise()
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
