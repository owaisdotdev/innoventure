import { Model, Types } from 'mongoose';
import { Investor } from '../schemas/investor.schema';
import { CreateInvestorDto } from '../dto/createInvestor.dto';
import { UpdateInvestorDto } from '../dto/updateInvestor.dto';
export declare class InvestorService {
    private investorModel;
    constructor(investorModel: Model<Investor>);
    createInvestor(createInvestorDto: CreateInvestorDto): Promise<Investor>;
    findAllInvestors(): Promise<Investor[]>;
    findInvestorById(investorId: string): Promise<Investor>;
    findByEmail(email: string): Promise<Investor | null>;
    updateInvestor(investorId: string, updateInvestorDto: UpdateInvestorDto): Promise<Investor>;
    addInvestmentToInvestor(investorId: string, investmentId: Types.ObjectId): Promise<void>;
    deleteInvestor(investorId: string): Promise<Boolean>;
    findBySector(sector: string): Promise<Investor[]>;
    findByRegion(region: string): Promise<Investor[]>;
    findByRiskTolerance(riskTolerance: string): Promise<Investor[]>;
    findByMinInvestment(minInvestment: number): Promise<Investor[]>;
    findByMaxInvestment(maxInvestment: number): Promise<Investor[]>;
    findByInvestmentRange(minInvestment: number, maxInvestment: number): Promise<Investor[]>;
    findByProfileStatus(profileStatus: string): Promise<Investor[]>;
}
