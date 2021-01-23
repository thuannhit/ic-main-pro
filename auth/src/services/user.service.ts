import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcrypt';

import { UserEssentialInfoDTO } from '../dtos/user-esstential-info.dto'
import { UserSimpleInfoDTO } from '../dtos/user-simple-info.dto'
import { UserEssentialInfoResDTO } from '../dtos/user-esstential-info-response.dto'
import { UserSimpleInfoResDTO } from '../dtos/user-simple-info-response.dto'

import { toSimpleUserDto } from '../utils/mapper'
import { isPasswordMatched } from '../utils/auth.utils'

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_SERVICE') private readonly userMicroServiceClient: ClientProxy,
    ) { }

    async getUserIfPasswordMatches(email: string, plainTextPassword: string): Promise<UserSimpleInfoDTO> {
        try {

            const response: UserEssentialInfoResDTO = await this.userMicroServiceClient.send('get_essential_user_info', { email: email }).toPromise()
            if (response.data && response.status == HttpStatus.OK) {
                const user: UserEssentialInfoDTO = response.data
                const passwordMatched = await isPasswordMatched(user.password, plainTextPassword);
                if (passwordMatched) {
                    return toSimpleUserDto(user)
                }
            }
            throw new RpcException(response.error);

        } catch (error) {
            throw error
        }
    }
    async updateUserRefreshToken(oToken: { _user_id: number, token_value: string }): Promise<boolean> {
        try {
            const response: any = await this.userMicroServiceClient.send('update_user_refresh_token', { _user_id: oToken._user_id, token_value: oToken.token_value, }).toPromise()
            if (response.data && response.status == HttpStatus.OK) {
                return true
            }
            throw new RpcException(response.error);

        } catch (error) {
            throw error
        }
    }

    async getUserIfTokenMatches(_user_id: number, refreshToken: string): Promise<UserSimpleInfoDTO | null> {
        const usertoken = await this.userMicroServiceClient.send('get_user_refresh_token', { _user_id: _user_id, }).toPromise();
        if (!usertoken || usertoken.status !== HttpStatus.OK) {
            throw new RpcException(`Token not found: ${usertoken.message}`);
        }
        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            usertoken.data.token_value
        );

        if (isRefreshTokenMatching) {
            const response: UserSimpleInfoResDTO = await this.userMicroServiceClient.send('find_user_by_id', { _user_id: _user_id }).toPromise()
            return toSimpleUserDto(response.data)
        } else {
            throw new RpcException(`Token not match`)
        }
    }
}
