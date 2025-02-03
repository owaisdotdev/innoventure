import { SmartContractService } from './smart-contract.service';
import { CreateSmartContractDto } from '../dto/createSmartContract.dto';
import { UpdateSmartContractDto } from '../dto/updateSmartContract.dto';
import { SmartContract } from '../schemas/smartContract.schema';
import { MilestoneService } from '../milestone/milestone.service';
export declare class SmartContractController {
    private readonly smartContractService;
    private readonly mileStoneServive;
    constructor(smartContractService: SmartContractService, mileStoneServive: MilestoneService);
    createSmartContract(createSmartContractDto: CreateSmartContractDto): Promise<SmartContract>;
    findAllSmartContracts(): Promise<SmartContract[]>;
    findSmartContractById(id: string): Promise<SmartContract>;
    updateSmartContract(id: string, updateSmartContractDto: UpdateSmartContractDto): Promise<SmartContract>;
    addInvestmentToSmartContract(id: string, investmentId: string): Promise<void>;
    findByStatus(status: string): Promise<SmartContract[]>;
    findByInvestmentId(investmentId: string): Promise<SmartContract[]>;
}
