import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateMilestoneDto {
  @ApiProperty({ description: 'Startup Id' })
  @IsString()
  @IsNotEmpty()
  startupId: string | Types.ObjectId;

  @ApiProperty({ description: 'Title of the milestone' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the milestone' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Due date of milestone' })
  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({ description: 'Amount to be released when milestone is completed' })
  @IsNumber()
  @IsNotEmpty()
  amountToBeReleased: number;

  @ApiProperty({ description: 'Status of milestone', example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Associated Smart Contract ID', type: String })
  @IsString()
  @IsOptional()
  associatedSmartContractId?: string;

  @ApiProperty({ description: 'Associated Proposal ID', type: String })
  @IsString()
  @IsOptional()
  proposalId: string;
}

