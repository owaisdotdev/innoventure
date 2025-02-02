import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class BusinessPlanDto {
  @ApiProperty({
    description: 'Description of the business plan',
    example: 'Our business plan focuses on revolutionizing tech solutions',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The industry the startup operates in',
    example: 'Tech',
  })
  @IsString()
  @IsNotEmpty()
  industry: string;
}

export class FydpDetailsDto {
  @ApiProperty({
    description: 'University where the FYDP was conducted',
    example: 'University of Lahore',
  })
  @IsString()
  @IsNotEmpty()
  university: string;

  @ApiProperty({
    description: 'Year of the FYDP',
    example: 2023,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Supervisor overseeing the FYDP',
    example: 'Dr. Ali Khan',
  })
  @IsString()
  @IsNotEmpty()
  supervisorName: string;

  @ApiProperty({
    description: 'GitHub repository URL for the FYDP (optional)',
    example: 'https://github.com/username/fydp',
  })
  @IsString()
  @IsOptional()
  githubRepoUrl?: string;

  @ApiProperty({
    description: 'Tags for categorizing the FYDP',
    example: ['IoT', 'Automation', 'Agriculture'],
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Additional remarks or notes',
    example: 'This project was a finalist in the National Competition.',
  })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateStartupDto {
  @ApiProperty({
    description: 'Name of the startup',
    example: 'Startup Co',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address of the startup',
    example: 'startup@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the startup account',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Business plan details',
    type: BusinessPlanDto,
  })
  businessPlan: BusinessPlanDto;

  @ApiProperty({
    description: 'Indicates whether the entity is an FYDP',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isFydp?: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'FYDP-specific details',
    type: FydpDetailsDto,
  })
  @ValidateNested()
  @Type(() => FydpDetailsDto)
  fydpDetails?: FydpDetailsDto;
}
