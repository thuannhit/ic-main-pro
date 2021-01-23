import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator'

export class CustomerDto {

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    _id: number

    @ApiProperty({ example: 'thuannh0206@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ example: 'thuannh' })
    @IsNotEmpty()
    @IsNumber()
    user_name: string

    @ApiProperty({ example: '0358250498' })
    @IsNotEmpty()
    phone_number: string

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    _role_id: number

    @ApiProperty({ example: 0 })
    @IsNotEmpty()
    @IsNumber()
    is_deleted: number

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    is_active: number

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    is_verified: number

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    updated_by: number

    @IsNotEmpty()
    created_at: string

    @IsNotEmpty()
    @IsNumber()
    created_by: number

    @IsNotEmpty()
    updated_at: string
}
