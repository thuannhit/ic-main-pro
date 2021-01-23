import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface'
export class RefreshUserResponseDto {
    @ApiProperty({ example: 'refreshed' })
    message: string;

    @ApiProperty({
        example: { refreshToken: 'someEncodedToken', accessToken: 'someEncodedToken' },
        nullable: true
    })
    data: {
        accessToken: string,
        refreshToken: string,
        user: IUser
    };

    @ApiProperty({ example: null, nullable: true })
    error: any;
}
