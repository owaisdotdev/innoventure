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

  async findAllInvestors(): Promise<Investor[]> {
    return this.investorModel.find().exec();
  }

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

  async findByEmail(email: string): Promise<Investor | null> {
    return this.investorModel.findOne({ email }).exec();
  }

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
        { new: true }, 
      )
      .exec();

    if (!updatedInvestor) {
      throw new NotFoundException('Investor not found');
    }

    return updatedInvestor;
  }

  async deleteInvestor(investorId: string): Promise<Boolean> {
    if (!isValidObjectId(investorId)) {
      throw new BadRequestException(`Invalid ID format`);
    }
    const result = await this.investorModel
      .findByIdAndDelete(investorId)
      .exec();
    if (!result) {
      throw new NotFoundException('Investor not found');
    }
    return true;
  }

  // Getter Functions

  async findBySector(sector: string): Promise<Investor[]> {
    return this.investorModel.find({ 'preferences.sectors': sector }).exec();
  }

  async findByRegion(region: string): Promise<Investor[]> {
    return this.investorModel.find({ 'preferences.regions': region }).exec();
  }

  async findByRiskTolerance(riskTolerance: string): Promise<Investor[]> {
    return this.investorModel
      .find({ 'preferences.riskTolerance': riskTolerance })
      .exec();
  }

  async findByMinInvestment(minInvestment: number): Promise<Investor[]> {
    return this.investorModel
      .find({ 'criteria.minInvestment': { $gte: minInvestment } })
      .exec();
  }

  async findByMaxInvestment(maxInvestment: number): Promise<Investor[]> {
    return this.investorModel
      .find({ 'criteria.maxInvestment': { $lte: maxInvestment } })
      .exec();
  }

  async findByInvestmentRange(
    minInvestment: number,
    maxInvestment: number,
  ): Promise<Investor[]> {
    return this.investorModel
      .find({
        'criteria.minInvestment': { $lte: maxInvestment }, // Min investment <= max specified range
        'criteria.maxInvestment': { $gte: minInvestment }, // Max investment >= min specified range
      })
      .exec();
  }

  async findByProfileStatus(profileStatus: string): Promise<Investor[]> {
    return this.investorModel.find({ profileStatus }).exec();
  }
}
