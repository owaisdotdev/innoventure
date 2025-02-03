import { InvestorService } from './investor.service';
import { UpdateInvestorDto } from '../dto/updateInvestor.dto';
import { Investor } from '../schemas/investor.schema';
export declare class InvestorController {
    private readonly investorService;
    constructor(investorService: InvestorService);
    getAllInvestors(): Promise<Investor[]>;
    getInvestorByEmail(email: string): Promise<Investor>;
    getBySector(sector: string): Promise<Investor[]>;
    getInvestorsByRegion(region: string): Promise<Investor[]>;
    getInvestorsByRiskTolerance(riskTolerance: string): Promise<Investor[]>;
    getInvestorsByMinInvestment(minInvestment: number): Promise<Investor[]>;
    getInvestorsByMaxInvestment(maxInvestment: number): Promise<Investor[]>;
    getInvestorsByProfileStatus(profileStatus: string): Promise<Investor[]>;
    getByInvestmentRange(minInvestment: number, maxInvestment: number): Promise<Investor[]>;
    getInvestorById(id: string): Promise<Investor>;
    updateInvestor(id: string, updateInvestorDto: UpdateInvestorDto): Promise<Investor>;
    deleteInvestor(id: string): Promise<boolean>;
}
