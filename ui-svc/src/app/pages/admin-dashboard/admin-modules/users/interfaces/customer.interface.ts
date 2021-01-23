import { UserDTO } from '../dtos/user.dto'
export interface ICustomer extends UserDTO {
    isSelected: boolean
}