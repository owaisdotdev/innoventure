import { Test, TestingModule } from '@nestjs/testing';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from '../dto/createProposal.dto';
import { UpdateProposalDto } from '../dto/updateProposal.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProposalController', () => {
  let controller: ProposalController;
  let service: ProposalService;

  const mockProposal = {
    _id: '507f1f77bcf86cd799439011',
    investorId: '507f1f77bcf86cd799439012',
    startupId: '507f1f77bcf86cd799439013',
    industry: 'Technology',
    investmentAmount: 100000,
    terms: {
      equity: 10,
      conditions: 'Monthly revenue share of 5%'
    },
    escrowStatus: {
      amount: 100000,
      releaseDate: new Date(),
      status: 'In escrow'
    },
    status: 'pending'
  };

  const mockProposalService = {
    createProposal: jest.fn(),
    getProposalById: jest.fn(),
    getAllProposals: jest.fn(),
    getProposalsByStatus: jest.fn(),
    updateProposal: jest.fn(),
    deleteProposal: jest.fn(),
    updateEscrowStatus: jest.fn(),
    changeProposalStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProposalController],
      providers: [
        {
          provide: ProposalService,
          useValue: mockProposalService,
        },
      ],
    }).compile();

    controller = module.get<ProposalController>(ProposalController);
    service = module.get<ProposalService>(ProposalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProposal', () => {
    it('should create a new proposal', async () => {
      const createProposalDto: CreateProposalDto = {
        investorId: mockProposal.investorId,
        startupId: mockProposal.startupId,
        industry: mockProposal.industry,
        investmentAmount: mockProposal.investmentAmount,
        terms: mockProposal.terms,
        escrowStatus: mockProposal.escrowStatus,
        status: mockProposal.status
      };

      mockProposalService.createProposal.mockResolvedValue(mockProposal);

      const result = await controller.createProposal(createProposalDto);
      expect(result).toEqual(mockProposal);
      expect(mockProposalService.createProposal).toHaveBeenCalledWith(createProposalDto);
    });
  });

  describe('getProposal', () => {
    it('should return a proposal by id', async () => {
      mockProposalService.getProposalById.mockResolvedValue(mockProposal);

      const result = await controller.getProposal(mockProposal._id);
      expect(result).toEqual(mockProposal);
      expect(mockProposalService.getProposalById).toHaveBeenCalledWith(mockProposal._id);
    });

    it('should throw NotFoundException when proposal not found', async () => {
      mockProposalService.getProposalById.mockRejectedValue(new NotFoundException());

      await expect(controller.getProposal('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProposals', () => {
    it('should return all proposals when no status provided', async () => {
      const mockProposals = [mockProposal];
      mockProposalService.getAllProposals.mockResolvedValue(mockProposals);

      const result = await controller.getProposals();
      expect(result).toEqual(mockProposals);
      expect(mockProposalService.getAllProposals).toHaveBeenCalled();
    });

    it('should return filtered proposals when status provided', async () => {
      const mockProposals = [mockProposal];
      mockProposalService.getProposalsByStatus.mockResolvedValue(mockProposals);

      const result = await controller.getProposals('pending');
      expect(result).toEqual(mockProposals);
      expect(mockProposalService.getProposalsByStatus).toHaveBeenCalledWith('pending');
    });
  });

  describe('updateProposal', () => {
    it('should update a proposal', async () => {
      const updateProposalDto: UpdateProposalDto = {
        industry: 'Fintech',
        investmentAmount: 200000
      };

      const updatedProposal = { ...mockProposal, ...updateProposalDto };
      mockProposalService.updateProposal.mockResolvedValue(updatedProposal);

      const result = await controller.updateProposal(mockProposal._id, updateProposalDto);
      expect(result).toEqual(updatedProposal);
      expect(mockProposalService.updateProposal).toHaveBeenCalledWith(mockProposal._id, updateProposalDto);
    });
  });

  describe('deleteProposal', () => {
    it('should delete a proposal', async () => {
      mockProposalService.deleteProposal.mockResolvedValue(undefined);

      await controller.deleteProposal(mockProposal._id);
      expect(mockProposalService.deleteProposal).toHaveBeenCalledWith(mockProposal._id);
    });

    it('should throw NotFoundException when trying to delete non-existent proposal', async () => {
      mockProposalService.deleteProposal.mockRejectedValue(new NotFoundException());

      await expect(controller.deleteProposal('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateEscrowStatus', () => {
    it('should update escrow status', async () => {
      const newEscrowStatus = {
        status: 'Released',
        releaseDate: new Date()
      };

      const updatedProposal = { 
        ...mockProposal, 
        escrowStatus: { ...mockProposal.escrowStatus, ...newEscrowStatus }
      };
      mockProposalService.updateEscrowStatus.mockResolvedValue(updatedProposal);

      const result = await controller.updateEscrowStatus(mockProposal._id, newEscrowStatus);
      expect(result).toEqual(updatedProposal);
      expect(mockProposalService.updateEscrowStatus).toHaveBeenCalledWith(mockProposal._id, newEscrowStatus);
    });
  });

  describe('changeProposalStatus', () => {
    it('should change proposal status', async () => {
      const newStatus = 'accepted' as const;
      const updatedProposal = { ...mockProposal, status: newStatus };
      mockProposalService.changeProposalStatus.mockResolvedValue(updatedProposal);

      const result = await controller.changeProposalStatus(mockProposal._id, newStatus);
      expect(result).toEqual(updatedProposal);
      expect(mockProposalService.changeProposalStatus).toHaveBeenCalledWith(mockProposal._id, newStatus);
    });
  });
});