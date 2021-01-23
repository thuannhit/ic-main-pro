import { UserEssentialInfoDTO  } from './user-esstential-info.dto'
import {BaseResponseDTO} from '../interfaces/common-response.interface'
export class UserEssentialInfoResDTO implements BaseResponseDTO {
    status: number
    data: UserEssentialInfoDTO | null
    message: string | null
    error: string | null
}
