import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserResponseDto } from '../interfaces/user/dto/login-user-response.dto';
import { ServiceUserLoginResDTO } from '../interfaces/user/dto/service-user-login-response.dto'
import { UserWithTokens } from '../interfaces/user/dto/user-with-tokens.dto'
/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname LocalStrategy
 **/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authMicroServiceClient: ClientProxy,
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<UserWithTokens | null> {
        try {
            const response: ServiceUserLoginResDTO = await this.authMicroServiceClient.send('login', { username, password }).toPromise()
            if (response.status === HttpStatus.OK) {
                return response.data
            }
            throw new HttpException(response.error, HttpStatus.UNAUTHORIZED)
        } catch (oError) {
            throw oError
        }
    }
}