
import { UserWithTokens } from './user-with-tokens.dto';

export class ServiceUserRefreshResDTO {
    status: number;
    message: string;
    data: UserWithTokens | null;
    error: any;
}
