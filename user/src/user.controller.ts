import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy, RpcException } from '@nestjs/microservices';

import { UserService } from './services/user.service';
import { ResponseCommon } from './utils/response-handler.util'

import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUserFindByEmailRes } from './interfaces/user-find-by-email-response.interface'
import { IUserFindByIdRes } from './interfaces/user-find-by-id-response.interface'
import { IUserEssentialInfoRes } from './interfaces/user-esstential-info-response.interface'
import { ICustomersListResponse } from './interfaces/customers-list-response.interface'
import { IUserTokenFindByIdRes } from './interfaces/user-token-find-by-id-response.interface'

import { UserRegisterReqDTO } from './dtos/user-register-request.dto';
import { UserFindByEmailReqDTO } from './dtos/user-find-by-email-request.dto'
import { UserFindByIdReqDTO } from './dtos/user-find-by-id-request.dto'
import { UserRefreshTokenFindByIdReqDTO } from './dtos/user-refresh-token-find-by-id-request.dto'
import {
  UserEssentialInfoReqDTO
} from './dtos/user-esstential-info-request.dto'
import { UserFullResDTO } from './dtos/user-full-info-response.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy
  ) { }

  @MessagePattern('user_create')
  public async registerUser(
    userParams: UserRegisterReqDTO
  ): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;
    if (userParams) {
      try {
        const userFound = await this.userService.searchUserByEmail({ email: userParams.email })
        if (userFound == null) {
          const oNewUser = await this.userService.registerUser(userParams)
          //TODO: Send email for verifying
          result = {
            status: HttpStatus.OK,
            message: 'user_created',
            data: oNewUser,
            error: null
          };
        } else {
          throw new RpcException('Duplicated email')
        }
      } catch (e) {
        throw e
      }
    } else {
      throw new RpcException('Bad request - missing information')
    }
    return result;
  }

  @MessagePattern('find_user_by_email')
  public async findUserByEmail(
    userParams: UserFindByEmailReqDTO
  ): Promise<IUserFindByEmailRes> {
    if (userParams) {
      try {
        const userFound = await this.userService.searchUserByEmail({ email: userParams.email })
        return ResponseCommon.returnResponseSuccess(userFound, 'User Information')
      } catch (e) {
        throw e
      }
    }
  }

  @MessagePattern('find_user_by_id')
  public async findUserById(
    userParams: UserFindByIdReqDTO
  ): Promise<IUserFindByIdRes> {
    if (userParams) {
      try {
        const userFound = await this.userService.findUserById({ _id: userParams._user_id })
        return ResponseCommon.returnResponseSuccess(userFound, 'User Information')
      } catch (e) {
        throw e
      }
    }
  }

  @MessagePattern('get_user_refresh_token')
  public async get_user_refresh_token(
    userParams: UserRefreshTokenFindByIdReqDTO
  ): Promise<IUserTokenFindByIdRes> {
    if (userParams) {
      try {
        const userFound = await this.userService.findUserRefreshtoken(userParams._user_id)
        return ResponseCommon.returnResponseSuccess(userFound, 'User Refreshtoken')
      } catch (e) {
        throw e
      }
    }
  }

  @MessagePattern('get_essential_user_info')
  public async getEssentialUserInfo(
    userParams: UserEssentialInfoReqDTO
  ): Promise<IUserEssentialInfoRes> {
    try {
      const userFound = await this.userService.getEssentialUserInfo(userParams)
      return ResponseCommon.returnResponseSuccess(userFound, 'User Essential Information')
    } catch (e) {
      throw e
    }
  }

  @MessagePattern('update_user_refresh_token')
  public async updateUserRefreshToken(
    userParams: { _user_id: number, token_value: string }
  ): Promise<IUserEssentialInfoRes> {
    try {
      const userFound = await this.userService.updateRefreshToken(userParams)
      return ResponseCommon.returnResponseSuccess(userFound, 'User token updated')
    } catch (e) {
      throw e
    }
  }

  @MessagePattern('get_customers_list')
  public async getCustomersList(
    oData: any
  ): Promise<ICustomersListResponse> {
    try {
      const aCustomers: UserFullResDTO[] = await this.userService.getCustomersList(oData)
      return ResponseCommon.returnResponseSuccess(aCustomers, 'Customers List')
    } catch (e) {
      throw e
    }
  }
}
