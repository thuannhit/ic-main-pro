import { Module } from '@nestjs/common';
import { CashManagementController } from './cash-management.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { CashManagementService } from './services/cash-management.service'
@Module({
  imports: [
  ],
  controllers: [
    CashManagementController
  ],
  providers: [
    ConfigService,
    CashManagementService,
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
export class CashManagementModule { }
