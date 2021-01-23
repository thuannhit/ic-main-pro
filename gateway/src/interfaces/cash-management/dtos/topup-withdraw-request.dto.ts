import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator'

export class TopupWithdrawReqDto {
    @ApiProperty({ example: 30000000, nullable: false })
    @IsNumber()
    amount: number;

    @ApiProperty({ example: 1000000000, nullable: false })
    @IsNumber()
    @IsNotEmpty()
    date: number;

    @ApiProperty({ example: 'Nop tien', nullable: true })
    note: string;
}
