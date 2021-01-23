import { Transport } from '@nestjs/microservices';

export class ConfigService {

  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.tokenService = {
      options: {
        port: process.env.AUTH_SERVICE_PORT,
        host: process.env.AUTH_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.orderService = {
      options: {
        port: process.env.ORDER_SERVICE_PORT,
        host: process.env.ORDER_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.permissionService = {
      options: {
        port: process.env.PERMISSION_SERVICE_PORT,
        host: process.env.PERMISSION_SERVICE_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.sysConfigService = {
      options: {
        port: process.env.SYS_CONFIG_PORT,
        host: process.env.SYS_CONFIG_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.icSVCService = {
      options: {
        port: process.env.IC_SVC_PORT,
        host: process.env.IC_SVC_HOST
      },
      transport: Transport.TCP
    };
    this.envConfig.cashManagementService = {
      options: {
        port: process.env.CASH_MANAGEMENT_PORT,
        host: process.env.CASH_MANAGEMENT_HOST
      },
      transport: Transport.TCP
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
