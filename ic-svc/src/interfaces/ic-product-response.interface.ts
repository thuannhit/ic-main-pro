import {BaseResponseDTO} from './common-response.interface'
import {ICProductDTO} from '../dtos/ic-product.dto'
export interface IICProductRes extends BaseResponseDTO {
  data: ICProductDTO[]
}
