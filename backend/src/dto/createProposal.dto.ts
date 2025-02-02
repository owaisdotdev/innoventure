import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  ValidateNested,
  IsMongoId,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class TermsDto {
  @ApiProperty({
    description: 'Percentage of equity offered',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  equity: number;

  @ApiProperty({
    description: 'Investment conditions',
    example: 'Monthly revenue share of 5%',
  })
  @IsString()
  @IsNotEmpty()
  conditions: string;
}

class EscrowStatusDto {
  @ApiProperty({
    description: 'Amount in escrow',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'Date when funds will be released',
    example: '2024-12-31',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({
    description: 'Current escrow status',
    enum: ['In escrow', 'Released'],
    example: 'In escrow',
  })
  @IsEnum(['In escrow', 'Released'])
  @IsNotEmpty()
  status: string;
}

export class CreateProposalDto {
  @ApiProperty({
    description: 'MongoDB ID of the investor',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  investorId: string;

  @ApiProperty({
    description: 'MongoDB ID of the startup',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  startupId: string;

  @ApiProperty({
    description: 'Industry sector of the investment',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({
    description: 'Total investment amount',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  investmentAmount: number;

  @ApiProperty({
    description: 'Investment terms including equity and conditions',
    type: TermsDto,
  })
  @ValidateNested()
  @Type(() => TermsDto)
  @IsNotEmpty()
  terms: TermsDto;

  @ApiProperty({
    description: 'Escrow details including amount and release date',
    type: EscrowStatusDto,
  })
  @ValidateNested()
  @Type(() => EscrowStatusDto)
  @IsNotEmpty()
  escrowStatus: EscrowStatusDto;

  @ApiProperty({
    description: 'Current status of the proposal',
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    example: 'pending',
  })
  @IsEnum(['pending', 'accepted', 'rejected'])
  status: string = 'pending';
}
