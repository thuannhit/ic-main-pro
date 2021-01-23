import { IUserEssentialInfo } from './user-esstential-info.interface'
export interface IUserEssentialInfoRes {
    status: number
    data: IUserEssentialInfo | null
    message: string | null
    error: string | null
}
