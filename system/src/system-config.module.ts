import { Module } from '@nestjs/common';
import { SystemConfigController } from './system-config.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { SysConfigService } from './services/sys-config.service'
@Module({
  imports: [
  ],
  controllers: [
    SystemConfigController
  ],
  providers: [
    ConfigService,
    SysConfigService,
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
