import { Test, TestingModule } from '@nestjs/testing';
import { InvestorDashboardController } from './investor-dashboard.controller';
import { InvestorDashboardService } from './investor-dashboard.service';

describe('InvestorDashboardController', () => {
  let controller: InvestorDashboardController;
  let service: InvestorDashboardService;

  const mockInvestorDashboardService = {
    getTotalInvestment: jest.fn(),
    getActiveStartups: jest.fn(),
    getTotalReturns: jest.fn(),
    getRecentActivity: jest.fn(),
    getActiveInvestments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorDashboardController],
      providers: [
        {
          provide: InvestorDashboardService,
          useValue: mockInvestorDashboardService,
        },
      ],
    }).compile();

    controller = module.get<InvestorDashboardController>(
      InvestorDashboardController,
    );
    service = module.get<InvestorDashboardService>(InvestorDashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTotalInvestment', () => {
    it('should return the total investment amount', async () => {
      const mockInvestorId = 'investor1';
      const mockTotalInvestment = 10000;
      mockInvestorDashboardService.getTotalInvestment.mockResolvedValue(
        mockTotalInvestment,
      );

      const result = await controller.getTotalInvestment(mockInvestorId);

      expect(result).toBe(mockTotalInvestment);
      expect(service.getTotalInvestment).toHaveBeenCalledWith(mockInvestorId);
    });
  });

  describe('getActiveStartups', () => {
    it('should return the number of active startups', async () => {
      const mockInvestorId = 'investor1';
      const mockActiveStartups = 5;
      mockInvestorDashboardService.getActiveStartups.mockResolvedValue(
        mockActiveStartups,
      );

      const result = await controller.getActiveStartups(mockInvestorId);

      expect(result).toBe(mockActiveStartups);
      expect(service.getActiveStartups).toHaveBeenCalledWith(mockInvestorId);
    });
  });

  describe('getTotalReturns', () => {
    it('should return the total returns', async () => {
      const mockInvestorId = 'investor1';
      const mockTotalReturns = 5000;
      mockInvestorDashboardService.getTotalReturns.mockResolvedValue(
        mockTotalReturns,
      );

      const result = await controller.getTotalReturns(mockInvestorId);

      expect(result).toBe(mockTotalReturns);
      expect(service.getTotalReturns).toHaveBeenCalledWith(mockInvestorId);
    });
  });

  describe('getRecentActivity', () => {
    it('should return a list of recent activities', async () => {
      const mockInvestorId = 'investor1';
      const mockLimit = 5;
      const mockRecentActivity = [
        { type: 'investment', message: 'Invested in Startup A', date: new Date() },
      ];
      mockInvestorDashboardService.getRecentActivity.mockResolvedValue(
        mockRecentActivity,
      );

      const result = await controller.getRecentActivity(mockInvestorId, mockLimit);

      expect(result).toBe(mockRecentActivity);
      expect(service.getRecentActivity).toHaveBeenCalledWith(
        mockInvestorId,
        mockLimit,
      );
    });

    it('should default to 10 recent activities if limit is not provided', async () => {
      const mockInvestorId = 'investor1';
      const mockRecentActivity = [
        { type: 'investment', message: 'Invested in Startup B', date: new Date() },
      ];
      mockInvestorDashboardService.getRecentActivity.mockResolvedValue(
        mockRecentActivity,
      );

      const result = await controller.getRecentActivity(mockInvestorId);

      expect(result).toBe(mockRecentActivity);
      expect(service.getRecentActivity).toHaveBeenCalledWith(
        mockInvestorId,
        10,
      );
    });
  });

  describe('getActiveInvestments', () => {
    it('should return a list of active investments', async () => {
      const mockInvestorId = 'investor1';
      const mockActiveInvestments = [
        { startupName: 'Startup A', amount: 1000, status: 'approved' },
      ];
      mockInvestorDashboardService.getActiveInvestments.mockResolvedValue(
        mockActiveInvestments,
      );

      const result = await controller.getActiveInvestments(mockInvestorId);

      expect(result).toBe(mockActiveInvestments);
      expect(service.getActiveInvestments).toHaveBeenCalledWith(mockInvestorId);
    });
  });
});
