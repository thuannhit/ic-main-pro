import { UserSimpleInfoDTO } from './user-simple-info.dto'
import { BaseResponseDTO } from '../interfaces/common-response.interface'
export class UserSimpleInfoResDTO implements BaseResponseDTO {
    status: number
    data: UserSimpleInfoDTO | null
    message: string | null
    error: string | null
}
