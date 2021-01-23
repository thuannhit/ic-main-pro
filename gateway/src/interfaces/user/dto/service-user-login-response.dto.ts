
import { UserWithTokens } from './user-with-tokens.dto';

export class ServiceUserLoginResDTO {
    status: number;
    message: string;
    data: UserWithTokens | null;
    error: any;
}
