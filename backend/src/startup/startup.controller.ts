import {
  Controller,
  Get,
  Post, // Added
  Param,
  Query,
  Put,
  Delete,
  Body,
  UseGuards,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/role.guard';
import { StartupService } from './startup.service';
import { CreateStartupDto } from '../dto/createStartup.dto'; // Added
import { UpdateStartupDto } from '../dto/updateStartup.dto';
import { Startup } from '../schemas/startup.schema';

@ApiTags('Startups')
@Controller('startups')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post() // Added
  @ApiOperation({
    summary: 'Create a new startup',
    description: 'Register a new startup in the system.',
  })
  @ApiBody({
    type: CreateStartupDto,
    description: 'Startup creation details',
  })
  @ApiResponse({
    status: 201,
    description: 'Startup created successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (e.g., duplicate email).',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while creating startup.',
  })
  async createStartup(@Body() createStartupDto: CreateStartupDto): Promise<Startup> {
    try {
      return await this.startupService.createStartup(createStartupDto);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Failed to create startup: ${error.message}`);
    }
  }

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
    description: 'Internal server error while fetching startups.',
  })
  async getAllStartups(): Promise<Startup[]> {
    try {
      return await this.startupService.findAllStartups();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch startups: ${error.message}`);
    }
  }

  @Get('/email')
  @ApiOperation({
    summary: 'Get startup by email',
    description: 'Retrieve a startup by their email address.',
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
    description: 'Startup retrieved successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 400,
    description: 'Email query parameter is required.',
  })
  @ApiResponse({
    status: 404,
    description: 'Startup with the provided email not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while fetching startup by email.',
  })
  async getStartupByEmail(@Query('email') email: string): Promise<Startup> {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    const startup = await this.startupService.findByEmail(email);
    if (!startup) {
      throw new NotFoundException(`Startup with email ${email} not found`);
    }
    return startup;
  }

  @Get('/industry')
  @ApiOperation({
    summary: 'Get startups by industry',
    description: 'Retrieve startups based on their industry.',
  })
  @ApiQuery({
    name: 'industry',
    required: true,
    description: 'Industry to filter startups by',
    type: String,
    example: 'AI',
  })
  @ApiResponse({
    status: 200,
    description: 'Startups retrieved successfully.',
    type: [Startup],
  })
  @ApiResponse({
    status: 400,
    description: 'Industry query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while fetching startups by industry.',
  })
  async getByIndustry(@Query('industry') industry: string): Promise<Startup[]> {
    if (!industry) {
      throw new BadRequestException('Industry query parameter is required');
    }
    try {
      return await this.startupService.findByIndustry(industry);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch startups by industry: ${error.message}`);
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
    description: 'Startup retrieved successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 404,
    description: 'Startup with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while fetching startup by ID.',
  })
  async getStartupById(@Param('id') id: string): Promise<Startup> {
    const startup = await this.startupService.findStartupById(id);
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
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
    description: 'Startup update details',
  })
  @ApiResponse({
    status: 200,
    description: 'Startup updated successfully.',
    type: Startup,
  })
  @ApiResponse({
    status: 404,
    description: 'Startup with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while updating startup.',
  })
  async updateStartup(
    @Param('id') id: string,
    @Body() updateStartupDto: UpdateStartupDto,
  ): Promise<Startup> {
    try {
      const updatedStartup = await this.startupService.updateStartup(id, updateStartupDto);
      if (!updatedStartup) {
        throw new NotFoundException(`Startup with ID ${id} not found`);
      }
      return updatedStartup;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Failed to update startup: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete startup',
    description: 'Delete an existing startup by their unique ID. Requires admin privileges.',
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
    description: 'Startup deleted successfully.',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Startup with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while deleting startup.',
  })
  async deleteStartup(@Param('id') id: string): Promise<boolean> {
    try {
      const result = await this.startupService.deleteStartup(id);
      if (!result) {
        throw new NotFoundException(`Startup with ID ${id} not found`);
      }
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Failed to delete startup: ${error.message}`);
    }
  }
}