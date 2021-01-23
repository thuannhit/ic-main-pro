import { Catch, ArgumentsHost, RpcExceptionFilter, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { exec } from 'child_process';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace filters
 * @classname CGeneralExceptionFilter
 **/
@Catch()
export class CGeneralExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log('exeption', exception)
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            data: null,
            message: 'DB_CONN_SERVICE: ' + exception.message,
            error: exception.error

        };
    }
}