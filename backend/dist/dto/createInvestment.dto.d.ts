import { Types } from 'mongoose';
declare class TermsDto {
    equity: number;
    conditions: string;
}
declare class EscrowStatusDto {
    amount: number;
    releaseDate: Date;
    status: string;
}
export declare class CreateInvestmentDto {
    investorId: Types.ObjectId;
    startupId: Types.ObjectId;
    amount: number;
    terms: TermsDto;
    escrowStatus: EscrowStatusDto;
    contractId: Types.ObjectId;
    equityDistribution: number;
    investmentDate: Date;
}
export {};
