import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StartupController } from './startup.controller';
import { StartupService } from './startup.service';
import { Startup } from '../schemas/startup.schema';
import { UpdateStartupDto } from '../dto/updateStartup.dto';

describe('StartupController', () => {
  let controller: StartupController;
  let service: StartupService;

  const mockStartupService = {
    findAllStartups: jest.fn(),
    findStartupById: jest.fn(),
    findByEmail: jest.fn(),
    updateStartup: jest.fn(),
    deleteStartup: jest.fn(),
    findByIndustry: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartupController],
      providers: [
        {
          provide: StartupService,
          useValue: mockStartupService,
        },
      ],
    }).compile();

    controller = module.get<StartupController>(StartupController);
    service = module.get<StartupService>(StartupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllStartups', () => {
    it('should return an array of startups', async () => {
      const result = [{ id: '1', name: 'Startup1' }];
      jest.spyOn(service, 'findAllStartups').mockResolvedValue(result as Startup[]);

      expect(await controller.getAllStartups()).toBe(result);
    });
  });

  describe('getStartupById', () => {
    it('should return a single startup by id', async () => {
      const startupId = '12345678';
      const result = { id: startupId, name: 'Startup1' };
      jest.spyOn(service, 'findStartupById').mockResolvedValue(result as Startup);

      expect(await controller.getStartupById(startupId)).toBe(result);
    });

    it('should throw a NotFoundException if startup is not found', async () => {
      const startupId = 'non-existent-id';
      jest
        .spyOn(service, 'findStartupById')
        .mockRejectedValue(new NotFoundException('Startup not found'));
  
      await expect(controller.getStartupById(startupId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getStartupByEmail', () => {
    it('should return a single startup by email', async () => {
      const email = 'test@example.com';
      const result = { id: '1', email, name: 'Startup1' };
      jest.spyOn(service, 'findByEmail').mockResolvedValue(result as Startup);

      expect(await controller.getStartupByEmail(email)).toBe(result);
    });
  });

  describe('updateStartup', () => {
    it('should update an startup', async () => {
      const startupId = '1';
      const updateDto: UpdateStartupDto = { name: 'Updated Name' };
      const result = { id: startupId, ...updateDto };

      jest.spyOn(service, 'updateStartup').mockResolvedValue(result as Startup);

      expect(await controller.updateStartup(startupId, updateDto)).toBe(
        result,
      );
    });
  });

  describe('deleteStartup', () => {
    it('should delete an startup', async () => {
      const startupId = '1';
      jest.spyOn(service, 'deleteStartup').mockResolvedValue(true);

      expect(await controller.deleteStartup(startupId)).toBe(true);
    });
  });

  describe('getByIndustry', () => {
    it('should return startups filtered by industry', async () => {
      const industry = 'Tech';
      const result = [{ id: '1', name: 'Startup1', businessPlan: {industry: industry} }];
      jest.spyOn(service, 'findByIndustry').mockResolvedValue(result as Startup[]);

      expect(await controller.getByIndustry(industry)).toBe(result);
    });
  });
});
