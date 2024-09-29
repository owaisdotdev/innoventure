import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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

export class FundingNeedsDto {
  @ApiProperty({
    description: 'Total funding required for the startup',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    description: 'List of milestones for the startup',
    type: [Types.ObjectId],
  })
  milestones: Types.ObjectId[];
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

  @IsOptional()
  @ApiProperty({
    description: 'Business plan details',
    type: FundingNeedsDto,
  })
  fundingNeeds: FundingNeedsDto;
}
