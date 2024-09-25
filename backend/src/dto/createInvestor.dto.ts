import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class InvestorPreferencesDto {
  @ApiProperty({ description: 'Investment sectors of interest', example: ['Tech', 'Finance'] })
  @IsArray()
  @IsNotEmpty()
  sectors: string[];

  @ApiProperty({ description: 'Regions of interest for investment', example: ['US', 'Europe'] })
  @IsArray()
  @IsNotEmpty()
  regions: string[];

  @ApiProperty({ description: 'Risk tolerance level', example: 'Medium' })
  @IsString()
  @IsNotEmpty()
  riskTolerance: string;
}

export class InvestorCriteriaDto {
  @ApiProperty({ description: 'Minimum investment amount', example: 10000 })
  @IsNumber()
  @IsNotEmpty()
  minInvestment: number;

  @ApiProperty({ description: 'Maximum investment amount', example: 100000 })
  @IsNumber()
  @IsNotEmpty()
  maxInvestment: number;

  @ApiProperty({ description: 'Investment horizon or timeframe', example: '5 years' })
  @IsString()
  @IsNotEmpty()
  investmentHorizon: string;
}

export class CreateInvestorDto {
  @ApiProperty({ description: 'Name of the investor', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email address of the investor', example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password for the investor account', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Profile status of the investor', example: 'active' })
  @IsString()
  @IsNotEmpty()
  profileStatus: string;

  @ApiProperty({ description: 'Preferences for investments', type: InvestorPreferencesDto })
  preferences: InvestorPreferencesDto;

  @ApiProperty({ description: 'Investment criteria details', type: InvestorCriteriaDto })
  criteria: InvestorCriteriaDto;
}
