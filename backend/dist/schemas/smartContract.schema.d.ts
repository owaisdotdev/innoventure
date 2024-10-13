import { Document, Types } from 'mongoose';
export declare class SmartContract extends Document {
    investmentId?: Types.ObjectId;
    terms: {
        milestoneConditions: string;
        escrowAmount: number;
    };
    milestoneStatus: {
        milestoneId: Types.ObjectId;
        status: string;
    };
    escrowAmount: number;
    status: string;
}
export declare const SmartContractSchema: import("mongoose").Schema<SmartContract, import("mongoose").Model<SmartContract, any, any, any, Document<unknown, any, SmartContract> & SmartContract & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SmartContract, Document<unknown, {}, import("mongoose").FlatRecord<SmartContract>> & import("mongoose").FlatRecord<SmartContract> & Required<{
    _id: unknown;
}>>;
