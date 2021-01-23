import { ApiProperty } from '@nestjs/swagger';
import { IFinancialStatement } from '../financial-statement.interface';

export class FinancialStatementsListResponseDto {
    @ApiProperty({ example: 'Get list of Financial statement' })
    message: string;

    @ApiProperty({
        example: [{ }],
        nullable: true
    })
    data: IFinancialStatement[];

    @ApiProperty({ example: null, nullable: true })
    error: any;
}
