import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { OrdersController } from './orders.controller';
import { SysConfigController } from './sys-config.controller';
import { ICSVCController } from './ic.controller'
import { CashManagementController } from './cash-management.controller'

import { AuthGuard } from './services/guards/authorization.guard';
import { PermissionGuard } from './services/guards/permission.guard';

import { ConfigService } from './services/config/config.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local.strategy'
@Module({
  imports: [PassportModule],
  controllers: [
    UsersController,
    OrdersController,
    SysConfigController,
    ICSVCController,
    CashManagementController
  ],
  providers: [
    ConfigService,
    LocalStrategy,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('tokenService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('orderService'));
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'PERMISSION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('permissionService'));
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'SYS_CONFIG_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('sysConfigService'));
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'IC_SVC_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('icSVCService'));
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: 'CASH_MANAGEMENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('cashManagementService'));
      },
      inject: [
        ConfigService
      ]
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]
})
export class AppModule { }
