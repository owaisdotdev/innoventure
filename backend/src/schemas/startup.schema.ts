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
      team: { type: [String], required: true }, // List of team members
    },
  })
  businessPlan: {
    description: string;
    industry: string;
    team: string[];
  };

  @Prop({
    type: {
      totalAmount: { type: Number, required: true }, // Total funding required
      milestones: [
        {
          milestoneId: {
            type: Types.ObjectId,
            ref: 'Milestone',
            required: true,
          },
          description: { type: String, required: true },
          dueDate: { type: Date, required: true },
          fundingRequired: { type: Number, required: true },
          status: {
            type: String,
            enum: ['Pending', 'Completed'],
            default: 'Pending',
          },
        },
      ],
    },
  })
  fundingNeeds: {
    totalAmount: number;
    milestones: {
      milestoneId: Types.ObjectId;
      description: string;
      dueDate: Date;
      fundingRequired: number;
      status: string;
    }[];
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
}

export const StartupSchema = SchemaFactory.createForClass(Startup);
