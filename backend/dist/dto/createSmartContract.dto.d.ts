import { Types } from 'mongoose';
export declare class MilestoneStatusDto {
    milestoneId: Types.ObjectId;
    status: string;
}
export declare class TermsDto {
    milestoneConditions: string;
    escrowAmount: number;
}
export declare class CreateSmartContractDto {
    investmentId?: Types.ObjectId;
    terms: TermsDto;
    milestoneStatus: MilestoneStatusDto;
    escrowAmount: number;
    status: string;
}
