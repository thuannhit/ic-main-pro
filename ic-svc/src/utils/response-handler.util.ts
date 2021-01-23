
import { HttpStatus } from '@nestjs/common';

/**
 * Powered by Thuan Nguyen
 * @author thuan.nguyen
 * @namespace Commons
 * @classname ResponseCommon
 **/
export class ResponseCommon {
    /**
     * @author Thuan Nguyen
     * @method sync
     * @param objData?: Object
     * @return 
     **/
    public static returnResponseSuccess(data?: any, message?: string, error?: any) {
        return {
            status: HttpStatus.OK,
            data: data,
            message: message,
            error: error
        };
    }
}
