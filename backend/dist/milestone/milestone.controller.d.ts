import { MilestoneService } from './milestone.service';
export declare class MilestoneController {
    private readonly milestoneService;
    constructor(milestoneService: MilestoneService);
    submitMilestone(body: any, file: Express.Multer.File): Promise<{
        message: string;
        milestone: import("./milestone.schema").Milestone;
    }>;
}
