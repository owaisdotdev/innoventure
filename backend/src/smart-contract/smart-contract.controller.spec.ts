import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractController } from './smart-contract.controller';
import { SmartContractService } from './smart-contract.service';
import { CreateSmartContractDto } from '../dto/createSmartContract.dto';
import { UpdateSmartContractDto } from '../dto/updateSmartContract.dto';
import { Types } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MilestoneService } from '../milestone/milestone.service';
import { SmartContract } from 'src/schemas/smartContract.schema';

describe('SmartContractController', () => {
  let controller: SmartContractController;
  let service: SmartContractService;
  let milestoneService: MilestoneService;

  const mockSmartContract = {
    _id: '60c72b2f9b1d8e1a4c8e4b3a',
    investmentId: '60c72b2f9b1d8e1a4c8e4b3b',
    terms: { milestoneConditions: 'Complete phase 1', escrowAmount: 5000 },
    milestoneStatus: { milestoneId: '60c72b2f9b1d8e1a4c8e4b3b', status: 'Pending' },
    escrowAmount: 10000,
    status: 'Active',
  };

  const mockSmartContractService = {
    createsmartContract: jest.fn().mockResolvedValue(mockSmartContract),
    findAllsmartContracts: jest.fn().mockResolvedValue([mockSmartContract]),
    findsmartContractById: jest.fn().mockResolvedValue(mockSmartContract),
    updatesmartContract: jest.fn().mockResolvedValue(mockSmartContract),
    addInvestmentTosmartContract: jest.fn().mockResolvedValue(null),
    findByStatus: jest.fn().mockResolvedValue([mockSmartContract]),
    findByInvestmentId: jest.fn().mockResolvedValue([mockSmartContract]),
  };

  const mockMilestoneService = {
    findMilestoneById: jest.fn(),
    addSmartContractToMilestone: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartContractController],
      providers: [
        {
          provide: SmartContractService,
          useValue: mockSmartContractService,
        },
        {
          provide: MilestoneService,
          useValue: mockMilestoneService
        }
      ],
    }).compile();

    controller = module.get<SmartContractController>(SmartContractController);
    service = module.get<SmartContractService>(SmartContractService);
    milestoneService = module.get<MilestoneService>(MilestoneService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSmartContract', () => {
    it('should create a smart contract', async () => {
      const dto: CreateSmartContractDto = {
        terms: {
          milestoneConditions: 'Complete phase 1',
          escrowAmount: 5000,
        },
        milestoneStatus: {
          milestoneId: new Types.ObjectId('60c72b2f9b1d8e1a4c8e4b3b'),
          status: 'Pending',
        },
        escrowAmount: 10000,
        status: 'Active',
      };

      const milestone = {
        _id: '60c72b2f9b1d8e1a4c8e4b3b',
        startupId: 'startup-id', 
        title: 'New Milestone',  
        description: 'Test milestone description',  
        dueDate: new Date('2024-12-31'),  
        amountToBeReleased: 10000,  
        status: 'pending',  
        associatedSmartContractId: '64c1234abc5678def90ab123', 
      };

      // @ts-ignore
      jest.spyOn(milestoneService, 'findMilestoneById').mockResolvedValue(milestone);

      const result = await controller.createSmartContract(dto);
      expect(result).toEqual(mockSmartContract);
      expect(service.createsmartContract).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAllSmartContracts', () => {
    it('should retrieve all smart contracts', async () => {
      const result = await controller.findAllSmartContracts();
      expect(result).toEqual([mockSmartContract]);
      expect(service.findAllsmartContracts).toHaveBeenCalled();
    });
  });

  describe('findSmartContractById', () => {
    it('should retrieve a smart contract by id', async () => {
      const result = await controller.findSmartContractById('60c72b2f9b1d8e1a4c8e4b3a');
      expect(result).toEqual(mockSmartContract);
      expect(service.findsmartContractById).toHaveBeenCalledWith('60c72b2f9b1d8e1a4c8e4b3a');
    });

    it('should throw NotFoundException if smart contract not found', async () => {
      jest.spyOn(service, 'findsmartContractById').mockRejectedValue(new NotFoundException());
      await expect(controller.findSmartContractById('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateSmartContract', () => {
    it('should update a smart contract', async () => {
      const dto: UpdateSmartContractDto = { status: 'Completed' };
      const result = await controller.updateSmartContract('60c72b2f9b1d8e1a4c8e4b3a', dto);
      expect(result).toEqual(mockSmartContract);
      expect(service.updatesmartContract).toHaveBeenCalledWith('60c72b2f9b1d8e1a4c8e4b3a', dto);
    });

    it('should throw BadRequestException for invalid id', async () => {
      jest.spyOn(service, 'updatesmartContract').mockRejectedValue(new BadRequestException());
      await expect(controller.updateSmartContract('invalid-id', {} as UpdateSmartContractDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('addInvestmentToSmartContract', () => {
    it('should add investment to a smart contract', async () => {
      const result = await controller.addInvestmentToSmartContract('60c72b2f9b1d8e1a4c8e4b3a', '60c72b2f9b1d8e1a4c8e4b3b');
      expect(result).toBeUndefined();
      expect(service.addInvestmentTosmartContract).toHaveBeenCalledWith(
        '60c72b2f9b1d8e1a4c8e4b3a',
        expect.any(Types.ObjectId),
      );
    });

    it('should throw BadRequestException for invalid investmentId', async () => {
      await expect(controller.addInvestmentToSmartContract('60c72b2f9b1d8e1a4c8e4b3a', 'invalid-id')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByStatus', () => {
    it('should retrieve smart contracts by status', async () => {
      const result = await controller.findByStatus('Active');
      expect(result).toEqual([mockSmartContract]);
      expect(service.findByStatus).toHaveBeenCalledWith('Active');
    });
  });

  describe('findByInvestmentId', () => {
    it('should retrieve smart contracts by investmentId', async () => {
      const result = await controller.findByInvestmentId('60c72b2f9b1d8e1a4c8e4b3b');
      expect(result).toEqual([mockSmartContract]);
      expect(service.findByInvestmentId).toHaveBeenCalledWith('60c72b2f9b1d8e1a4c8e4b3b');
    });
  });
});