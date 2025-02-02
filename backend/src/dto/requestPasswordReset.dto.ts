import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty({
    description: 'Email of the user requesting password reset',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role of the user requesting password reset',
    example: 'investor',
    enum: ['investor', 'startup', 'admin'],
  })
  @IsEnum(['investor', 'startup', 'admin'])
  role: 'investor' | 'startup' | 'admin';
}
