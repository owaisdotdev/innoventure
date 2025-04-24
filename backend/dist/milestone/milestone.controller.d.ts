import { MilestoneService } from './milestone.service';
export declare class MilestoneController {
    private readonly milestoneService;
    constructor(milestoneService: MilestoneService);
    submitMilestone(body: any, file: Express.Multer.File): Promise<{
        message: string;
        milestone: import("./milestone.schema").Milestone;
    }>;
    getMilestoneById(id: string): Promise<import("./milestone.schema").Milestone>;
    addSmartContract(milestoneId: string, smartContractId: string): Promise<{
        message: string;
        milestone: import("./milestone.schema").Milestone;
    }>;
    getAllMilestones(startupId?: string, status?: string): Promise<import("./milestone.schema").Milestone[]>;
    updateMilestoneStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<{
        message: string;
        milestone: import("./milestone.schema").Milestone;
    }>;
}
