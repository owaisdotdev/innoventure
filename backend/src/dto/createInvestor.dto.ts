import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class InvestorPreferencesDto {
  @IsArray()
  @IsNotEmpty()
  sectors: string[];

  @IsArray()
  @IsNotEmpty()
  regions: string[];

  @IsString()
  @IsNotEmpty()
  riskTolerance: string;
}

export class InvestorCriteriaDto {
  @IsNumber()
  @IsNotEmpty()
  minInvestment: number;

  @IsNumber()
  @IsNotEmpty()
  maxInvestment: number;

  @IsString()
  @IsNotEmpty()
  investmentHorizon: string;
}

export class CreateInvestorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  profileStatus: string;

  preferences: InvestorPreferencesDto;
  criteria: InvestorCriteriaDto;
}
