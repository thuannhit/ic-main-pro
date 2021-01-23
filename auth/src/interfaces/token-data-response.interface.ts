import {TJwtPayload} from './jwt-payload.type'
export interface ITokenDataResponse {
  status: number;
  message: string;
  data: TJwtPayload | null;
}
