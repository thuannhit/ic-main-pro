import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException, HttpStatus } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname JwtAccessTokenAuthGuard
 **/
@Injectable()
export class JwtAccessTokenAuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authMicroServiceClient: ClientProxy
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const userTokenInfo: any = await this.authMicroServiceClient
            .send('verify_access_token', {
                token: request.headers.authorization.split(" ")[1],
            })
            .toPromise()
        if (userTokenInfo.status === HttpStatus.OK) {
            request.user = userTokenInfo.data
            return true
        }
        throw new UnauthorizedException(userTokenInfo.message);
    }
}
