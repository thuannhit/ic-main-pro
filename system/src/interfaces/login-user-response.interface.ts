import { UserSimpleInfoDTO } from '../dtos/user-simple-info.dto'
import {BaseResponseDTO} from './common-response.interface'
export interface ILoginUserResponse extends BaseResponseDTO {
  data: {
    accessToken: string,
    refreshToken: string,
    user: UserSimpleInfoDTO
  };
}
