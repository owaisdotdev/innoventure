  import { Injectable } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Milestone, MilestoneModelName } from './milestone.schema';
  import axios from 'axios';
  import { Types } from 'mongoose';

  @Injectable()
  export class MilestoneService {
    constructor(
      @InjectModel(MilestoneModelName)
      private milestoneModel: Model<Milestone>,
    ) {}

    async uploadToPinata(file: Express.Multer.File): Promise<string> {
      const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
      const formData = new FormData();
      formData.append('file', file.buffer as unknown as Blob, file.originalname);

      const response = await axios.post(url, formData, {
        headers: {
          'pinata_api_key': process.env.PINATA_API_KEY,
          'pinata_secret_api_key': process.env.PINATA_API_SECRET,
          'Content-Type': 'multipart/form-data',
        },
      });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    }

    async analyzeWithGemini(file: Express.Multer.File): Promise<string> {
      const apiKey = process.env.GEMINI_API_KEY;
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
      const fileContent = file.buffer.toString('base64');

      const response = await axios.post(
        url,
        {
          contents: [{ parts: [{ text: `Analyze this financial report: ${fileContent}` }] }],
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.candidates[0].content.parts[0].text;
    }

    async submitMilestone(data: any, file: Express.Multer.File): Promise<Milestone> {
      const fileUrl = await this.uploadToPinata(file);
      const financialAnalysis = await this.analyzeWithGemini(file);

      const milestone = new this.milestoneModel({
        ...data,
        fileUrl,
        financialAnalysis,
        submittedAt: new Date(),
        smartContractIds: [],
      });
      return milestone.save();
    }

    async findMilestoneById(id: string): Promise<Milestone> {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Milestone ID format');
      }
      const milestone = await this.milestoneModel.findById(id).exec();
      if (!milestone) {
        throw new Error('Milestone not found');
      }
      return milestone;
    }

    async addSmartContractToMilestone(milestoneId: string, smartContractId: Types.ObjectId): Promise<Milestone> {
      if (!Types.ObjectId.isValid(milestoneId)) {
        throw new Error('Invalid Milestone ID format');
      }
      const milestone = await this.milestoneModel.findById(milestoneId).exec();
      if (!milestone) {
        throw new Error('Milestone not found');
      }
      milestone.smartContractIds = milestone.smartContractIds || [];
      milestone.smartContractIds.push(smartContractId);
      return milestone.save();
    }

    async findMilestones(filter: any = {}): Promise<Milestone[]> {
      return this.milestoneModel.find(filter).exec();
    }
    
    async updateMilestoneStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Milestone> {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Milestone ID format');
      }
      const milestone = await this.milestoneModel.findById(id).exec();
      if (!milestone) {
        throw new Error('Milestone not found');
      }
      milestone.status = status;
      return milestone.save();
    }    
  }