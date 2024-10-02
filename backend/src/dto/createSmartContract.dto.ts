import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsMongoId,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class MilestoneStatusDto {
  @ApiProperty({
    description: 'The ID of the milestone',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @IsMongoId()
  @IsNotEmpty()
  milestoneId: Types.ObjectId;

  @ApiProperty({
    description: 'The status of the milestone',
    enum: ['Achieved', 'Pending'],
    example: 'Pending',
  })
  @IsString()
  @IsEnum(['Achieved', 'Pending'])
  @IsNotEmpty()
  status: string;
}

export class TermsDto {
  @ApiProperty({
    description: 'Milestone conditions for the smart contract',
    example: 'Complete phase 1 of project X',
  })
  @IsString()
  @IsNotEmpty()
  milestoneConditions: string;

  @ApiProperty({
    description: 'Escrow amount tied to the contract',
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty()
  escrowAmount: number;
}

export class CreateSmartContractDto {
  @ApiProperty({
    description: 'Investment ID associated with the smart contract (Optional)',
    type: String,
    required: false,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @IsOptional()
  @IsMongoId()
  investmentId?: Types.ObjectId;

  @ApiProperty({
    description: 'Terms of the smart contract',
  })
  @ValidateNested()
  @Type(() => TermsDto) 
  @IsNotEmpty()
  terms: TermsDto;

  @ApiProperty({
    description: 'Milestone statuses associated with the smart contract',
    type: MilestoneStatusDto,
  })
  @Type(() => MilestoneStatusDto) 
  @IsNotEmpty()
  milestoneStatus: MilestoneStatusDto;

  @ApiProperty({
    description: 'Amount in escrow for the smart contract',
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  escrowAmount: number;

  @ApiProperty({
    description: 'Status of the smart contract',
    enum: ['Active', 'Completed'],
    example: 'Active',
  })
  @IsString()
  @IsEnum(['Active', 'Completed'])
  @IsNotEmpty()
  status: string;
}
