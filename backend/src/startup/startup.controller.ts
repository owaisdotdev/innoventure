import { Startup } from '../schemas/startup.schema';
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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/role.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StartupService } from './startup.service';
import { UpdateStartupDto } from '../dto/updateStartup.dto';

@ApiTags('Startups')
@Controller('startups')
export class StartupController {
  constructor(private readonly startupservice: StartupService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all startups',
    description: 'Retrieve a list of all startups.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of startups retrieved successfully.',
    type: [Startup],
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch startups.',
  })
  async getAllStartups() {
    try {
      return await this.startupservice.findAllStartups();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch startups');
    }
  }

  @Get('/email')
  @ApiOperation({
    summary: 'Get startup by email',
    description: 'Retrieve an startup by their email address.',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email of the startup',
    type: String,
    example: 'startup@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'startup retrieved successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 400,
    description: 'Email query parameter is required.',
  })
  @ApiResponse({
    status: 404,
    description: 'startup with the provided email not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching startup by email.',
  })
  async getStartupByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    try {
      const startup = await this.startupservice.findByEmail(email);
      if (!startup) {
        throw new NotFoundException(`startup with email ${email} not found`);
      }
      return startup;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching startup by email');
    }
  }

  @Get('/industry')
  @ApiOperation({
    summary: 'Get startups by industry',
    description: 'Retrieve startups based on their industry.',
  })
  @ApiQuery({
    name: 'status',
    required: true,
    description: 'industry to filter startups by',
    type: String,
    example: 'AI',
  })
  @ApiResponse({
    status: 200,
    description: 'startups retrieved successfully.',
    type: [Startup],
  })
  @ApiResponse({
    status: 400,
    description: 'industry query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching startups by industry.',
  })
  async getByIndustry(@Query('industry') industry: string) {
    if (!industry) {
      throw new BadRequestException('industry query parameter is required');
    }
    try {
      return await this.startupservice.findByIndustry(industry);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching startups by industry',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get startup by ID',
    description: 'Retrieve a specific startup by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the startup',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'startup retrieved successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 404,
    description: 'startup with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching startup by ID.',
  })
  async getStartupById(@Param('id') id: string) {
    const startup = await this.startupservice.findStartupById(id);
    if (!startup) {
      throw new NotFoundException(`startup not found`);
    }
    return startup;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({
    summary: 'Update startup',
    description: 'Update the details of an existing startup.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the startup to update',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiBody({
    type: UpdateStartupDto,
    description: 'startup update details',
  })
  @ApiResponse({
    status: 200,
    description: 'startup updated successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 404,
    description: 'startup with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error updating startup.',
  })
  async updateStartup(
    @Param('id') id: string,
    @Body() updatestartupDto: UpdateStartupDto,
  ) {
    try {
      const updatedstartup = await this.startupservice.updateStartup(
        id,
        updatestartupDto,
      );
      if (!updatedstartup) {
        throw new NotFoundException(`startup not found`);
      }
      return updatedstartup;
    } catch (error) {
      throw new InternalServerErrorException('Error updating startup');
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete startup',
    description:
      'Delete an existing startup by their unique ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the startup to delete',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'startup deleted successfully.',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'startup with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error deleting startup.',
  })
  async deleteStartup(@Param('id') id: string) {
    try {
      const result = await this.startupservice.deleteStartup(id);
      if (!result) {
        throw new NotFoundException(`startup not found`);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting startup', error);
    }
  }
}
