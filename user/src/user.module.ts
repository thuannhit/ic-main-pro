import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config/config.service';
import { UserEntity } from './entities/user.entity'
import { UserTokenEntity } from './entities/user-token.entity'
import { UserRepository } from './repositories/user.repository'
import { UserTokensRepository } from './repositories/user-token.repository'

@Module({
  imports: [
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserEntity, UserRepository, UserTokenEntity, UserTokensRepository,
    UserService,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mailerServiceOptions = configService.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [
        ConfigService
      ]
    },
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
export class UserModule { }
