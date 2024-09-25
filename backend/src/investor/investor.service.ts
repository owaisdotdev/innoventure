import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Investor } from '../schemas/investor.schema';
import { CreateInvestorDto } from '../dto/createInvestor.dto';
import { UpdateInvestorDto } from '../dto/updateInvestor.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InvestorService {
  constructor(
    @InjectModel(Investor.name) private investorModel: Model<Investor>,
  ) {}

  // Create a new investor with hashed password
  async createInvestor(
    createInvestorDto: CreateInvestorDto,
  ): Promise<Investor> {
    const hashedPassword = await bcrypt.hash(createInvestorDto.password, 10);
    const createdInvestor = await this.investorModel.create({
      ...createInvestorDto,
      password: hashedPassword,
    });
    return createdInvestor;
  }

  // Find all investors
  async findAllInvestors(): Promise<Investor[]> {
    return this.investorModel.find().exec();
  }

  // Find an investor by ID
  async findInvestorById(investorId: string): Promise<Investor> {
    if (!isValidObjectId(investorId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const investor = await this.investorModel.findById(investorId).exec();

    if (!investor) {
      throw new NotFoundException('Investor not found');
    }

    return investor;
  }

  // Update an investor
  async updateInvestor(
    investorId: string,
    updateInvestorDto: UpdateInvestorDto,
  ): Promise<Investor> {
    if (!isValidObjectId(investorId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const updatedInvestor = await this.investorModel
      .findByIdAndUpdate(
        investorId,
        { $set: updateInvestorDto },
        { new: true }, // Return the updated document
      )
      .exec();

    if (!updatedInvestor) {
      throw new NotFoundException('Investor not found');
    }

    return updatedInvestor;
  }

  // Delete an investor
  async deleteInvestor(investorId: string): Promise<void> {
    if (!isValidObjectId(investorId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const result = await this.investorModel
      .findByIdAndDelete(investorId)
      .exec();
    if (!result) {
      throw new NotFoundException('Investor not found');
    }
  }

  // Find investor by email (used for login and authentication)
  async findByEmail(email: string): Promise<Investor | null> {
    return this.investorModel.findOne({ email }).exec();
  }
}
