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

@Controller('investors')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Get()
  async getAllInvestors() {
    try {
      return await this.investorService.findAllInvestors();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch investors');
    }
  }

  @Get('/email')
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
  async getInvestorById(@Param('id') id: string) {
    const investor = await this.investorService.findInvestorById(id);
    if (!investor) {
      throw new NotFoundException(`Investor with ID ${id} not found`);
    }
    return investor;
  }


  @UseGuards(JwtAuthGuard)
  @Put('/:id')
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
