import { Model, Types } from 'mongoose';
import { Milestone } from '../schemas/milestone.schema';
import { CreateMilestoneDto } from '../dto/createMilestone.dto';
import { UpdateMilestoneDto } from '../dto/updateMilestone.dto';
export declare class MilestoneService {
    private milestoneModel;
    private startupModel;
    constructor(milestoneModel: Model<Milestone>, startupModel: Model<Milestone>);
    createMilestone(createMilestoneDto: CreateMilestoneDto): Promise<Milestone>;
    findAllMilestones(): Promise<Milestone[]>;
    findMilestoneById(milestoneId: string): Promise<Milestone>;
    updateMilestone(milestoneId: string, updatemilestoneDto: UpdateMilestoneDto): Promise<Milestone>;
    addSmartContractToMilestone(milestonId: string, smartContractId: Types.ObjectId): Promise<void>;
    deleteMilestone(milestoneId: string): Promise<Boolean>;
    findByStatus(status: string): Promise<Milestone[]>;
    findByTitle(title: string): Promise<Milestone[]>;
    findBySmartContract(associatedSmartContractId: string): Promise<Milestone[]>;
}
