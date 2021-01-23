import { BaseResponseDTO } from './common-response.interface'
import { ICProductPublishedDTO } from '../dtos/ic-product-publishing.dto'
export interface IICProductPublishingRes extends BaseResponseDTO {
    data: ICProductPublishedDTO
}
