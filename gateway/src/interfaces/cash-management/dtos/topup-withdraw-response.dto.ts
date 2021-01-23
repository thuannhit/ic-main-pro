import { ApiProperty } from '@nestjs/swagger';
import { IFinancialStatement } from '../financial-statement.interface';

export class TopupWithdrawResponseDto {
    @ApiProperty({ example: 'Topup/withdraw is created' })
    message: any;

    @ApiProperty({
        example: { },
        nullable: true
    })
    data: IFinancialStatement;

    @ApiProperty({ example: null, nullable: true })
    error: any;
}
