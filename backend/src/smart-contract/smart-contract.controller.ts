import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { SmartContractService } from './smart-contract.service';
import { CreateSmartContractDto } from '../dto/createSmartContract.dto';
import { UpdateSmartContractDto } from '../dto/updateSmartContract.dto';
import { SmartContract } from '../schemas/smartContract.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MilestoneService } from '../milestone/milestone.service';

@ApiTags('SmartContracts')
@Controller('smart-contracts')
export class SmartContractController {
  constructor(private readonly smartContractService: SmartContractService, private readonly mileStoneServive: MilestoneService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a Smart Contract' })
  @ApiBody({
    type: CreateSmartContractDto,
    description: 'Details to create a Smart Contract',
  })
  @ApiResponse({
    status: 201,
    description: 'Smart Contract successfully created.',
    type: SmartContract,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Missing or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async createSmartContract(
    @Body() createSmartContractDto: CreateSmartContractDto,
  ): Promise<SmartContract> {
    const milestone = await this.mileStoneServive.findMilestoneById(
      createSmartContractDto.milestoneStatus.milestoneId.toString(),
    );

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${createSmartContractDto.milestoneStatus.milestoneId} not found`);
    }

    const smartContract = await this.smartContractService.createsmartContract(
      createSmartContractDto,
    );

    await this.mileStoneServive.addSmartContractToMilestone(milestone._id.toString(), new Types.ObjectId(smartContract._id.toString()))
  
    return smartContract;
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Smart Contracts' })
  @ApiResponse({
    status: 200,
    description: 'List of Smart Contracts retrieved successfully.',
    type: [SmartContract],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async findAllSmartContracts(): Promise<SmartContract[]> {
    return this.smartContractService.findAllsmartContracts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a Smart Contract by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the Smart Contract',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Smart Contract retrieved successfully.',
    type: SmartContract,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Smart Contract not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async findSmartContractById(@Param('id') id: string): Promise<SmartContract> {
    return this.smartContractService.findsmartContractById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a Smart Contract by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the Smart Contract to update',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiBody({
    type: UpdateSmartContractDto,
    description: 'Details to update the Smart Contract',
  })
  @ApiResponse({
    status: 200,
    description: 'Smart Contract updated successfully.',
    type: SmartContract,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format or bad request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Smart Contract not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async updateSmartContract(
    @Param('id') id: string,
    @Body() updateSmartContractDto: UpdateSmartContractDto,
  ): Promise<SmartContract> {
    return this.smartContractService.updatesmartContract(
      id,
      updateSmartContractDto,
    );
  }

  @Post(':id/investment')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add an Investment to a Smart Contract',
    description: 'Associates an Investment ID with a Smart Contract.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the Smart Contract',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        investmentId: {
          type: 'string',
          description: 'ID of the Investment to associate',
          example: '60c72b2f9b1d8e1a4c8e4b3b',
        },
      },
      required: ['investmentId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Investment added to Smart Contract successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Smart Contract not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async addInvestmentToSmartContract(
    @Param('id') id: string,
    @Body('investmentId') investmentId: string,
  ): Promise<void> {
    if (!Types.ObjectId.isValid(investmentId)) {
      throw new BadRequestException('Invalid Investment ID format');
    }

    await this.smartContractService.addInvestmentTosmartContract(
      id,
      new Types.ObjectId(investmentId),
    );
  }

  /**
   * Retrieve Smart Contracts by Status
   */
  @Get('status/:status')
  @ApiOperation({ summary: 'Retrieve Smart Contracts by Status' })
  @ApiParam({
    name: 'status',
    description: 'Status to filter Smart Contracts by',
    type: String,
    enum: ['Active', 'Completed'],
    example: 'Active',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Smart Contracts filtered by status.',
    type: [SmartContract],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async findByStatus(
    @Param('status') status: string,
  ): Promise<SmartContract[]> {
    return this.smartContractService.findByStatus(status);
  }

  /**
   * Retrieve Smart Contracts by Investment ID
   */
  @Get('investment/:investmentId')
  @ApiOperation({ summary: 'Retrieve Smart Contracts by Investment ID' })
  @ApiParam({
    name: 'investmentId',
    description: 'Investment ID to filter Smart Contracts by',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Smart Contracts associated with the Investment ID.',
    type: [SmartContract],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async findByInvestmentId(
    @Param('investmentId') investmentId: string,
  ): Promise<SmartContract[]> {
    return this.smartContractService.findByInvestmentId(investmentId);
  }
}
