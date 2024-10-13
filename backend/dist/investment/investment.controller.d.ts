import { StartupService } from '../startup/startup.service';
import { SmartContractService } from '../smart-contract/smart-contract.service';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from '../dto/createInvestment.dto';
import { UpdateInvestmentDto } from '../dto/updateInvestment.dto';
import { Investment } from '../schemas/investment.schema';
import { InvestorService } from '../investor/investor.service';
export declare class InvestmentController {
    private readonly investmentService;
    private readonly smartContractService;
    private readonly investorService;
    private readonly startupService;
    constructor(investmentService: InvestmentService, smartContractService: SmartContractService, investorService: InvestorService, startupService: StartupService);
    createInvestment(createInvestmentDto: CreateInvestmentDto): Promise<Investment>;
    findAllInvestments(): Promise<Investment[]>;
    findInvestmentById(id: string): Promise<Investment>;
    updateInvestment(id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<Investment>;
    deleteInvestment(id: string): Promise<void>;
    findInvestmentsByInvestor(investorId: string): Promise<Investment[]>;
    findInvestmentsByStartup(startupId: string): Promise<Investment[]>;
    findInvestmentsByContract(contractId: string): Promise<Investment[]>;
    findInvestmentsByDate(investmentDate: string): Promise<Investment[]>;
}
