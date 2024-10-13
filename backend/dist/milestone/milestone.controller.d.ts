import { MilestoneService } from './milestone.service';
import { UpdateMilestoneDto } from '../dto/updateMilestone.dto';
import { Milestone } from '../schemas/milestone.schema';
import { CreateMilestoneDto } from '../dto/createMilestone.dto';
import { StartupService } from '../startup/startup.service';
export declare class MilestoneController {
    private readonly milestoneService;
    private readonly startupService;
    constructor(milestoneService: MilestoneService, startupService: StartupService);
    createMilestone(createMilestoneDto: CreateMilestoneDto): Promise<Milestone>;
    getAllMilestones(): Promise<Milestone[]>;
    getMilestonesByTitle(title: string): Promise<Milestone[]>;
    getMilestonesBySmartContract(smartContractId: string): Promise<Milestone[]>;
    getMilestoneById(id: string): Promise<Milestone>;
    updateMilestone(id: string, updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone>;
    deleteMilestone(id: string): Promise<boolean>;
}
