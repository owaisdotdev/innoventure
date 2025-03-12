import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
// import { Startup } from './schemas/startup.schema';
import { Startup } from 'src/schemas/startup.schema';
// import { CreateStartupDto } from './dto/create-startup.dto'; // Adjusted path
import { CreateStartupDto } from 'src/dto/createStartup.dto';
// import { UpdateStartupDto } from './dto/update-startup.dto'; // Adjusted path
import { UpdateStartupDto } from 'src/dto/updateStartup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StartupService {
  constructor(@InjectModel(Startup.name) private startupModel: Model<Startup>) {}

  async createStartup(createStartupDto: CreateStartupDto): Promise<Startup> {
    try {
      const hashedPassword = await bcrypt.hash(createStartupDto.password, 10);
      const createdStartup = new this.startupModel({
        ...createStartupDto,
        password: hashedPassword,
      });
      return createdStartup.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error (e.g., email)
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create startup');
    }
  }

  async findAllStartups(): Promise<Startup[]> {
    return this.startupModel.find().exec();
  }

  async findStartupById(id: string): Promise<Startup> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const startup = await this.startupModel.findById(id).exec();
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    return startup;
  }

  async findByEmail(email: string): Promise<Startup | null> {
    return this.startupModel.findOne({ email }).exec();
  }

  async updateStartup(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updatedStartup = await this.startupModel
      .findByIdAndUpdate(id, { $set: updateStartupDto }, { new: true })
      .exec();
    if (!updatedStartup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    return updatedStartup;
  }

  async addMilestoneToStartup(startupId: string, milestoneId: Types.ObjectId): Promise<void> {
    if (!isValidObjectId(startupId) || !isValidObjectId(milestoneId)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.startupModel
      .updateOne(
        { _id: startupId },
        { $push: { 'fundingNeeds.milestones': milestoneId } },
      )
      .exec();
    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Startup with ID ${startupId} not found`);
    }
  }

  async addInvestorToStartup(startupId: string, investorId: Types.ObjectId): Promise<void> {
    if (!isValidObjectId(startupId) || !isValidObjectId(investorId)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.startupModel
      .updateOne({ _id: startupId }, { $push: { investors: investorId } })
      .exec();
    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Startup with ID ${startupId} not found`);
    }
  }

  async removeMilestoneFromStartup(startupId: string, milestoneId: Types.ObjectId): Promise<void> {
    if (!isValidObjectId(startupId) || !isValidObjectId(milestoneId)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.startupModel
      .updateOne(
        { _id: startupId },
        { $pull: { 'fundingNeeds.milestones': milestoneId } },
      )
      .exec();
    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Startup with ID ${startupId} not found or milestone not associated`);
    }
  }

  async deleteStartup(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.startupModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    return true;
  }

  async findByIndustry(industry: string): Promise<Startup[]> {
    return this.startupModel.find({ 'businessPlan.industry': industry }).exec();
  }

  async getRecentStartups(days: number = 30): Promise<Startup[]> {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);
    return this.startupModel
      .find({
        createdAt: { $gte: dateFrom },
      })
      .exec();
  }

  async findFydpStartups(): Promise<Startup[]> {
    return this.startupModel.find({ isFydp: true }).exec();
  }
}