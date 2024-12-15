import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Startup extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: {
      description: { type: String, required: true },
      industry: { type: String, required: true }, // E.g., "Fintech", "EdTech"
    },
  })
  businessPlan: {
    description: string;
    industry: string;
  };

  @Prop({
    type: {
      totalAmount: { type: Number, required: true },
      milestones: [{ type: Types.ObjectId, ref: 'Milestone' }],
    },
  })
  fundingNeeds: {
    totalAmount: number;
    milestones: Types.ObjectId[];
  };

  @Prop({
    type: [
      {
        docType: { type: String, required: true }, // E.g., "Financial Report", "Business Plan"
        fileUrl: { type: String, required: true },
      },
    ],
  })
  documents: {
    docType: string;
    fileUrl: string;
  }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Investor' }] })
  investors: Types.ObjectId[]; // References to Investor documents

  @Prop({
    type: [
      {
        milestoneId: { type: Types.ObjectId, ref: 'Milestone', required: true },
        reportDetails: { type: String, required: true },
        reportDate: { type: Date, required: true },
        status: {
          type: String,
          enum: ['On track', 'Delayed'],
          default: 'On track',
        },
      },
    ],
  })
  progressReports: {
    milestoneId: Types.ObjectId;
    reportDetails: string;
    reportDate: Date;
    status: string;
  }[];

  @Prop({
    type: [
      {
        type: { type: String },
        message: { type: String },
        date: { type: Date },
      },
    ],
  })
  notifications: {
    type: string;
    message: string;
    date: Date;
  }[];

  @Prop({ type: String })
  resetCode: string;

  @Prop({ type: Date })
  resetCodeExpiration: Date;

  @Prop({ type: Boolean, default: false })
  isFydp: boolean;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({
    type: {
      university: { type: String, required: true },
      year: { type: Number, required: true },
      supervisorName: { type: String, required: true },
      githubRepoUrl: { type: String, default: '' },
      tags: { type: [String], default: [] },
      remarks: { type: String, default: '' },
    },
  })
  fydpDetails: {
    university: string;
    year: number;
    supervisorName: string;
    githubRepoUrl?: string;
    tags?: string[];
    remarks?: string;
  };
}

export const StartupSchema = SchemaFactory.createForClass(Startup);
