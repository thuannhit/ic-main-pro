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
    UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';


import { ICProductListResponseDto } from './interfaces/ic-products/dtos/ic-products-response.dto';
import { ICProductCreationResponseDto } from './interfaces/ic-products/dtos/create-ic-product-response.dto';
import { ICProductPublishingResponseDto } from './interfaces/ic-products/dtos/publish-ic-product-response.dto';

@Controller('ic-product')
@ApiTags('ic-product')
export class ICSVCController {

    constructor(
        @Inject('IC_SVC_SERVICE') private readonly icSVCService: ClientProxy,
    ) { }

    @Post()
    @ApiOkResponse({ type: ICProductCreationResponseDto })
    public async createNewICProduct(
        @Body() data
    ): Promise<ICProductCreationResponseDto> {
        const icProductRes = await this.icSVCService.send(
            'create_ic_product', data
        ).toPromise();
        if (icProductRes.status === HttpStatus.OK) {

            return {
                message: icProductRes.message,
                data: icProductRes.data,
                error: null
            };
        }
        throw new HttpException("Failed to create new IC Product", HttpStatus.UNAUTHORIZED);
    }

    @Get()
    @ApiOkResponse({
        type: ICProductListResponseDto
    })
    public async getICProducts(
        @Req() request
    ): Promise<ICProductListResponseDto> {
        const icProductListRes = await this.icSVCService.send(
            'get_ic_product_list', {}
        ).toPromise();
        if (icProductListRes.status === HttpStatus.OK) {
            return {
                message: icProductListRes.message,
                data: icProductListRes.data,
                error: null
            };
        }
        throw new HttpException("Fail to get IC Product list", HttpStatus.UNAUTHORIZED);
    }

    @Post('publish')
    @ApiOkResponse({ type: ICProductPublishingResponseDto })
    public async publishICProduct(
        @Body() data, @Req() ref
    ): Promise<ICProductPublishingResponseDto> {
        console.log('reeeeee', ref)
        const icProductRes = await this.icSVCService.send(
            'publish_ic_product', data
        ).toPromise();
        if (icProductRes.status === HttpStatus.OK) {

            return {
                message: icProductRes.message,
                data: icProductRes.data,
                error: null
            };
        }
        throw new HttpException("Failed to publish IC Product " + icProductRes.message, HttpStatus.BAD_REQUEST);
    }

    @Get('publish')
    @ApiOkResponse({ type: ICProductPublishingResponseDto })
    public async getPublishICProduct(
        @Body() data, @Req() ref
    ): Promise<ICProductPublishingResponseDto> {
        const icProductRes = await this.icSVCService.send(
            'get_publish_ic_product_list', data
        ).toPromise();
        if (icProductRes.status === HttpStatus.OK) {

            return {
                message: icProductRes.message,
                data: icProductRes.data,
                error: null
            };
        }
        throw new HttpException("Failed to get publish IC Product " + icProductRes.message, HttpStatus.BAD_REQUEST);
    }

    @Get('available-publish')
    @ApiOkResponse({ type: ICProductPublishingResponseDto })
    public async getAvailablePublishICProduct(
        @Body() data, @Req() ref
    ): Promise<ICProductPublishingResponseDto> {
        const icProductRes = await this.icSVCService.send(
            'get_available_publish_ic_product_list', data
        ).toPromise();
        if (icProductRes.status === HttpStatus.OK) {

            return {
                message: icProductRes.message,
                data: icProductRes.data,
                error: null
            };
        }
        throw new HttpException("Failed to get available publish IC Product " + icProductRes.message, HttpStatus.BAD_REQUEST);
    }
}
