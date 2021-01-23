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

import { Authorization } from './decorators/authorization.decorator';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { ServiceUserCreateDTO } from './interfaces/user/dto/service-user-create-response.dto';
import { IServiceUserSearchResponse } from './interfaces/user/service-user-search-response.interface';
import { IServiveTokenCreateResponse } from './interfaces/token/service-token-create-response.interface';
import { IServiceTokenDestroyResponse } from './interfaces/token/service-token-destroy-response.interface';
import { IServiceUserConfirmResponse } from './interfaces/user/service-user-confirm-response.interface';
import { IServiceUserGetByIdResponse } from './interfaces/user/service-user-get-by-id-response.interface';

import { GetUserByTokenResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
import { CustomersListResDTO } from './interfaces/user/dto/get-customers-list-response.dto';
import { CreateUserReqDto } from './interfaces/user/dto/user-register-request.dto';
import { UserRegisterResponseDto } from './interfaces/user/dto/user-register-response.dto';
import { LoginUserDto } from './interfaces/user/dto/login-user.dto';
import { LoginUserResponseDto } from './interfaces/user/dto/login-user-response.dto';
import { LogoutUserResponseDto } from './interfaces/user/dto/logout-user-response.dto';
import { ConfirmUserDto } from './interfaces/user/dto/confirm-user.dto';
import { ConfirmUserResponseDto } from './interfaces/user/dto/confirm-user-response.dto';
import { RequestWithUserAndTokens } from './interfaces/user/dto/login-user-with-request.dto'
import { RequestWithSimpleUserPayload } from './interfaces/user/dto/request-with-user.dto'
import { RefreshUserResponseDto } from './interfaces/user/dto/refresh-user-response.dto'
import { ServiceUserRefreshResDTO } from './interfaces/user/dto/service-user-refresh-response.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-token.guards'

@Controller('user')
@ApiTags('user')
export class UsersController {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authMicroServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userMicroServiceClient: ClientProxy,
  ) { }

  @Get()
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserByTokenResponseDto
  })
  public async getUserByToken(
    @Req() request: IAuthorizedRequest
  ): Promise<GetUserByTokenResponseDto> {
    const userInfo = request.user;

    const userResponse: IServiceUserGetByIdResponse = await this.userMicroServiceClient.send(
      'user_get_by_id',
      userInfo._id
    ).toPromise();

    return {
      message: userResponse.message,
      data: {
        user: userResponse.user
      },
      errors: null
    };
  }

  @Get('customers')
  @ApiOkResponse({
    type: CustomersListResDTO
  })
  public async getCustomersList(
    @Req() request: any
  ): Promise<CustomersListResDTO> {

    const oResponse: any = await this.userMicroServiceClient.send(
      'get_customers_list',
      {}).toPromise();

    if (oResponse.status !== HttpStatus.OK) {
      throw new HttpException({
        message: oResponse.message,
        data: null,
        error: oResponse.error
      }, oResponse.status);
    }
    return {
      message: oResponse.message,
      data: oResponse.data,
      error: null
    };
  }

  @Post('register')
  @ApiCreatedResponse({
    type: UserRegisterResponseDto
  })
  public async createUser(
    @Body() userRequest: CreateUserReqDto
  ): Promise<UserRegisterResponseDto> {
    const createUserResponse: ServiceUserCreateDTO = await this.userMicroServiceClient.send(
      'user_create',
      userRequest
    ).toPromise();
    if (createUserResponse.status !== HttpStatus.OK) {
      throw new HttpException({
        message: createUserResponse.message,
        data: null,
        errors: createUserResponse.errors
      }, createUserResponse.status);
    }

    // const createTokenResponse: IServiveTokenCreateResponse = await this.authMicroServiceClient.send('token_create', {
    //   userId: createUserResponse.user._id
    // }).toPromise();

    // return {
    //   message: createUserResponse.message,
    //   data: {
    //     user: createUserResponse.user,
    //     token: createTokenResponse.token
    //   },
    //   errors: null
    // };
    return {
      message: createUserResponse.message,
      data: {
        user: createUserResponse.user,
        token: ''
      },
      error: null
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({
    type: LoginUserResponseDto
  })
  public async loginUser(
    @Req() request: RequestWithUserAndTokens,
  ): Promise<LoginUserResponseDto> {
    const authenticatedUser = request.user || null
    if (authenticatedUser !== null) {
      return {
        message: 'User logged in',
        data: authenticatedUser,
        error: null
      };
    }
    throw new HttpException("Fail to login", HttpStatus.UNAUTHORIZED);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiCreatedResponse({
    type: RefreshUserResponseDto
  })
  public async refreshUser(
    @Req() request: RequestWithSimpleUserPayload,
  ): Promise<RefreshUserResponseDto> {
    try {
      const authenticatedUser = request.user || null
      const refreshTokensRes: ServiceUserRefreshResDTO = await this.authMicroServiceClient.send('refresh_token', { _user_id: authenticatedUser._id, refresh_token: request.body.refreshToken }).toPromise()
      if (authenticatedUser !== null && refreshTokensRes.status === HttpStatus.OK) {
        return {
          message: 'User refreshed',
          data: {
            accessToken: refreshTokensRes.data.accessToken,
            refreshToken: refreshTokensRes.data.refreshToken,
            user: refreshTokensRes.data.user
          },
          error: null
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Put('/logout')
  @Authorization(true)
  @ApiCreatedResponse({
    type: LogoutUserResponseDto
  })
  public async logoutUser(
    @Req() request: IAuthorizedRequest
  ): Promise<LogoutUserResponseDto> {
    const userInfo = request.user;
    const destroyTokenResponse: IServiceTokenDestroyResponse = await this.authMicroServiceClient.send('token_destroy', {
      userId: userInfo._id
    }).toPromise();

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: destroyTokenResponse.message,
          data: null,
          errors: destroyTokenResponse.errors
        },
        destroyTokenResponse.status
      );
    }

    return {
      message: destroyTokenResponse.message,
      errors: null,
      data: null
    };
  }

  @Get('/confirm/:link')
  @ApiCreatedResponse({
    type: ConfirmUserResponseDto
  })
  public async confirmUser(
    @Param() params: ConfirmUserDto
  ): Promise<ConfirmUserResponseDto> {
    const confirmUserResponse: IServiceUserConfirmResponse = await this.userMicroServiceClient.send(
      'user_confirm',
      {
        link: params.link
      }
    ).toPromise();

    if (confirmUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: confirmUserResponse.message,
          data: null,
          errors: confirmUserResponse.errors
        },
        confirmUserResponse.status
      );
    }

    return {
      message: confirmUserResponse.message,
      errors: null,
      data: null
    };
  }

}
