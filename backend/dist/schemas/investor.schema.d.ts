import { Document, Types } from 'mongoose';
export declare class Investor extends Document {
    name: string;
    email: string;
    password: string;
    businessPlan: {
        description: string;
        industry: string;
    };
    preferences: {
        sectors: string[];
        regions: string[];
        riskTolerance: string;
    };
    criteria: {
        minInvestment: number;
        maxInvestment: number;
        investmentHorizon: string;
    };
    profileStatus: string;
    investments: Types.ObjectId[];
    notifications: {
        type: string;
        message: string;
        date: Date;
    }[];
    resetCode: string;
    resetCodeExpiration: Date;
}
export declare const InvestorSchema: import("mongoose").Schema<Investor, import("mongoose").Model<Investor, any, any, any, Document<unknown, any, Investor> & Investor & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Investor, Document<unknown, {}, import("mongoose").FlatRecord<Investor>> & import("mongoose").FlatRecord<Investor> & Required<{
    _id: unknown;
}>>;
