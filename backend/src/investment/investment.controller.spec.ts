import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from '../dto/createInvestment.dto';
import { UpdateInvestmentDto } from '../dto/updateInvestment.dto';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { SmartContractService } from '../smart-contract/smart-contract.service';

describe('InvestmentController', () => {
  let investmentController: InvestmentController;
  let investmentService: InvestmentService;
  let smartContractService: SmartContractService;

  const mockInvestmentService = {
    createInvestment: jest.fn(),
    findAllInvestments: jest.fn(),
    findInvestmentById: jest.fn(),
    updateInvestment: jest.fn(),
    deleteInvestment: jest.fn(),
    findInvestmentsByInvestor: jest.fn(),
    findInvestmentsByStartup: jest.fn(),
    findInvestmentsByContract: jest.fn(),
    findInvestmentsByDate: jest.fn(),
  };

  const mockSmartContractService = {
    findsmartContractById: jest.fn(),
    addInvestmentTosmartContract: jest.fn()
  }

  const mockInvestment = {
    _id: new Types.ObjectId(),
    investorId: new Types.ObjectId(),
    startupId: new Types.ObjectId(),
    amount: 1000,
    equity: 20,
    conditions: 'Conditions for investment',
    escrowAmount: 500,
    escrowReleaseDate: new Date(),
    escrowStatus: 'In escrow',
    contractDetails: { contractId: new Types.ObjectId(), signedDate: new Date() },
    equityDistribution: 10,
    investmentDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentController],
      providers: [
        {
          provide: InvestmentService,
          useValue: mockInvestmentService,
        },
        {
          provide: SmartContractService,
          useValue: mockSmartContractService
        }
      ],
    }).compile();

    investmentController = module.get<InvestmentController>(InvestmentController);
    investmentService = module.get<InvestmentService>(InvestmentService);
    smartContractService = module.get<SmartContractService>(SmartContractService)
  });

  it('should be defined', () => {
    expect(investmentController).toBeDefined();
  });

  describe('createInvestment', () => {
    it('should create a new investment', async () => {
      const createDto: CreateInvestmentDto = {
        investorId: new Types.ObjectId(),
        startupId: new Types.ObjectId(),
        amount: 1000,
        equity: 20,
        conditions: 'Terms and conditions',
        escrowAmount: 500,
        escrowReleaseDate: new Date(),
        escrowStatus: 'In escrow',
        contractId: new Types.ObjectId(),
        signedDate: new Date(),
        equityDistribution: 10,
      };

      const smartContract = {
        _id: '60c72b2f9b1d8e1a4c8e4b3a',
        investmentId: '60c72b2f9b1d8e1a4c8e4b3b',
        terms: { milestoneConditions: 'Complete phase 1', escrowAmount: 5000 },
        milestoneStatus: { milestoneId: '60c72b2f9b1d8e1a4c8e4b3b', status: 'Pending' },
        escrowAmount: 10000,
        status: 'Active',
      };

            // @ts-ignore
            jest.spyOn(smartContractService, 'findsmartContractById').mockResolvedValue(smartContract);
      mockInvestmentService.createInvestment.mockResolvedValue(mockInvestment);

      const result = await investmentController.createInvestment(createDto);
      expect(result).toEqual(mockInvestment);
      expect(mockInvestmentService.createInvestment).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAllInvestments', () => {
    it('should return an array of investments', async () => {
      mockInvestmentService.findAllInvestments.mockResolvedValue([mockInvestment]);

      const result = await investmentController.findAllInvestments();
      expect(result).toEqual([mockInvestment]);
      expect(mockInvestmentService.findAllInvestments).toHaveBeenCalled();
    });
  });

  describe('findInvestmentById', () => {
    it('should return a single investment', async () => {
      mockInvestmentService.findInvestmentById.mockResolvedValue(mockInvestment);

      const result = await investmentController.findInvestmentById(mockInvestment._id.toString());
      expect(result).toEqual(mockInvestment);
      expect(mockInvestmentService.findInvestmentById).toHaveBeenCalledWith(mockInvestment._id.toString());
    });

    it('should throw a NotFoundException if investment not found', async () => {
      mockInvestmentService.findInvestmentById.mockResolvedValue(null);

      await expect(
        investmentController.findInvestmentById(mockInvestment._id.toString()),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateInvestment', () => {
    it('should update an investment', async () => {
      const updateDto: UpdateInvestmentDto = {
        amount: 2000,
        equity: 30,
        escrowAmount: 1000,
        escrowReleaseDate: new Date(),
        escrowStatus: 'Released',
        equityDistribution: 15,
        conditions: 'Updated conditions',
      };

      mockInvestmentService.updateInvestment.mockResolvedValue(mockInvestment);

      const result = await investmentController.updateInvestment(
        mockInvestment._id.toString(),
        updateDto,
      );
      expect(result).toEqual(mockInvestment);
      expect(mockInvestmentService.updateInvestment).toHaveBeenCalledWith(
        mockInvestment._id.toString(),
        updateDto,
      );
    });

    it('should throw a NotFoundException if investment not found', async () => {
      mockInvestmentService.updateInvestment.mockRejectedValue(new NotFoundException(`Investment with ID ${mockInvestment._id} not found`));
    
      const updateDto: UpdateInvestmentDto = {
        amount: 2000,
        equity: 30,
        escrowAmount: 1000,
        escrowReleaseDate: new Date(),
        escrowStatus: 'Released',
        equityDistribution: 15,
        conditions: 'Updated conditions',
      };
    
      await expect(
        investmentController.updateInvestment(mockInvestment._id.toString(), updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteInvestment', () => {
    it('should delete an investment', async () => {
      mockInvestmentService.deleteInvestment.mockResolvedValue(undefined);

      await investmentController.deleteInvestment(mockInvestment._id.toString());
      expect(mockInvestmentService.deleteInvestment).toHaveBeenCalledWith(mockInvestment._id.toString());
    });

    it('should throw a NotFoundException if investment not found', async () => {
      mockInvestmentService.deleteInvestment.mockRejectedValue(new NotFoundException(`Investment with ID ${mockInvestment._id} not found`));
    
      await expect(
        investmentController.deleteInvestment(mockInvestment._id.toString()),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // Custom Getters Tests
  describe('findInvestmentsByInvestor', () => {
    it('should return investments by investor', async () => {
      mockInvestmentService.findInvestmentsByInvestor.mockResolvedValue([mockInvestment]);

      const result = await investmentController.findInvestmentsByInvestor(mockInvestment.investorId.toString());
      expect(result).toEqual([mockInvestment]);
      expect(mockInvestmentService.findInvestmentsByInvestor).toHaveBeenCalledWith(mockInvestment.investorId.toString());
    });
  });

  describe('findInvestmentsByStartup', () => {
    it('should return investments by startup', async () => {
      mockInvestmentService.findInvestmentsByStartup.mockResolvedValue([mockInvestment]);

      const result = await investmentController.findInvestmentsByStartup(mockInvestment.startupId.toString());
      expect(result).toEqual([mockInvestment]);
      expect(mockInvestmentService.findInvestmentsByStartup).toHaveBeenCalledWith(mockInvestment.startupId.toString());
    });
  });

  describe('findInvestmentsByContract', () => {
    it('should return investments by contract', async () => {
      mockInvestmentService.findInvestmentsByContract.mockResolvedValue([mockInvestment]);

      const result = await investmentController.findInvestmentsByContract(mockInvestment.contractDetails.contractId.toString());
      expect(result).toEqual([mockInvestment]);
      expect(mockInvestmentService.findInvestmentsByContract).toHaveBeenCalledWith(mockInvestment.contractDetails.contractId.toString());
    });
  });

  describe('findInvestmentsByDate', () => {
    it('should return investments by date', async () => {
      mockInvestmentService.findInvestmentsByDate.mockResolvedValue([mockInvestment]);

      const result = await investmentController.findInvestmentsByDate(mockInvestment.investmentDate.toISOString());
      expect(result).toEqual([mockInvestment]);
      expect(mockInvestmentService.findInvestmentsByDate).toHaveBeenCalledWith(mockInvestment.investmentDate);
    });
  });
});

