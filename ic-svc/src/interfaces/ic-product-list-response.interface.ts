import {BaseResponseDTO} from './common-response.interface'
import { ICProductDTO} from '../dtos/ic-product.dto'
export interface IICProductListRes extends BaseResponseDTO {
  data: ICProductDTO
}
