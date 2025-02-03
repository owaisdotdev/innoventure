import { Model, Types } from 'mongoose';
import { Startup } from '../schemas/startup.schema';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { UpdateStartupDto } from '../dto/updateStartup.dto';
export declare class StartupService {
    private startupModel;
    constructor(startupModel: Model<Startup>);
    createStartup(createStartupDto: CreateStartupDto): Promise<Startup>;
    findAllStartups(): Promise<Startup[]>;
    findStartupById(id: string): Promise<Startup>;
    findByEmail(email: string): Promise<Startup | null>;
    updateStartup(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup>;
    addMilestoneToStartup(startupId: string, milestoneId: Types.ObjectId): Promise<void>;
    addInvestorToStartup(startupId: string, investorId: Types.ObjectId): Promise<void>;
    removeMilestoneFromStartup(startupId: string, milestoneId: Types.ObjectId): Promise<void>;
    deleteStartup(id: string): Promise<Boolean>;
    findByIndustry(industry: string): Promise<Startup[]>;
    getRecentStartups(days?: number): Promise<Startup[]>;
    findFydpStartups(): Promise<(import("mongoose").Document<unknown, {}, Startup> & Startup & Required<{
        _id: unknown;
    }>)[]>;
}
