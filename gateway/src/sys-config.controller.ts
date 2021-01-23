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


import { CompanyListResponseDto } from './interfaces/company/dtos/company-list-response.dto';
import { CompanyCreationResponseDto } from './interfaces/company/dtos/create-company-response.dto';

@Controller('system-config')
@ApiTags('system-config')
export class SysConfigController {

  constructor(
    // @Inject('AUTH_SERVICE') private readonly authMicroServiceClient: ClientProxy,
    @Inject('SYS_CONFIG_SERVICE') private readonly sysConfigMicroServiceClient: ClientProxy,
  ) { }

  @Get('company')
  @ApiOkResponse({
    type: CompanyListResponseDto
  })
  public async getCompanyList(
    @Req() request
  ): Promise<CompanyListResponseDto> {
    const userResponse = await this.sysConfigMicroServiceClient.send(
      'get_company_list', {}
    ).toPromise();
    if (userResponse.status === HttpStatus.OK) {

      return {
        message: userResponse.message,
        data: userResponse.data,
        error: null
      };
    }
    throw new HttpException("Fail to get company list", HttpStatus.UNAUTHORIZED);
  }
  
  @Post('company')
  @ApiOkResponse()
  public async createNewCompany(
    @Body() data
  ): Promise<CompanyCreationResponseDto> {
    const userResponse = await this.sysConfigMicroServiceClient.send(
      'create_company', data
    ).toPromise();
    if (userResponse.status === HttpStatus.OK) {
      
      return {
        message: userResponse.message,
        data: userResponse.data,
        error: null
      };
    }
    throw new HttpException("Failed to create new company", HttpStatus.UNAUTHORIZED);
  }
  
}
