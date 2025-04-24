import { Model } from 'mongoose';
import { Milestone } from './milestone.schema';
import { Types } from 'mongoose';
export declare class MilestoneService {
    private milestoneModel;
    constructor(milestoneModel: Model<Milestone>);
    uploadToPinata(file: Express.Multer.File): Promise<string>;
    analyzeWithGemini(file: Express.Multer.File): Promise<string>;
    submitMilestone(data: any, file: Express.Multer.File): Promise<Milestone>;
    findMilestoneById(id: string): Promise<Milestone>;
    addSmartContractToMilestone(milestoneId: string, smartContractId: Types.ObjectId): Promise<Milestone>;
    findMilestones(filter?: any): Promise<Milestone[]>;
    updateMilestoneStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Milestone>;
}
