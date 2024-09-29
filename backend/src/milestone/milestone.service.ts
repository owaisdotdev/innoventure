import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Milestone } from '../schemas/milestone.schema';
import { CreateMilestoneDto } from '../dto/createMilestone.dto';
import { UpdateMilestoneDto } from '../dto/updateMilestone.dto';
import { Startup } from '../schemas/startup.schema';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(Milestone.name) private milestoneModel: Model<Milestone>,
    @InjectModel(Startup.name) private startupModel: Model<Milestone>,
  ) {}

  async createMilestone(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    const { associatedSmartContractId, ...rest } = createMilestoneDto;
    const milestoneData = {
      ...rest,
      associatedSmartContractId: new Types.ObjectId(associatedSmartContractId),
    };

    const createdMilestone = new this.milestoneModel(milestoneData);
    return createdMilestone.save();
  }

  async findAllMilestones(): Promise<Milestone[]> {
    return this.milestoneModel.find().exec();
  }

  async findMilestoneById(milestoneId: string): Promise<Milestone> {
    if (!isValidObjectId(milestoneId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const milestone = await this.milestoneModel.findById(milestoneId).exec();

    if (!milestone) {
      throw new NotFoundException('milestone not found');
    }

    return milestone;
  }

  async updateMilestone(
    milestoneId: string,
    updatemilestoneDto: UpdateMilestoneDto,
  ): Promise<Milestone> {
    if (!isValidObjectId(milestoneId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const updatedmilestone = await this.milestoneModel
      .findByIdAndUpdate(
        milestoneId,
        { $set: updatemilestoneDto },
        { new: true },
      )
      .exec();

    if (!updatedmilestone) {
      throw new NotFoundException('milestone not found');
    }

    return updatedmilestone;
  }

  async deleteMilestone(milestoneId: string): Promise<Boolean> {
    if (!isValidObjectId(milestoneId)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    await this.startupModel.updateOne(
      { 'fundingNeeds.milestones': milestoneId },
      { $pull: { 'fundingNeeds.milestones': milestoneId } }
    );

    const result = await this.milestoneModel
      .findByIdAndDelete(milestoneId)
      .exec();
    
    if (!result) {
      throw new NotFoundException('milestone not found');
    }
    return true;
  }

  // Getter Functions

  async findByStatus(status: string): Promise<Milestone[]> {
    return this.milestoneModel.find({ status }).exec();
  }

  async findByTitle(title: string): Promise<Milestone[]> {
    return this.milestoneModel.find({ title }).exec();
  }

  async findBySmartContract(
    associatedSmartContractId: string,
  ): Promise<Milestone[]> {
    if (!Types.ObjectId.isValid(associatedSmartContractId)) {
      throw new BadRequestException('Invalid Smart Contract ID format');
    }

    const objectId = new Types.ObjectId(associatedSmartContractId);
    return this.milestoneModel.find({ associatedSmartContractId: objectId }).exec();
  }
}
