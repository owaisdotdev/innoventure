import { Model } from 'mongoose';
import { CreateInvestmentDto } from '../dto/createInvestment.dto';
import { UpdateInvestmentDto } from '../dto/updateInvestment.dto';
import { Investment } from '../schemas/investment.schema';
export declare class InvestmentService {
    private investmentModel;
    constructor(investmentModel: Model<Investment>);
    createInvestment(createInvestmentDto: CreateInvestmentDto): Promise<Investment>;
    findAllInvestments(): Promise<Investment[]>;
    findInvestmentById(id: string): Promise<Investment>;
    updateInvestment(id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<Investment>;
    deleteInvestment(id: string): Promise<void>;
    findInvestmentsByInvestor(investorId: string): Promise<Investment[]>;
    findInvestmentsByStartup(startupId: string): Promise<Investment[]>;
    findInvestmentsByContract(contractId: string): Promise<Investment[]>;
    findInvestmentsByDate(investmentDate: Date): Promise<Investment[]>;
}
