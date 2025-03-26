import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MilestoneService } from './milestone.service';

@Controller('milestones')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Post('submit')
  @UseInterceptors(FileInterceptor('file'))
  async submitMilestone(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const milestone = await this.milestoneService.submitMilestone(body, file);
    return { message: 'Milestone submitted', milestone };
  }
}