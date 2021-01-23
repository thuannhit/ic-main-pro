import { IICProduct } from '../ic-product.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ICProductListResponseDto {
  @ApiProperty({ example: 'IC Product list' })
  message: string;

  @ApiProperty({
    example: [{ _id: 1, company_name: 'ABC', address: '3C Tôn Đức Thắng', tax_code: '0001', status: 1 }],
    nullable: true
  })
  data: IICProduct[];

  @ApiProperty({ example: null, nullable: true })
  error: any;
}
