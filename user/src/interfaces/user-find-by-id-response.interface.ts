import { UserFullResDTO } from '../dtos/user-full-info-response.dto'
export interface IUserFindByIdRes {
  status: number;
  message: string;
  data: UserFullResDTO | null;
  error: any;
}
