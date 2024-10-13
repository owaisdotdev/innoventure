import { Document, Types } from 'mongoose';
export declare class Milestone extends Document {
    title: string;
    description: string;
    dueDate: Date;
    amountToBeReleased: number;
    status: string;
    startupId: Types.ObjectId;
    associatedSmartContractId: Types.ObjectId;
}
export declare const MilestoneSchema: import("mongoose").Schema<Milestone, import("mongoose").Model<Milestone, any, any, any, Document<unknown, any, Milestone> & Milestone & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Milestone, Document<unknown, {}, import("mongoose").FlatRecord<Milestone>> & import("mongoose").FlatRecord<Milestone> & Required<{
    _id: unknown;
}>>;
