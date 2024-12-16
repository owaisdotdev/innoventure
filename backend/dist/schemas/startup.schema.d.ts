import { Document, Types } from 'mongoose';
export declare class Startup extends Document {
    name: string;
    email: string;
    password: string;
    businessPlan: {
        description: string;
        industry: string;
    };
    fundingNeeds: {
        totalAmount: number;
        milestones: Types.ObjectId[];
    };
    documents: {
        docType: string;
        fileUrl: string;
    }[];
    investors: Types.ObjectId[];
    progressReports: {
        milestoneId: Types.ObjectId;
        reportDetails: string;
        reportDate: Date;
        status: string;
    }[];
    notifications: {
        type: string;
        message: string;
        date: Date;
    }[];
    resetCode: string;
    resetCodeExpiration: Date;
    isFydp: boolean;
    description: string;
    fydpDetails: {
        university: string;
        year: number;
        supervisorName: string;
        githubRepoUrl?: string;
        tags?: string[];
        remarks?: string;
    };
}
export declare const StartupSchema: import("mongoose").Schema<Startup, import("mongoose").Model<Startup, any, any, any, Document<unknown, any, Startup> & Startup & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Startup, Document<unknown, {}, import("mongoose").FlatRecord<Startup>> & import("mongoose").FlatRecord<Startup> & Required<{
    _id: unknown;
}>>;
