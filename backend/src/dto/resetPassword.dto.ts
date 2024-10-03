import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email of the user resetting the password',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role of the user resetting the password',
    example: 'investor',
    enum: ['investor', 'startup', 'admin'],
  })
  @IsEnum(['investor', 'startup', 'admin'])
  role: 'investor' | 'startup' | 'admin';

  @ApiProperty({
    description: "Reset code sent to the user's email",
    example: 'ABC123',
  })
  @IsNotEmpty()
  resetCode: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'newSecurePassword!@#',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
