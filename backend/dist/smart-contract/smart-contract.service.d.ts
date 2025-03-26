import { Model, Types } from 'mongoose';
import { SmartContract } from '../schemas/smartContract.schema';
import { CreateSmartContractDto } from '../dto/createSmartContract.dto';
import { UpdateSmartContractDto } from '../dto/updateSmartContract.dto';
import { Startup } from '../schemas/startup.schema';
export declare class SmartContractService {
    private smartContractModel;
    private startupModel;
    findSmartContractById(arg0: string): void;
    constructor(smartContractModel: Model<SmartContract>, startupModel: Model<Startup>);
    createsmartContract(createSmartContractDto: CreateSmartContractDto): Promise<SmartContract>;
    findAllsmartContracts(): Promise<SmartContract[]>;
    findsmartContractById(smartContractId: string): Promise<SmartContract>;
    updatesmartContract(smartContractId: string, updatesmartContractDto: UpdateSmartContractDto): Promise<SmartContract>;
    addInvestmentTosmartContract(smartContractId: string, investmentId: Types.ObjectId): Promise<void>;
    findByStatus(status: string): Promise<SmartContract[]>;
    findByInvestmentId(investmentId: string): Promise<SmartContract[]>;
}
