import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({ example: 'thuannh0206@gmail.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ example: 'Testpassword' })
  @IsNotEmpty()
  password: string;
}
