import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Patch,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MilestoneService } from './milestone.service';
import { Types } from 'mongoose';

@Controller('milestones')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  /**
   * Submit a new milestone with a file
   */
  @Post('submit')
  @UseInterceptors(FileInterceptor('file'))
  async submitMilestone(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const milestone = await this.milestoneService.submitMilestone(body, file);
    return { message: 'Milestone submitted', milestone };
  }

  /**
   * Get milestone by ID
   */
  @Get(':id')
  async getMilestoneById(@Param('id') id: string) {
    try {
      const milestone = await this.milestoneService.findMilestoneById(id);
      return milestone;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Add a Smart Contract ID to a milestone
   */
  @Patch(':id/add-smart-contract')
  async addSmartContract(
    @Param('id') milestoneId: string,
    @Body('smartContractId') smartContractId: string,
  ) {
    if (!Types.ObjectId.isValid(smartContractId)) {
      throw new BadRequestException('Invalid smartContractId format');
    }

    const updated = await this.milestoneService.addSmartContractToMilestone(
      milestoneId,
      new Types.ObjectId(smartContractId),
    );
    return {
      message: 'Smart contract added to milestone',
      milestone: updated,
    };
  }

  /**
   * Get all milestones (optionally filter by startupId or status)
   */
  @Get()
  async getAllMilestones(
    @Query('startupId') startupId?: string,
    @Query('status') status?: string,
  ) {
    const query: any = {};
    if (startupId) query.startupId = startupId;
    if (status) query.status = status;

    return this.milestoneService.findMilestones(query);
  }

  /**
   * Approve or Reject a milestone
   */
  @Patch(':id/status')
  async updateMilestoneStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'approved' | 'rejected',
  ) {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw new BadRequestException('Invalid status value');
    }
    const updated = await this.milestoneService.updateMilestoneStatus(id, status);
    return {
      message: `Milestone ${status}`,
      milestone: updated,
    };
  }
}
