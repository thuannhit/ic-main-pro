import { Module } from '@nestjs/common';
import { ICSVCController } from './ic-svc.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { ICSVCService } from './services/ic-svc.service'
@Module({
  imports: [
  ],
  controllers: [
    ICSVCController
  ],
  providers: [
    ConfigService,
    ICSVCService,
    {
      provide: 'DBCONN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const dbConnServiceOptions = configService.get('dbConnService');
        return ClientProxyFactory.create(dbConnServiceOptions);
      },
      inject: [
        ConfigService
      ]
    }
  ]
})
export class SystemConfigModule { }
