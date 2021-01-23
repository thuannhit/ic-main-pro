import { ApiProperty } from '@nestjs/swagger';

export class ICProductPublishingResponseDto {
    @ApiProperty({ example: 'IC Product is published' })
    message: string;

    @ApiProperty({
        example: {
            _id: 1,
            publishing_amount: 10000,
            publishing_date: 100000000000,
            end_date: 10000000000,
            publishing_price: 10000,
            status: 1
        },
        nullable: true
    })
    data: any;

    @ApiProperty({ example: null, nullable: true })
    error: any;
}
