import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsMongoId,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateInvestmentDto {
  @ApiProperty({
    description: 'ID of the investor',
    type: String,
    example: '60c72b2f9b1e8a5b6cddc9e1',
  })
  @IsNotEmpty()
  @IsMongoId()
  investorId: Types.ObjectId;

  @ApiProperty({
    description: 'ID of the startup',
    type: String,
    example: '60c72b2f9b1e8a5b6cddc9e2',
  })
  @IsNotEmpty()
  @IsMongoId()
  startupId: Types.ObjectId;

  @ApiProperty({
    description: 'Amount invested',
    type: Number,
    example: 50000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Percentage of equity',
    type: Number,
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  equity: number;

  @ApiProperty({
    description: 'Conditions of the investment',
    type: String,
    example: 'Investor holds 10% equity with no voting rights',
  })
  @IsNotEmpty()
  @IsString()
  conditions: string;

  @ApiProperty({
    description: 'Amount held in escrow',
    type: Number,
    example: 25000,
  })
  @IsNotEmpty()
  @IsNumber()
  escrowAmount: number;

  @ApiProperty({
    description: 'Date the escrow amount will be released',
    type: Date,
    example: '2024-12-31T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  escrowReleaseDate: Date;

  @ApiProperty({
    description: 'Status of the escrow funds',
    enum: ['In escrow', 'Released'],
    example: 'In escrow',
  })
  @IsNotEmpty()
  @IsEnum(['In escrow', 'Released'])
  escrowStatus: string;

  @ApiProperty({
    description: 'ID of the associated smart contract',
    type: String,
    example: '60c72b2f9b1e8a5b6cddc9e3',
  })
  @IsNotEmpty()
  @IsMongoId()
  contractId: Types.ObjectId;

  @ApiProperty({
    description: 'Date the contract was signed',
    type: Date,
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  signedDate: Date;

  @ApiProperty({
    description: 'Percentage of equity held',
    type: Number,
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  equityDistribution: number;
}
