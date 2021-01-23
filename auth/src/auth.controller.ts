import { Controller, HttpStatus, UseGuards, Post } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service'
import { ITokenResponse } from './interfaces/token-response.interface';
import { ITokenDataResponse } from './interfaces/token-data-response.interface';
import { ITokenDestroyResponse } from './interfaces/token-destroy-response.interface';

import { ILoginUserResponse } from './interfaces/login-user-response.interface'
import { UserSimpleInfoDTO } from './dtos/user-simple-info.dto';

import { TJwtPayload } from './interfaces/jwt-payload.type'

import { LocalAuthGuard } from './local-auth.guard'

import { ResponseCommon } from './utils/response-handler.util'

import { TOKEN_TYPE } from './utils/token-type.constant'

@Controller()
export class AuthController {

  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) { }

  // @MessagePattern('token_create')
  // public async createToken(data: { userId: string }): Promise<ITokenResponse> {
  //   let result: ITokenResponse;
  //   if (data && data.userId) {
  //     try {
  //       const createResult = await this.tokenService.createToken(data.userId);
  //       result = {
  //         status: HttpStatus.CREATED,
  //         message: 'token_create_success',
  //         token: createResult.token
  //       };
  //     } catch (e) {
  //       result = {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'token_create_bad_request',
  //         token: null
  //       };
  //     }
  //   } else {
  //     result = {
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'token_create_bad_request',
  //       token: null
  //     };
  //   }

  //   return result;
  // }

  // @MessagePattern('token_destroy')
  // public async destroyToken(data: { userId: string }): Promise<ITokenDestroyResponse> {
  //   return {
  //     status: data && data.userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
  //     message: data && data.userId ?
  //       await this.tokenService.deleteTokenForUserId(data.userId) && 'token_destroy_success' :
  //       'token_destroy_bad_request',
  //     errors: null
  //   };
  // }

  @MessagePattern('verify_access_token')
  public async decodeAccessToken(data: { token: string }): Promise<ITokenDataResponse> {
    const tokenData = await this.tokenService.decodeAccessToken(data.token);
    return {
      status: HttpStatus.OK,
      message: 'token_decode_success',
      data: tokenData
    };
  }

  @MessagePattern('verify_refresh_token')
  public async decodeRefreshToken(data: { token: string }): Promise<ITokenDataResponse> {
    const tokenData = await this.tokenService.decodeRefreshToken(data.token);
    return {
      status: HttpStatus.OK,
      message: 'token_decode_success',
      data: tokenData
    };
  }

  @MessagePattern('refresh_token')
  public async doRefreshTokens(input: { _user_id: number, refresh_token: string }): Promise<ILoginUserResponse> {
    try {
      const userInfo = await this.userService.getUserIfTokenMatches(input._user_id, input.refresh_token);
      const jwtPayload: TJwtPayload = {
        _id: userInfo._id,
        user_name: userInfo.user_name,
        email: userInfo.email,
        _role_id: userInfo._role_id
      }
      const accessToken = this.tokenService.getJwtAccessToken(jwtPayload)
      const refreshToken = this.tokenService.getJwtRefreshToken(jwtPayload)
      await this.userService.updateUserRefreshToken({ token_value: refreshToken, _user_id: userInfo._id })
      const data = { accessToken: accessToken, refreshToken: refreshToken, user: userInfo }
      const message = 'refreshed tokens'
      return ResponseCommon.returnResponseSuccess(data, message)
    }
    catch (error) {
      throw new RpcException(`Failed to refresh tokens : ${error.message}`)
    }
  }

  @UseGuards(LocalAuthGuard)
  @MessagePattern('login')
  public async doLogin(user: { username: string, password: string }): Promise<ILoginUserResponse> {
    try {
      const userInfo = await this.userService.getUserIfPasswordMatches(user.username, user.password)
      if (user !== null) {
        const jwtPayload: TJwtPayload = {
          _id: userInfo._id,
          user_name: userInfo.user_name,
          email: userInfo.email,
          _role_id: userInfo._role_id
        }
        const accessToken = this.tokenService.getJwtAccessToken(jwtPayload)
        const refreshToken = this.tokenService.getJwtRefreshToken(jwtPayload)
        await this.userService.updateUserRefreshToken({ token_value: refreshToken, _user_id: userInfo._id })
        const data = { accessToken: accessToken, refreshToken: refreshToken, user: userInfo }
        const message = (accessToken && refreshToken) ? 'token_decode_success' : 'token_decode_unauthorized'
        return ResponseCommon.returnResponseSuccess(data, message)
      }
    } catch (error) {
      throw new RpcException(error)
    }

  }
}
