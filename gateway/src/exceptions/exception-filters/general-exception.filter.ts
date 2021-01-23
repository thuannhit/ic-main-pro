import {
    ExceptionFilter,
    HttpException,
    Catch,
    ArgumentsHost,
    HttpStatus
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { exec } from 'child_process';
import { Request, Response } from 'express';

/**
 * Powered by Lasmile-Works Viet Nam
 * @author Lastmile-Worksのタンビン
 * @namespace filters
 * @classname HttpExceptionFilter
 **/
@Catch()
export class CGeneralExceptionFilter implements ExceptionFilter {
    constructor() { }
    catch(exception: unknown, host: ArgumentsHost) {
        //Init ctx variable
        console.log('exeption', exception)
        const ctx = host.switchToHttp();
        const requestData = ctx.getRequest<Request>();
        const responseData = ctx.getResponse<Response>();
        const httpStatusCode = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        //Handler Http Exception
        return responseData.status(httpStatusCode).json({
            statusCode: httpStatusCode,
            timestamp: new Date().toISOString(),
            path: requestData.url,
            data: null,
            error: (exception instanceof HttpException) ? exception.getResponse() : exception,
        });
    }
}
