import { CustomerDto } from './customer.dto';

export class CustomersListResDTO {
    message: string;
    data: CustomerDto[] | null;
    error: any;
}
