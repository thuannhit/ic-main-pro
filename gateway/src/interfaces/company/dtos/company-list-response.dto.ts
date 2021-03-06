import { ApiProperty } from '@nestjs/swagger';
import { ICompany } from '../company.interface';

export class CompanyListResponseDto {
    @ApiProperty({ example: 'Get list of companies' })
    message: string;

    @ApiProperty({
        example: [{ _id: 1, company_name: 'ABC', address: '3C Tôn Đức Thắng', tax_code: '0001', status: 1 }],
        nullable: true
    })
    data: ICompany[];

    @ApiProperty({ example: null, nullable: true })
    error: any;
}
