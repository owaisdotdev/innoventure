import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InvestorService } from './investor.service';
import { UpdateInvestorDto } from '../dto/updateInvestor.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common';
import { AdminGuard } from '../guards/role.guard';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Investor } from 'src/schemas/investor.schema';

@ApiTags('Investors')
@Controller('investors')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Get()
  @ApiOperation({ summary: 'Get all investors', description: 'Retrieve a list of all investors.' })
  @ApiResponse({
    status: 200,
    description: 'List of investors retrieved successfully.',
    type: [Investor], 
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch investors.',
  })
  async getAllInvestors() {
    try {
      return await this.investorService.findAllInvestors();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch investors');
    }
  }

  @Get('/email')
  @ApiOperation({ summary: 'Get investor by email', description: 'Retrieve an investor by their email address.' })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email of the investor',
    type: String,
    example: 'investor@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Investor retrieved successfully.',
    type: Investor,
  })
  @ApiResponse({
    status: 400,
    description: 'Email query parameter is required.',
  })
  @ApiResponse({
    status: 404,
    description: 'Investor with the provided email not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investor by email.',
  })
  async getInvestorByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    try {
      const investor = await this.investorService.findByEmail(email);
      if (!investor) {
        throw new NotFoundException(`Investor with email ${email} not found`);
      }
      return investor;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investor by email',
      );
    }
  }

  @Get('/sector')
  @ApiOperation({ summary: 'Get investors by sector', description: 'Retrieve investors based on their preferred sector.' })
  @ApiQuery({
    name: 'sector',
    required: true,
    description: 'Sector to filter investors by',
    type: String,
    example: 'Tech',
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Sector query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by sector.',
  })
  async getBySector(@Query('sector') sector: string) {
    if (!sector) {
      throw new BadRequestException('Sector query parameter is required');
    }
    try {
      return await this.investorService.findBySector(sector);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by sector',
      );
    }
  }

  @Get('/region')
  @ApiOperation({ summary: 'Get investors by region', description: 'Retrieve investors based on their preferred region.' })
  @ApiQuery({
    name: 'region',
    required: true,
    description: 'Region to filter investors by',
    type: String,
    example: 'US',
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Region query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by region.',
  })
  async getInvestorsByRegion(@Query('region') region: string) {
    if (!region) {
      throw new BadRequestException('Region query parameter is required');
    }
    try {
      return await this.investorService.findByRegion(region);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by region',
      );
    }
  }

  @Get('/risk-tolerance')
  @ApiOperation({ summary: 'Get investors by risk tolerance', description: 'Retrieve investors based on their risk tolerance preference.' })
  @ApiQuery({
    name: 'riskTolerance',
    required: true,
    description: 'Risk tolerance level to filter investors by',
    type: String,
    example: 'Medium',
    enum: ['Low', 'Medium', 'High'], 
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Risk tolerance query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by risk tolerance.',
  })
  async getInvestorsByRiskTolerance(
    @Query('riskTolerance') riskTolerance: string,
  ) {
    if (!riskTolerance) {
      throw new BadRequestException(
        'Risk tolerance query parameter is required',
      );
    }
    try {
      return await this.investorService.findByRiskTolerance(riskTolerance);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by risk tolerance',
      );
    }
  }

  @Get('/min-investment')
  @ApiOperation({ summary: 'Get investors by minimum investment', description: 'Retrieve investors based on their minimum investment criteria.' })
  @ApiQuery({
    name: 'minInvestment',
    required: true,
    description: 'Minimum investment amount to filter investors by',
    type: Number,
    example: 1000,
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Minimum investment query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by minimum investment.',
  })
  async getInvestorsByMinInvestment(
    @Query('minInvestment', ParseIntPipe) minInvestment: number,
  ) {
    if (!minInvestment) {
      throw new BadRequestException(
        'Minimum investment query parameter is required',
      );
    }
    try {
      return await this.investorService.findByMinInvestment(minInvestment);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by minimum investment',
      );
    }
  }

  @Get('/max-investment')
  @ApiOperation({ summary: 'Get investors by maximum investment', description: 'Retrieve investors based on their maximum investment criteria.' })
  @ApiQuery({
    name: 'maxInvestment',
    required: true,
    description: 'Maximum investment amount to filter investors by',
    type: Number,
    example: 5000,
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Maximum investment query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by maximum investment.',
  })
  async getInvestorsByMaxInvestment(
    @Query('maxInvestment', ParseIntPipe) maxInvestment: number,
  ) {
    if (!maxInvestment) {
      throw new BadRequestException(
        'Maximum investment query parameter is required',
      );
    }
    try {
      return await this.investorService.findByMaxInvestment(maxInvestment);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by maximum investment',
      );
    }
  }

  @Get('/profile-status')
  @ApiOperation({ summary: 'Get investors by profile status', description: 'Retrieve investors based on their profile status.' })
  @ApiQuery({
    name: 'status',
    required: true,
    description: 'Profile status to filter investors by',
    type: String,
    example: 'active',
    enum: ['active', 'inactive'], // Adjust according to your actual enums
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Profile status query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by profile status.',
  })
  async getInvestorsByProfileStatus(@Query('status') profileStatus: string) {
    if (!profileStatus) {
      throw new BadRequestException(
        'Profile status query parameter is required',
      );
    }
    try {
      return await this.investorService.findByProfileStatus(profileStatus);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by profile status',
      );
    }
  }

  @Get('/investment-range')
  @ApiOperation({ summary: 'Get investors by investment range', description: 'Retrieve investors within a specific investment range.' })
  @ApiQuery({
    name: 'min',
    required: true,
    description: 'Minimum investment amount',
    type: Number,
    example: 1000,
  })
  @ApiQuery({
    name: 'max',
    required: true,
    description: 'Maximum investment amount',
    type: Number,
    example: 100000,
  })
  @ApiResponse({
    status: 200,
    description: 'Investors retrieved successfully.',
    type: [Investor],
  })
  @ApiResponse({
    status: 400,
    description: 'Both min and max query parameters are required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investors by investment range.',
  })
  async getByInvestmentRange(
    @Query('min', ParseIntPipe) minInvestment: number,
    @Query('max', ParseIntPipe) maxInvestment: number,
  ) {
    if (!minInvestment || !maxInvestment) {
      throw new BadRequestException(
        'Both min and max query parameters are required',
      );
    }
    try {
      return await this.investorService.findByInvestmentRange(
        minInvestment,
        maxInvestment,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching investors by investment range',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get investor by ID', description: 'Retrieve a specific investor by their unique ID.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the investor',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Investor retrieved successfully.',
    type: Investor,
  })
  @ApiResponse({
    status: 404,
    description: 'Investor with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching investor by ID.',
  })
  async getInvestorById(@Param('id') id: string) {
    const investor = await this.investorService.findInvestorById(id);
    if (!investor) {
      throw new NotFoundException(`Investor with ID ${id} not found`);
    }
    return investor;
  }


  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update investor', description: 'Update the details of an existing investor.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the investor to update',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiBody({
    type: UpdateInvestorDto,
    description: 'Investor update details',
  })
  @ApiResponse({
    status: 200,
    description: 'Investor updated successfully.',
    type: Investor,
  })
  @ApiResponse({
    status: 404,
    description: 'Investor with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error updating investor.',
  })
  async updateInvestor(
    @Param('id') id: string,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    try {
      const updatedInvestor = await this.investorService.updateInvestor(
        id,
        updateInvestorDto,
      );
      if (!updatedInvestor) {
        throw new NotFoundException(`Investor with ID ${id} not found`);
      }
      return updatedInvestor;
    } catch (error) {
      throw new InternalServerErrorException('Error updating investor');
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete investor', description: 'Delete an existing investor by their unique ID. Requires admin privileges.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the investor to delete',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Investor deleted successfully.',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Investor with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error deleting investor.',
  })
  async deleteInvestor(@Param('id') id: string) {
    try {
      const result = await this.investorService.deleteInvestor(id);
      if (!result) {
        throw new NotFoundException(`Investor with ID ${id} not found`);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting investor', error);
    }
  }
}
