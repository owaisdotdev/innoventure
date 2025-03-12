import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Added timestamps for createdAt/updatedAt
export class Startup extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true }) // Added unique constraint for email
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: {
      description: { type: String, required: true },
      industry: { type: String, required: true },
    },
    _id: false, // Prevents _id generation for subdocument
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
    _id: false,
  })
  fundingNeeds: {
    totalAmount: number;
    milestones: Types.ObjectId[];
  };

  @Prop({
    type: [
      {
        docType: { type: String, required: true },
        fileUrl: { type: String, required: true },
      },
    ],
    default: [],
  })
  documents: {
    docType: string;
    fileUrl: string;
  }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Investor' }], default: [] })
  investors: Types.ObjectId[];

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
    default: [],
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
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
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
    _id: false,
    required: false, // Only required if isFydp is true, handle in logic
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