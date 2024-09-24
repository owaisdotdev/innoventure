import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investor } from '../schemas/investor.schema';
import { CreateInvestorDto } from 'src/dto/createInvestor.dto';

@Injectable()
export class InvestorService {
  constructor(
    @InjectModel(Investor.name) private investorModel: Model<Investor>,
  ) {}

  async createInvestor(createInvestorDto: CreateInvestorDto): Promise<Investor> {
    const createdInvestor = new this.investorModel(createInvestorDto);
    return createdInvestor.save();
  }
}
