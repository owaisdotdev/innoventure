import { Document, Types } from 'mongoose';
export declare class DAO extends Document {
    proposalId: Types.ObjectId;
    proposalDescription: string;
    votes: {
        investorId: Types.ObjectId;
        vote: string;
    }[];
    outcome: string;
    date: Date;
}
export declare const DAOSchema: import("mongoose").Schema<DAO, import("mongoose").Model<DAO, any, any, any, Document<unknown, any, DAO> & DAO & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DAO, Document<unknown, {}, import("mongoose").FlatRecord<DAO>> & import("mongoose").FlatRecord<DAO> & Required<{
    _id: unknown;
}>>;
