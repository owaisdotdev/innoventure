import { Test, TestingModule } from '@nestjs/testing';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminDashboardService } from './admin-dashboard.service';

describe('AdminDashboardController', () => {
  let controller: AdminDashboardController;
  let service: AdminDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminDashboardController],
      providers: [
        {
          provide: AdminDashboardService,
          useValue: {
            getTotalInvestments: jest.fn(),
            getActiveStartups: jest.fn(),
            getActiveInvestors: jest.fn(),
            getRecentActivity: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminDashboardController>(AdminDashboardController);
    service = module.get<AdminDashboardService>(AdminDashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTotalInvestments', () => {
    it('should call getTotalInvestments method from AdminDashboardService', async () => {
      const mockResult = { totalAmount: 1000000, totalCount: 10 };
      jest.spyOn(service, 'getTotalInvestments').mockResolvedValue(mockResult);

      const result = await controller.getTotalInvestments();
      expect(service.getTotalInvestments).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('getActiveStartups', () => {
    it('should call getActiveStartups method from AdminDashboardService', async () => {
      const mockResult = {activeStartups: 20};
      jest.spyOn(service, 'getActiveStartups').mockResolvedValue(mockResult);

      const result = await controller.getActiveStartups();
      expect(service.getActiveStartups).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('getActiveInvestors', () => {
    it('should call getActiveInvestors method from AdminDashboardService', async () => {
      const mockResult = {activeInvestors: 15};
      jest.spyOn(service, 'getActiveInvestors').mockResolvedValue(mockResult);

      const result = await controller.getActiveInvestors();
      expect(service.getActiveInvestors).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('getRecentActivity', () => {
    it('should call getRecentActivity method from AdminDashboardService', async () => {
      const mockResult = {
        recentInvestments: [],
        recentStartups: [],
        recentInvestors: [],
      };
      jest.spyOn(service, 'getRecentActivity').mockResolvedValue(mockResult);

      const result = await controller.getRecentActivity();
      expect(service.getRecentActivity).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });
});
