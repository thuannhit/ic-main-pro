import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface'
export class LoginUserResponseDto {
  @ApiProperty({ example: 'token_create_success' })
  message: string;

  @ApiProperty({
    example: { refresh_token: 'someEncodedToken', access_token: 'someEncodedToken' },
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
