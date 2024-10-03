import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvestmentDto } from '../dto/createInvestment.dto';
import { UpdateInvestmentDto } from '../dto/updateInvestment.dto';
import { Investment } from '../schemas/investment.schema';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
  ) {}

  async createInvestment(
    createInvestmentDto: CreateInvestmentDto,
  ): Promise<Investment> {
    const newInvestment = new this.investmentModel(createInvestmentDto);
    return newInvestment.save();
  }

  async findAllInvestments(): Promise<Investment[]> {
    return this.investmentModel.find().exec();
  }

  async findInvestmentById(id: string): Promise<Investment> {
    const investment = await this.investmentModel.findById(id).exec();
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return investment;
  }

  async updateInvestment(
    id: string,
    updateInvestmentDto: UpdateInvestmentDto,
  ): Promise<Investment> {
    const updatedInvestment = await this.investmentModel
      .findByIdAndUpdate(id, updateInvestmentDto, { new: true })
      .exec();
    if (!updatedInvestment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return updatedInvestment;
  }

  async deleteInvestment(id: string): Promise<void> {
    const result = await this.investmentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
  }

  
  // GETTER FUNCTIONS
  
  async findInvestmentsByInvestor(investorId: string): Promise<Investment[]> {
    return this.investmentModel.find({ investorId }).exec();
  }

  async findInvestmentsByStartup(startupId: string): Promise<Investment[]> {
    return this.investmentModel.find({ startupId }).exec();
  }

  async findInvestmentsByContract(contractId: string): Promise<Investment[]> {
    return this.investmentModel
      .find({ 'contractDetails.contractId': contractId })
      .exec();
  }

  async findInvestmentsByDate(investmentDate: Date): Promise<Investment[]> {
    return this.investmentModel.find({ investmentDate }).exec();
  }
}
