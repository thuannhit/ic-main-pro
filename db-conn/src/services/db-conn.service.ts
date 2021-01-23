import {
    Injectable,
    Dependencies,
    NotFoundException,
    HttpStatus,
    HttpException,
    BadRequestException
} from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { UserSearchRequest } from './dto/user-search.request';
// import { INTERNAL_ERROR_CODE, TOKEN_TYPE } from '@commons/constants'
// import {
//     isPasswordMatched,
//     isValidEmail,
//     toUserLoginResDto
// } from '@utilities/index';
import { isValidEmail } from '../utils/validation.utils'
import {
    // UserRegisterReqDTO,
    // UserLoginResDTO,
    // UserRegisterResDTO,
    // UserSimpleDTO,
    // UserTokenDTO
} from '../dtos/user-full-info-response.dto'
import { UserFullEntityExceptPasswordDTO } from '../dtos/user-full-entity-except-password.dto'
import { UserRegisterReqDTO } from '../dtos/user-register-request.dto'
import { UserFullResDTO } from '../dtos/user-full-info-response.dto'
import { ICProductPublishingReqDTO } from '../dtos/ic-product-publishing-request.dto'
import { FinancialStatementsListReqDTO } from '../dtos/financial-statements-list-request.dto'

import { ConfigService } from '@nestjs/config';
import {
    // toUserRegisterResDTO,
    // toSimpleUserDto,
    toFullUserEntityOmitPasswordDTO,
    toFullUserResDTO
} from '../utils/mapper'
import { InsertResult, LessThan, MoreThan, Between } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

import { UserTokenEntity } from '../entities/user-token.entity';
import { UserTokensRepository } from '../repositories/user-token.repository';

import { CompanyEntity } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';

import { ICProductEntity } from '../entities/ic-product.entity';
import { ICProductRepository } from '../repositories/ic-product.repository';

import { PublishedICsEntity } from '../entities/published_ics.entity';
import { PublishedICsRepository } from '../repositories/published-ics.repository';

import { FinancialStatementEntity } from '../entities/financial-statements.entity';
import { FinancialStatementRepository } from '../repositories/financial-statements.repository';



/**
 * @author thuan.nguyen
 * @namespace dbConn
 * @classname DBConnService
 **/
@Injectable()
@Dependencies(
    UserRepository,
    UserTokensRepository,
    CompanyRepository,
    ICProductRepository,
    PublishedICsRepository,
    FinancialStatementRepository
)
export class DBConnService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userTokensRepository: UserTokensRepository,
        private readonly companyRepository: CompanyRepository,
        private readonly icProductRepository: ICProductRepository,
        private readonly publishedICsRepository: PublishedICsRepository,
        private readonly financialStatementRepository: FinancialStatementRepository,
    ) {
    }

    // async findOne(userId: number): Promise<User> {
    //     const userData = await this.userRepository.findOne({ id: userId });
    //     if (!userData) throw new NotFoundException();
    //     return userData;
    // }

    // getUserList(query: UserSearchRequest): Promise<User[]> {
    //     return this.userRepository.searchUser(query);
    // }

    // async getUserIfPasswordMatches(email: string, plainTextPassword: string): Promise<UserLoginResDTO> {
    //     const user = await this.userRepository.findOne({ email: email })
    //     if (!user) {
    //         throw new BadRequestException('Invalid email', INTERNAL_ERROR_CODE.INVALID_USER_NAME);
    //     }
    //     const passwordMatched = await isPasswordMatched(user.password, plainTextPassword);

    //     if (passwordMatched) {
    //         return toUserLoginResDto(user)
    //     }
    //     throw new BadRequestException('Wrong password', INTERNAL_ERROR_CODE.INVALID_PASSWORD);
    // }

    async createNewUser(newUser: UserRegisterReqDTO): Promise<UserEntity> {
        const insertRs: InsertResult = await this.userRepository.insert({
            name: newUser.name,
            password: newUser.password,
            email: newUser.email,
            phone_number: newUser.phone_number,
            user_name: newUser.user_name,
            is_active: newUser.is_active,
            is_deleted: newUser.is_deleted,
            is_verified: newUser.is_verified,
            created_by: newUser.created_by,
            updated_by: newUser.updated_by,
            _role_id: newUser._role_id
        });
        const oUser = await this.userRepository.findOne(insertRs.identifiers[0].id)
        return oUser;

    }

    async updateUserToken(userToken: { token_type: number, token_value: string, _user_id: number }): Promise<UserTokenEntity> {
        try {
            let token = await this.userTokensRepository.findOne({ _user_id: userToken._user_id, token_type: userToken.token_type });

            console.log('userToken', token)
            if (token == null || token == undefined) {
                token = this.userTokensRepository.create({
                    _user_id: userToken._user_id,
                    token_type: userToken.token_type,
                    token_value: userToken.token_value,
                })
            } else {
                token.token_value = userToken.token_value
            }
            const oUserToken: UserTokenEntity = await this.userTokensRepository.save(token);
            return oUserToken
        } catch (error) {
            throw new RpcException('Failed to update token')
        }

    }
    async getUserToken(userToken: { token_type: number, _user_id: number }): Promise<UserTokenEntity> {
        try {
            let token = await this.userTokensRepository.findOne({ _user_id: userToken._user_id, token_type: userToken.token_type });
            return token
        } catch (error) {
            throw new RpcException('Failed to get token')
        }
    }

    // async getUserIfRefreshTokenMatches(refreshToken: string, payload: TJwtPayload): Promise<UserSimpleDTO | null> {
    //     const usertoken = await this.userTokensRepository.findOne({ userId: payload.userId, tokenType: TOKEN_TYPE.REFRESH_TOKEN });
    //     if (!usertoken) {
    //         throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    //     }
    //     const isRefreshTokenMatching = await bcrypt.compare(
    //         refreshToken,
    //         usertoken.tokenValue
    //     );

    //     if (isRefreshTokenMatching) {
    //         return await this.findByPayload(payload)
    //     } else {
    //         throw new HttpException('Token not match', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async setCurrentRefreshToken(refreshToken: string, userId: number): Promise<UserTokenDTO> {
    //     try {
    //         const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10)
    //         let token = await this.userTokensRepository.findOne({ userId: userId, tokenType: TOKEN_TYPE.REFRESH_TOKEN });
    //         if (!token) {
    //             token = await this.userTokensRepository.create({
    //                 userId: userId,
    //                 tokenType: TOKEN_TYPE.REFRESH_TOKEN,
    //                 tokenValue: hashedRefreshToken,
    //             })

    //         } else {
    //             token.tokenValue = hashedRefreshToken
    //         }
    //         await this.userTokensRepository.save(token);
    //         const oUserToken: UserTokenEntity = await this.userTokensRepository.save(token);
    //         return toUserTokenDTO(oUserToken)
    //     } catch (error) {
    //         throw new Error('Failed to update refresh token')
    //     }

    // }

    // public async findByPayload({ email }: TJwtPayload): Promise<UserSimpleDTO | null> {
    //     const user = await this.userRepository.findOne({ where: { email } });
    //     if (user) {
    //         return toSimpleUserDto(user);
    //     }
    //     return null
    // }

    public async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return user
        }
        catch (oError) {
            throw oError
        }
    }

    public async findById(_id: number): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ where: { _id } });
            return user
        } catch (oError) {
            throw new RpcException(oError)
        }
    }

    // public async findById(id: number): Promise<UserSimpleDTO | null> {
    //     const user = await this.userRepository.findOne({ where: { id } });
    //     if (user) toSimpleUserDto(user);
    //     return null
    // }
    public async getCustomersList(): Promise<UserEntity[]> {
        try {
            const users = await this.userRepository.find({ _role_id: 1, is_active: 1, is_deleted: 0, is_verified: 1 });
            return users
        } catch (oError) {
            throw new RpcException(oError)
        }
    }
    public async getCompanyList({ }): Promise<CompanyEntity[]> {
        try {
            const companies = await this.companyRepository.find();
            return companies
        } catch (oError) {
            throw new RpcException(oError)
        }
    }

    async createCompany(newCompany): Promise<CompanyEntity> {
        const insertRs: InsertResult = await this.companyRepository.insert(
            newCompany
        );
        const oUser = await this.companyRepository.findOne(insertRs.identifiers[0].id)
        return oUser;
    }

    async createICProduct(newICProduct): Promise<ICProductEntity> {
        const insertRs: InsertResult = await this.icProductRepository.insert(
            newICProduct
        );
        const oICProduct = await this.icProductRepository.findOne(insertRs.identifiers[0].id)
        return oICProduct;
    }

    async publishICProduct(oData: ICProductPublishingReqDTO): Promise<PublishedICsEntity> {
        try {
            const insertRs: InsertResult = await this.publishedICsRepository.insert(
                oData
            )
            const oICProduct = await this.publishedICsRepository.findOne(insertRs.identifiers[0].id)
            return oICProduct
        } catch (oError) {
            throw new RpcException(oError.message)
        }
    }

    async getPublishICProductList(): Promise<PublishedICsEntity[]> {
        try {
            const publishedProducts: PublishedICsEntity[] = await this.publishedICsRepository.find()
            return publishedProducts
        } catch (oError) {
            throw new RpcException(oError.message)
        }
    }

    async getAvailablePublishICProductList(): Promise<PublishedICsEntity[]> {
        try {
            const available: PublishedICsEntity[] = await this.publishedICsRepository.getAvailableList()
            return available
        } catch (oError) {
            throw new RpcException(oError.message)
        }
    }

    public async getICProductList({ }): Promise<ICProductEntity[]> {
        try {
            const icProductList = await this.icProductRepository.find();
            return icProductList
        } catch (oError) {
            throw new RpcException(oError)
        }
    }

    public async getFinancialStatements(oData: FinancialStatementsListReqDTO): Promise<{ statements: FinancialStatementEntity[], count: number }> {
        try {
            const [financialStatementsList, count] = await this.financialStatementRepository.findAndCount({
                where: { _user_id: oData.user_id, date: Between(oData.from_date, oData.to_date) },
                skip: oData.offset,
                take: oData.limit
            });
            return { statements: financialStatementsList, count }
        } catch (oError) {
            throw new RpcException(oError)
        }
    }

    public async getCurrentBalance(user_id: number): Promise<number> {
        try {
            let statement = await this.financialStatementRepository.find({
                where: { _user_id: user_id },
                order: {
                    _id: 'DESC'
                },
                take: 1
            })
            return !!statement && statement.length === 1 ? Number(statement[0].balance) : 0
        } catch (oError) {
            throw new RpcException(oError)
        }
    }

    public async createNewFinancialStatement(oData: any): Promise<FinancialStatementEntity> {
        try {
            const insertRs: InsertResult = await this.financialStatementRepository.insert(
                oData
            )
            const statement: FinancialStatementEntity = await this.financialStatementRepository.findOne(insertRs.identifiers[0].id)
            return statement
        } catch (oError) {
            throw new RpcException(oError)
        }
    }
}
