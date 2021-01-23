
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class SysConfigService {

    constructor(
        @Inject('DBCONN_SERVICE') private readonly dbConnMicroServiceClient: ClientProxy,
    ) { }


    public async getCompanyList(): Promise<any> {
        try {
            const response = await this.dbConnMicroServiceClient.send('get_company_list', {}).toPromise()
            if (response !== null && response.status === HttpStatus.OK) {
                return response.data
            } else {
                throw new RpcException(response.error)
            }
        } catch (error) {
            throw error
        }
    }
   

    public async createCompany(newCompany): Promise<any | null> {
        try {
            const oNewCompany = {
                company_name: newCompany.company_name,
                tax_code: newCompany.tax_code,
                address: newCompany.address,
                status: 1
            }
            const company = await this.dbConnMicroServiceClient.send('create_company', oNewCompany).toPromise()
            return company
        } catch (oError) {
            throw oError
        }
    }

    public async createICProduct(oInput): Promise<any | null> {
        try {
            const oNewICProduct = {
                _company_id: oInput._company_id,
                name: oInput.name,
                period: oInput.period,
                price: oInput.price,
                interest_rate: oInput.interest_rate,
                status: 1,
                created_by: 1,
            }
            const icProduct = await this.dbConnMicroServiceClient.send('create_ic_product', oNewICProduct).toPromise()
            return icProduct
        } catch (oError) {
            throw oError
        }
    }

    public async getICProductList(): Promise<any> {
        try {
            const response = await this.dbConnMicroServiceClient.send('get_ic_product_list', {}).toPromise()
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
