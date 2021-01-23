import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
export class CreateUserReqDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@denrox.com'
  })
  @IsEmail({}, { message: 'it is not a valid email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    minLength: 6,
    example: 'test11'
  })
  @IsNotEmpty()
  password: string;
};
