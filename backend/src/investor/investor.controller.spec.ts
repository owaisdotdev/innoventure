import { Test, TestingModule } from '@nestjs/testing';
import { InvestorController } from './investor.controller';
import { InvestorService } from './investor.service';
import { UpdateInvestorDto } from '../dto/updateInvestor.dto';
import { NotFoundException } from '@nestjs/common';
import { Investor } from 'src/schemas/investor.schema';

describe('InvestorController', () => {
  let controller: InvestorController;
  let service: InvestorService;

  const mockInvestorService = {
    findAllInvestors: jest.fn(),
    findInvestorById: jest.fn(),
    findByEmail: jest.fn(),
    updateInvestor: jest.fn(),
    deleteInvestor: jest.fn(),
    findBySector: jest.fn(),
    findByRegion: jest.fn(),
    findByRiskTolerance: jest.fn(),
    findByMinInvestment: jest.fn(),
    findByMaxInvestment: jest.fn(),
    findByProfileStatus: jest.fn(),
    findByInvestmentRange: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorController],
      providers: [
        {
          provide: InvestorService,
          useValue: mockInvestorService,
        },
      ],
    }).compile();

    controller = module.get<InvestorController>(InvestorController);
    service = module.get<InvestorService>(InvestorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllInvestors', () => {
    it('should return an array of investors', async () => {
      const result = [{ id: '1', name: 'Investor1' }];
      jest.spyOn(service, 'findAllInvestors').mockResolvedValue(result as Investor[]);

      expect(await controller.getAllInvestors()).toBe(result);
    });
  });

  describe('getInvestorById', () => {
    it('should return a single investor by id', async () => {
      const investorId = '12345678';
      const result = { id: investorId, name: 'Investor1' };
      jest.spyOn(service, 'findInvestorById').mockResolvedValue(result as Investor);

      expect(await controller.getInvestorById(investorId)).toBe(result);
    });

    it('should throw a NotFoundException if investor is not found', async () => {
      const investorId = 'non-existent-id';
      jest
        .spyOn(service, 'findInvestorById')
        .mockRejectedValue(new NotFoundException('Investor not found'));
  
      await expect(controller.getInvestorById(investorId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getInvestorByEmail', () => {
    it('should return a single investor by email', async () => {
      const email = 'test@example.com';
      const result = { id: '1', email, name: 'Investor1' };
      jest.spyOn(service, 'findByEmail').mockResolvedValue(result as Investor);

      expect(await controller.getInvestorByEmail(email)).toBe(result);
    });
  });

  describe('updateInvestor', () => {
    it('should update an investor', async () => {
      const investorId = '1';
      const updateDto: UpdateInvestorDto = { name: 'Updated Name' };
      const result = { id: investorId, ...updateDto };

      jest.spyOn(service, 'updateInvestor').mockResolvedValue(result as Investor);

      expect(await controller.updateInvestor(investorId, updateDto)).toBe(
        result,
      );
    });
  });

  describe('deleteInvestor', () => {
    it('should delete an investor', async () => {
      const investorId = '1';
      jest.spyOn(service, 'deleteInvestor').mockResolvedValue(true);

      expect(await controller.deleteInvestor(investorId)).toBe(true);
    });
  });

  describe('getBySector', () => {
    it('should return investors filtered by sector', async () => {
      const sector = 'Tech';
      const result = [{ id: '1', name: 'Investor1', preferences: {sectors: [sector]} }];
      jest.spyOn(service, 'findBySector').mockResolvedValue(result as Investor[]);

      expect(await controller.getBySector(sector)).toBe(result);
    });
  });

  describe('getInvestorsByRegion', () => {
    it('should return investors filtered by region', async () => {
      const region = 'US';
      const result = [{ id: '1', name: 'Investor1', preferences: {regions: [region]} }];
      jest.spyOn(service, 'findByRegion').mockResolvedValue(result as Investor[]);

      expect(await controller.getInvestorsByRegion(region)).toBe(result);
    });
  });

  describe('getInvestorsByRiskTolerance', () => {
    it('should return investors filtered by risk tolerance', async () => {
      const riskTolerance = 'Medium';
      const result = [{ id: '1', name: 'Investor1', preferences: {riskTolerance} }];
      jest.spyOn(service, 'findByRiskTolerance').mockResolvedValue(result as Investor[]);

      expect(
        await controller.getInvestorsByRiskTolerance(riskTolerance),
      ).toBe(result);
    });
  });

  describe('getInvestorsByMinInvestment', () => {
    it('should return investors filtered by minimum investment', async () => {
      const minInvestment = 1000;
      const result = [{ id: '1', name: 'Investor1', criteria: {minInvestment} }];
      jest.spyOn(service, 'findByMinInvestment').mockResolvedValue(result as Investor[]);

      expect(await controller.getInvestorsByMinInvestment(minInvestment)).toBe(
        result,
      );
    });
  });

  describe('getInvestorsByMaxInvestment', () => {
    it('should return investors filtered by maximum investment', async () => {
      const maxInvestment = 5000;
      const result = [{ id: '1', name: 'Investor1', criteria: {maxInvestment} }];
      jest.spyOn(service, 'findByMaxInvestment').mockResolvedValue(result as Investor[]);

      expect(await controller.getInvestorsByMaxInvestment(maxInvestment)).toBe(
        result,
      );
    });
  });

  describe('getInvestorsByProfileStatus', () => {
    it('should return investors filtered by profile status', async () => {
      const profileStatus = 'active';
      const result = [{ id: '1', name: 'Investor1', profileStatus }];
      jest.spyOn(service, 'findByProfileStatus').mockResolvedValue(result as Investor[]);

      expect(await controller.getInvestorsByProfileStatus(profileStatus)).toBe(
        result,
      );
    });
  });

  describe('getByInvestmentRange', () => {
    it('should return investors filtered by investment range', async () => {
      const minInvestment = 1000;
      const maxInvestment = 5000;
      const result = [{ id: '1', name: 'Investor1', criteria: {minInvestment, maxInvestment} }];
      jest.spyOn(service, 'findByInvestmentRange').mockResolvedValue(result as Investor[]);

      expect(
        await controller.getByInvestmentRange(minInvestment, maxInvestment),
      ).toBe(result);
    });
  });
});
