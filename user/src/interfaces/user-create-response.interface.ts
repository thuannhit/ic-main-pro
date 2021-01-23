import {UserFullResDTO} from '../dtos/user-full-info-response.dto'
export interface IUserCreateResponse {
  status: number;
  message: string;
  data: UserFullResDTO | null;
  error: any;
}
