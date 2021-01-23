import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import  { UserLoginRequestDTO } from './dtos/user-login-request.dto'
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace auth
 * @classname LocalAuthGuard
 **/
@Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
    // canActivate(
    //     context: ExecutionContext,
    // ): boolean | Promise<boolean> | Observable<boolean> {
    //     console.log('context', context.switchToHttp().getRequest())
    //     const request = context.switchToHttp().getRequest();
    //     return false
    // }
// }
@Injectable()
export class LocalAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const loginData: UserLoginRequestDTO = context.switchToRpc().getData()
        if(!loginData || !loginData.password || !loginData.username) throw new RpcException(`Invalid user credentials`)
        return true
    }
}