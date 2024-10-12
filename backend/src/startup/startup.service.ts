import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Startup } from '../schemas/startup.schema';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { UpdateStartupDto } from '../dto/updateStartup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StartupService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<Startup>,
  ) {}

  async createStartup(createStartupDto: CreateStartupDto): Promise<Startup> {
    try {
        const hashedPassword = await bcrypt.hash(createStartupDto.password, 10);
      const createdStartup = await this.startupModel.create({
        ...createStartupDto,
        password: hashedPassword,
      });
      return createdStartup;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create startup');
    }
  }

  async findAllStartups(): Promise<Startup[]> {
    return this.startupModel.find().exec();
  }

  async findStartupById(id: string): Promise<Startup> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const startup = await this.startupModel.findById(id).exec();
    if (!startup) {
      throw new NotFoundException(`Startup not found`);
    }
    return startup;
  }

  async findByEmail(email: string): Promise<Startup | null> {
    return this.startupModel.findOne({ email }).exec();
  }

  async updateStartup(
    id: string,
    updateStartupDto: UpdateStartupDto,
  ): Promise<Startup> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
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
    const result = await this.startupModel.updateOne(
      { _id: startupId },
      { $push: { 'fundingNeeds.milestones': milestoneId } },
    ).exec();

    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Startup with ID ${startupId} not found`);
    }
  }

  async addInvestorToStartup(startupId: string, investorId: Types.ObjectId): Promise<void> {
    const result = await this.startupModel.updateOne(
      { _id: startupId },
      { $push: { 'investors': investorId } },
    ).exec();

    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Startup with ID ${startupId} not found`);
    }
  }

  async removeMilestoneFromStartup(startupId: string, milestoneId: Types.ObjectId): Promise<void> {
    const result = await this.startupModel.updateOne(
      { _id: startupId },
      { $pull: { 'fundingNeeds.milestones': milestoneId } },
    ).exec();

    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Startup with ID ${startupId} not found`);
    }
  }

  async deleteStartup(id: string): Promise<Boolean> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const result = await this.startupModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Startup not found`);
    }
    return true;
  }

  // Getter Functions

  async findByIndustry(industry: string): Promise<Startup[]> {
    return this.startupModel.find({ 'businessPlan.industry': industry }).exec();
  }
}
