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
  Post,
  HttpCode,
} from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { UpdateMilestoneDto } from '../dto/updateMilestone.dto';
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
import { Milestone } from '../schemas/milestone.schema';
import { CreateMilestoneDto } from '../dto/createMilestone.dto';
import { StartupService } from '../startup/startup.service';

@ApiTags('Milestones')
@Controller('milestones')
export class MilestoneController {
  constructor(
    private readonly milestoneService: MilestoneService,
    private readonly startupService: StartupService,
  ) {}

  @Post('create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a milestone' })
  @ApiResponse({
    status: 201,
    description: 'Milestone successfully created.',
    type: Milestone, 
  })
  @ApiResponse({ status: 404, description: 'Startup with the provided ID not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    type: CreateMilestoneDto,
    description: 'Milestone creation details',
  })
  async createMilestone(@Body() createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    try {
      const startup = await this.startupService.findStartupById(
        createMilestoneDto.startupId,
      );

      if (!startup) {
        throw new NotFoundException(`Startup with ID ${createMilestoneDto.startupId} not found`);
      }

      const milestone =
        await this.milestoneService.createMilestone(createMilestoneDto);

      // @ts-ignore
      await this.startupService.addMilestoneToStartup(createMilestoneDto.startupId, milestone._id);
  
      return milestone;
    } catch (error) {
      console.error(
        'Error during milestone creation:',
        error.stack || error.message,
      );
  
      if (error instanceof NotFoundException) {
        throw error;
      }
  
      throw new InternalServerErrorException(
        'An error occurred during the milestone creation process',
      );
    }
  }
    
  @Get()
  @ApiOperation({
    summary: 'Get all milestones',
    description: 'Retrieve a list of all milestones.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of milestones retrieved successfully.',
    type: [Milestone],
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch milestones.',
  })
  async getAllMilestones() {
    try {
      return await this.milestoneService.findAllMilestones();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch milestones');
    }
  }

  @Get('/title')
  @ApiOperation({
    summary: 'Get milestones by tile',
    description: 'Retrieve milestones based on their title.',
  })
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'Tilte to filter milestones by',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'milestones retrieved successfully.',
    type: [Milestone],
  })
  @ApiResponse({
    status: 400,
    description: 'Title query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching milestones by title.',
  })
  async getMilestonesByTitle(@Query('title') title: string) {
    if (!title) {
      throw new BadRequestException('title query parameter is required');
    }
    try {
      return await this.milestoneService.findByTitle(title);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching milestones by region',
      );
    }
  }

  @Get('/smart-contract')
  @ApiOperation({
    summary: 'Get milestones by smart contract',
    description:
      'Retrieve milestones based on their associated smart contract.',
  })
  @ApiQuery({
    name: 'smartContractId',
    required: true,
    description: 'smart contract id to filter milestones by',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'milestones retrieved successfully.',
    type: [Milestone],
  })
  @ApiResponse({
    status: 400,
    description: 'smart contract query parameter is required.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching milestones by smart contract.',
  })
  async getMilestonesBySmartContract(
    @Query('smartContractId') smartContractId: string,
  ) {
    if (!smartContractId) {
      throw new BadRequestException(
        'smart contract id query parameter is required',
      );
    }
    try {
      return await this.milestoneService.findBySmartContract(smartContractId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching milestones by smart contract',
      );
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get milestone by ID',
    description: 'Retrieve a specific milestone by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the milestone',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'milestone retrieved successfully.',
    type: Milestone,
  })
  @ApiResponse({
    status: 404,
    description: 'milestone with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching milestone by ID.',
  })
  async getMilestoneById(@Param('id') id: string) {
    const milestone = await this.milestoneService.findMilestoneById(id);
    if (!milestone) {
      throw new NotFoundException(`milestone with ID ${id} not found`);
    }
    return milestone;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({
    summary: 'Update milestone',
    description: 'Update the details of an existing milestone.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the milestone to update',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiBody({
    type: UpdateMilestoneDto,
    description: 'milestone update details',
  })
  @ApiResponse({
    status: 200,
    description: 'milestone updated successfully.',
    type: Milestone,
  })
  @ApiResponse({
    status: 404,
    description: 'milestone with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error updating milestone.',
  })
  async updateMilestone(
    @Param('id') id: string,
    @Body() updateMilestoneDto: UpdateMilestoneDto,
  ) {
    try {
      const updatedMilestone = await this.milestoneService.updateMilestone(
        id,
        updateMilestoneDto,
      );
      if (!updatedMilestone) {
        throw new NotFoundException(`milestone with ID ${id} not found`);
      }
      return updatedMilestone;
    } catch (error) {
      throw new InternalServerErrorException('Error updating milestone');
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete milestone',
    description: 'Delete an existing milestone by their unique ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the milestone to delete',
    type: String,
    example: '60c72b2f9b1d8e1a4c8e4b3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Milestone deleted successfully.',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Milestone with the provided ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error deleting milestone.',
  })
  async deleteMilestone(@Param('id') id: string) {
    try {
      const result = await this.milestoneService.deleteMilestone(id);
      if (!result) {
        throw new NotFoundException(`Milestone with ID ${id} not found`);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting milestone', error);
    }
  }
}  