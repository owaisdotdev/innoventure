import { Document, Types } from 'mongoose';
export declare class Investment extends Document {
    investorId: Types.ObjectId;
    startupId: Types.ObjectId;
    amount: number;
    terms: {
        equity: number;
        conditions: string;
    };
    escrowStatus: {
        amount: number;
        releaseDate: Date;
        status: string;
    };
    contractId: Types.ObjectId;
    equityDistribution: number;
    investmentDate: Date;
    status: string;
}
export declare const InvestmentSchema: import("mongoose").Schema<Investment, import("mongoose").Model<Investment, any, any, any, Document<unknown, any, Investment> & Investment & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Investment, Document<unknown, {}, import("mongoose").FlatRecord<Investment>> & import("mongoose").FlatRecord<Investment> & Required<{
    _id: unknown;
}>>;
