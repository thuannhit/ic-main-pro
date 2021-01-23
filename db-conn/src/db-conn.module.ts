import { Module } from '@nestjs/common'
import { AppController } from './db-conn.controller'
import { DBConnService } from './services/db-conn.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, TypeOrmConfigService } from './services/config'

import { UserEntity } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'

import { UserTokenEntity } from './entities/user-token.entity'
import { UserTokensRepository } from './repositories/user-token.repository'

import { CompanyEntity } from './entities/company.entity'
import { CompanyRepository } from './repositories/company.repository'

import { ICProductEntity } from './entities/ic-product.entity'
import { ICProductRepository } from './repositories/ic-product.repository'

import { PublishedICsEntity } from './entities/published_ics.entity'
import { PublishedICsRepository } from './repositories/published-ics.repository'

import { FinancialStatementEntity } from './entities/financial-statements.entity'
import { FinancialStatementRepository } from './repositories/financial-statements.repository'
@Module({
  imports: [
    ConfigService,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      UserEntity, UserRepository,
      UserTokenEntity, UserTokensRepository,
      CompanyEntity, CompanyRepository,
      ICProductEntity, ICProductRepository,
      PublishedICsEntity, PublishedICsRepository,
      FinancialStatementEntity, FinancialStatementRepository
    ]),
  ],
  controllers: [AppController],
  providers: [DBConnService],
})
export class DBConnModule { }
