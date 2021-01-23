import { Transport } from '@nestjs/microservices';

export class ConfigService {

  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.CASH_MANAGEMENT_PORT,
    };
    this.envConfig.dbConnService = {
      options: {
        port: process.env.DB_CONN_PORT,
        host: process.env.DB_CONN_HOST
      },
      transport: Transport.TCP
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
