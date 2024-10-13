import { Types } from 'mongoose';
export declare class BusinessPlanDto {
    description: string;
    industry: string;
}
export declare class FundingNeedsDto {
    totalAmount: number;
    milestones: Types.ObjectId[];
}
export declare class CreateStartupDto {
    name: string;
    email: string;
    password: string;
    businessPlan: BusinessPlanDto;
    fundingNeeds: FundingNeedsDto;
}
