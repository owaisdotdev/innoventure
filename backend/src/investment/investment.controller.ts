import { StartupService } from '../startup/startup.service';
import { SmartContractService } from '../smart-contract/smart-contract.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from '../dto/createInvestment.dto';
import { UpdateInvestmentDto } from '../dto/updateInvestment.dto';
import { Investment } from '../schemas/investment.schema';
import { Types } from 'mongoose';
import { InvestorService } from '../investor/investor.service';

@ApiTags('Investments')
@Controller('investments')
export class InvestmentController {
  constructor(
    private readonly investmentService: InvestmentService,
    private readonly smartContractService: SmartContractService,
    private readonly investorService: InvestorService,
    private readonly startupService: StartupService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new investment' })
  @ApiResponse({
    status: 201,
    description: 'The investment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createInvestment(
    @Body() createInvestmentDto: CreateInvestmentDto,
  ): Promise<Investment> {
    const contract = await this.smartContractService.findsmartContractById(
      createInvestmentDto.contractId.toString(),
    );

    const investor = await this.investorService.findInvestorById(
      createInvestmentDto.investorId.toString(),
    );

    const startup = await this.startupService.findStartupById(
      createInvestmentDto.startupId.toString(),
    );

    if (!contract) {
      throw new NotFoundException(
        `Smart contract with ID ${createInvestmentDto.contractId} not found`,
      );
    }

    if (!investor) {
      throw new NotFoundException(
        `Investor with ID ${createInvestmentDto.investorId} not found`,
      );
    }

    if (!startup) {
      throw new NotFoundException(
        `Startup with ID ${createInvestmentDto.startupId} not found`,
      );
    }

    const updatedDto = {
      ...createInvestmentDto,
      investorId: new Types.ObjectId(investor._id.toString()),
      startupId: new Types.ObjectId(startup._id.toString()),
      contractId: new Types.ObjectId(contract._id.toString()),
    };

    const investment =
      await this.investmentService.createInvestment(updatedDto);

    await this.smartContractService.addInvestmentTosmartContract(
      contract._id.toString(),
      new Types.ObjectId(investment._id.toString()),
    );

    await this.investorService.addInvestmentToInvestor(
      investor._id.toString(),
      new Types.ObjectId(investment._id.toString()),
    );

    await this.startupService.addInvestorToStartup(
      startup._id.toString(),
      new Types.ObjectId(investor._id.toString()),
    );

    return investment;
  }

  @Get()
  @ApiOperation({ summary: 'Get all investments' })
  @ApiResponse({ status: 200, description: 'Returns a list of investments.' })
  async findAllInvestments(): Promise<Investment[]> {
    return this.investmentService.findAllInvestments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get investment by ID' })
  @ApiParam({ name: 'id', description: 'Investment ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns the investment with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  async findInvestmentById(@Param('id') id: string): Promise<Investment> {
    const investment = await this.investmentService.findInvestmentById(id);
    if (!investment)
      throw new NotFoundException(`Investment with ID ${id} not found`);
    return investment;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an investment by ID' })
  @ApiParam({ name: 'id', description: 'Investment ID', type: String })
  @ApiResponse({ status: 200, description: 'The investment has been updated.' })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  async updateInvestment(
    @Param('id') id: string,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
  ): Promise<Investment> {
    return this.investmentService.updateInvestment(id, updateInvestmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an investment by ID' })
  @ApiParam({ name: 'id', description: 'Investment ID', type: String })
  @ApiResponse({ status: 200, description: 'The investment has been deleted.' })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  async deleteInvestment(@Param('id') id: string): Promise<void> {
    return this.investmentService.deleteInvestment(id);
  }

  // Custom Getters with Swagger Decorators

  @Get('by-investor/:investorId')
  @ApiOperation({ summary: 'Get investments by investor ID' })
  @ApiParam({ name: 'investorId', description: 'Investor ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns investments for the given investor.',
  })
  async findInvestmentsByInvestor(
    @Param('investorId') investorId: string,
  ): Promise<Investment[]> {
    return this.investmentService.findInvestmentsByInvestor(investorId);
  }

  @Get('by-startup/:startupId')
  @ApiOperation({ summary: 'Get investments by startup ID' })
  @ApiParam({ name: 'startupId', description: 'Startup ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns investments for the given startup.',
  })
  async findInvestmentsByStartup(
    @Param('startupId') startupId: string,
  ): Promise<Investment[]> {
    return this.investmentService.findInvestmentsByStartup(startupId);
  }

  @Get('by-contract/:contractId')
  @ApiOperation({ summary: 'Get investments by contract ID' })
  @ApiParam({ name: 'contractId', description: 'Contract ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns investments associated with the given contract.',
  })
  async findInvestmentsByContract(
    @Param('contractId') contractId: string,
  ): Promise<Investment[]> {
    return this.investmentService.findInvestmentsByContract(contractId);
  }

  @Get('by-date')
  @ApiOperation({ summary: 'Get investments by date' })
  @ApiQuery({
    name: 'investmentDate',
    description: 'Investment date (YYYY-MM-DD)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns investments made on the specified date.',
  })
  async findInvestmentsByDate(
    @Query('investmentDate') investmentDate: string,
  ): Promise<Investment[]> {
    const date = new Date(investmentDate);
    return this.investmentService.findInvestmentsByDate(date);
  }
}
