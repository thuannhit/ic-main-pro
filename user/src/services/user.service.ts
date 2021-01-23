import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { UserFullResDTO } from '../dtos/user-full-info-response.dto'
import { UserRegisterReqDTO } from '../dtos/user-register-request.dto'

import * as bcrypt from 'bcrypt';
import { UserEssentialInfoReqDTO } from '../dtos/user-esstential-info-request.dto'
import { IUserEssentialInfo } from '../interfaces/user-esstential-info.interface'
import { IUserFullEntityCreation } from '../interfaces/user-creation-entity.interface'

import { ServiceUserFindByCredentialsResDTO } from '../dtos/service-user-find-by-credentials-response.dto'
import { toFullUserResDTO, toEssentialUserInfoResDTO } from '../utils/mapper'
import { UserEntity } from 'src/entities/user.entity';

import { TOKEN_TYPE } from '../utils/token-type.constant'
import { CustomersListResDTO } from 'src/dtos/customers-list-response.dto';
import { UserTokenEntity } from 'src/entities/user-token.entity';
@Injectable()
export class UserService {

  constructor(
    @Inject('DBCONN_SERVICE') private readonly dbConnMicroServiceClient: ClientProxy,
  ) { }

  public async searchUserByEmail(params: { email: string }): Promise<UserFullResDTO | null> {
    try {
      const user: ServiceUserFindByCredentialsResDTO = await this.dbConnMicroServiceClient.send('search_user_by_email', { email: params.email }).toPromise()
      if (user !== null && user.status === HttpStatus.OK && !!user.data) {
        return toFullUserResDTO(user.data)
      }
    } catch (oError) {
      throw oError
    }
  }
  public async findUserById(params: { _id: number }): Promise<UserFullResDTO | null> {
    try {
      const user: ServiceUserFindByCredentialsResDTO = await this.dbConnMicroServiceClient.send('search_user_by_id', { _id: params._id }).toPromise()
      if (user !== null && user.status === HttpStatus.OK) {
        return toFullUserResDTO(user.data)
      }
    } catch (oError) {
      throw oError
    }
  }

  public async getEssentialUserInfo(params: UserEssentialInfoReqDTO): Promise<IUserEssentialInfo> {
    try {
      const response: ServiceUserFindByCredentialsResDTO = (params._id) ? await this.dbConnMicroServiceClient.send('search_user_by_id', { _id: params._id }).toPromise()
        : await this.dbConnMicroServiceClient.send('search_user_by_email', { email: params.email }).toPromise()
      if (response !== null && response.status === HttpStatus.OK) {
        return toEssentialUserInfoResDTO(response.data)
      } else {
        throw new RpcException(response.error)
      }
    } catch (error) {
      throw error
    }
  }

  public async getCustomersList(params: any): Promise<UserFullResDTO[]> {
    try {
      const response: CustomersListResDTO = await this.dbConnMicroServiceClient.send('get_customers_list', {}).toPromise()
      if (response !== null && response.status === HttpStatus.OK) {
        const aCustomers: UserFullResDTO[] = response.data.map(element => {
          return toFullUserResDTO(element)
        })
        return aCustomers
      } else {
        throw new RpcException(response.error)
      }
    } catch (error) {
      throw error
    }
  }

  public async updateRefreshToken(params: { _user_id: number, token_value: string }): Promise<any> {
    try {
      const hashToken = await bcrypt.hash(params.token_value, 10)
      const response: any = await this.dbConnMicroServiceClient.send('update_user_token', { _user_id: params._user_id, token_value: hashToken, token_type: TOKEN_TYPE.REFRESH_TOKEN }).toPromise()
      if (response !== null && response.status === HttpStatus.OK) {
        return response.data
      } else {
        throw new RpcException(response.error)
      }
    } catch (error) {
      throw error
    }
  }

  public async findUserRefreshtoken(_user_id: number): Promise<UserTokenEntity> {
    try {
      const response: any = await this.dbConnMicroServiceClient.send('get_user_token', { _user_id: _user_id, token_type: TOKEN_TYPE.REFRESH_TOKEN }).toPromise()
      if (response !== null && response.status === HttpStatus.OK) {
        return response.data
      } else {
        throw new RpcException(response.error)
      }
    } catch (error) {
      throw error
    }
  }

  public async registerUser(newUser: UserRegisterReqDTO): Promise<UserFullResDTO | null> {
    try {
      const oNewUSer: IUserFullEntityCreation = {
        user_name: newUser.user_name,
        email: newUser.email,
        password: await bcrypt.hash(newUser.password, 10),
        _role_id: 0,
        created_by: 1,
        updated_by: 1,
        name: newUser.name,
        phone_number: '',
        is_deleted: 0,
        is_active: 0,
        is_verified: 0
      }
      const user: UserEntity = await this.dbConnMicroServiceClient.send('add_new_user', oNewUSer).toPromise()
      return toFullUserResDTO(user)
    } catch (oError) {
      throw oError
    }

    //TODO: Send email for verify email
    // userParams.is_confirmed = false;
    // const createdUser = await this.userService.createUser(userParams);
    // const userLink = await this.userService.createUserLink(createdUser.id);
    // delete createdUser.password;
    // result = {
    //   status: HttpStatus.CREATED,
    //   message: 'user_create_success',
    //   user: createdUser,
    //   errors: null
    // };
    // this.mailerServiceClient.send('mail_send', {
    //   to: createdUser.email,
    //   subject: 'Email confirmation',
    //   html: `<center>
    //     <b>Hi there, please confirm your email to use Smoothday.</b><br>
    //     Use the following link for this.<br>
    //     <a href="${this.userService.getConfirmationLink(userLink.link)}"><b>Confirm The Email</b></a>
    //     </center>`
    // }).toPromise();
  }

  // public async searchUserById(id: string): Promise<IUser> {
  //   return this.userModel.findById(id).exec();
  // }

  // public async updateUserById(id: string, userParams: { is_confirmed: boolean }): Promise<IUser> {
  //   return this.userModel.updateOne({ _id: id }, userParams).exec();
  // }

  // public async createUser(user: IUser): Promise<IUser> {
  //   const userModel = new this.userModel(user);
  //   return await userModel.save();
  // }

  // public async createUserLink(id: string): Promise<IUserLink> {
  //   const userLinkModel = new this.userLinkModel({
  //     user_id: id
  //   });
  //   return await userLinkModel.save();
  // }

  // public async getUserLink(link: string): Promise<IUserLink[]> {
  //   return this.userLinkModel.find({ link, is_used: false }).exec();
  // }

  // public async updateUserLinkById(id: string, linkParams: { is_used: boolean }): Promise<IUserLink> {
  //   return this.userLinkModel.updateOne({ _id: id }, linkParams);
  // }

  // public getConfirmationLink(link: string): string {
  //   return `${this.configService.get('baseUri')}:${this.configService.get('gatewayPort')}/users/confirm/${link}`;
  // }

}
