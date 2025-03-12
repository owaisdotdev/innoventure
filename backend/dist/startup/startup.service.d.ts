import { Model, Types } from 'mongoose';
import { Startup } from 'src/schemas/startup.schema';
import { CreateStartupDto } from 'src/dto/createStartup.dto';
import { UpdateStartupDto } from 'src/dto/updateStartup.dto';
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
    deleteStartup(id: string): Promise<boolean>;
    findByIndustry(industry: string): Promise<Startup[]>;
    getRecentStartups(days?: number): Promise<Startup[]>;
    findFydpStartups(): Promise<Startup[]>;
}
