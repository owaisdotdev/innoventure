import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class BusinessPlanDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsArray()
  @IsNotEmpty()
  team: string[];
}

export class MilestoneDto {
  milestoneId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @IsNumber()
  @IsNotEmpty()
  fundingRequired: number;
}

export class FundingNeedsDto {
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  milestones: MilestoneDto[];
}

export class CreateStartupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  businessPlan: BusinessPlanDto;
  fundingNeeds: FundingNeedsDto;
}
