import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { SmartContract } from '../schemas/smartContract.schema';
import { CreateSmartContractDto } from '../dto/createSmartContract.dto';
import { UpdateSmartContractDto } from '../dto/updateSmartContract.dto';
import { Startup } from '../schemas/startup.schema';

@Injectable()
export class SmartContractService {
  findSmartContractById(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(SmartContract.name)
    private smartContractModel: Model<SmartContract>,
    @InjectModel(Startup.name) private startupModel: Model<Startup>,
  ) {}

  async createsmartContract(
    createSmartContractDto: CreateSmartContractDto,
  ): Promise<SmartContract> {
    if (!createSmartContractDto?.milestoneStatus?.milestoneId) {
      throw new BadRequestException('milestone is required');
    }

    const { milestoneStatus, ...rest } = createSmartContractDto;
    const smartContractData = {
      ...rest,
      milestoneStatus: {
        milestoneId: new Types.ObjectId(milestoneStatus.milestoneId),
        status: milestoneStatus.status
      },
    };

    const createdsmartContract = new this.smartContractModel(smartContractData);
    return createdsmartContract.save();
  }

  async findAllsmartContracts(): Promise<SmartContract[]> {
    return this.smartContractModel.find().exec();
  }

  async findsmartContractById(smartContractId: string): Promise<SmartContract> {
    if (!isValidObjectId(smartContractId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const smartContract = await this.smartContractModel
      .findById(smartContractId)
      .exec();

    if (!smartContract) {
      throw new NotFoundException('smartContract not found');
    }

    return smartContract;
  }

  async updatesmartContract(
    smartContractId: string,
    updatesmartContractDto: UpdateSmartContractDto,
  ): Promise<SmartContract> {
    if (!isValidObjectId(smartContractId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const updatedsmartContract = await this.smartContractModel
      .findByIdAndUpdate(
        smartContractId,
        { $set: updatesmartContractDto },
        { new: true },
      )
      .exec();

    if (!updatedsmartContract) {
      throw new NotFoundException('smartContract not found');
    }

    return updatedsmartContract;
  }

  async addInvestmentTosmartContract(
    smartContractId: string,
    investmentId: Types.ObjectId,
  ): Promise<void> {
    const result = await this.smartContractModel
      .updateOne(
        { _id: smartContractId },
        {
          $set: { 'investmentId': investmentId },
        },
      )
      .exec();

    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Smart contract with ID ${smartContractId} not found`);
    }
  }

  // Getter Functions

  async findByStatus(status: string): Promise<SmartContract[]> {
    return this.smartContractModel.find({ status }).exec();
  }

  async findByInvestmentId(investmentId: string): Promise<SmartContract[]> {
    return this.smartContractModel.find({ investmentId }).exec();
  }

}
