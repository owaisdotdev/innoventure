import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { UpdateMilestoneDto } from '../dto/updateMilestone.dto';
import { NotFoundException } from '@nestjs/common';
import { Milestone } from '../schemas/milestone.schema';
import { Types } from 'mongoose';
import { StartupService } from '../startup/startup.service';

describe('MilestoneController', () => {
  let controller: MilestoneController;
  let service: MilestoneService;
  let startupService: StartupService;

  const mockMilestoneService = {
    createMilestone: jest.fn(),
    findAllMilestones: jest.fn(),
    findMilestoneById: jest.fn(),
    updateMilestone: jest.fn(),
    deleteMilestone: jest.fn(),
    findByTitle: jest.fn(),
    findBySmartContract: jest.fn(),
  };

  const mockStartupService = {  
    findStartupById: jest.fn(),
    addMilestoneToStartup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilestoneController],
      providers: [
        {
          provide: MilestoneService,
          useValue: mockMilestoneService,
        },
        {
          provide: StartupService,  
          useValue: mockStartupService,
        },
      ],
    }).compile();

    controller = module.get<MilestoneController>(MilestoneController);
    service = module.get<MilestoneService>(MilestoneService);
    startupService = module.get<StartupService>(StartupService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMilestone', () => {
    it('should create a milestone and update the startup', async () => {
      const createMilestoneDto = {
        startupId: 'startup-id', 
        title: 'New Milestone',  
        description: 'Test milestone description',  
        dueDate: new Date('2024-12-31'),  
        amountToBeReleased: 10000,  
        status: 'pending',  
        associatedSmartContractId: '64c1234abc5678def90ab123', 
      };
  
  
      const startup = {
        _id: 'startup-id',
        name: 'Test Startup',
        fundingNeeds: { milestones: [] },
        email: 'startup@test.com',
        password: 'password',
        businessPlan: {
          description: 'A great startup',
          industry: 'tech',
        },
      };
  
      const milestone = {
        _id: '64c4254abc5678def90ab123',
        title: 'New Milestone',  
        description: 'Test milestone description',  
        dueDate: new Date('2024-12-31'),  
        amountToBeReleased: 10000,  
        status: 'pending',  
        associatedSmartContractId: new Types.ObjectId('64c1234abc5678def90ab123'), 
      };
  
      const updatedStartup = {
        ...startup,
        fundingNeeds: {
          ...startup.fundingNeeds,
          milestones: [milestone._id],
        },
      };
  
      jest.spyOn(service, 'createMilestone').mockResolvedValue(milestone as Milestone);
      // @ts-ignore
      jest.spyOn(startupService, 'findStartupById').mockResolvedValue(startup);
  
      const result = await controller.createMilestone(createMilestoneDto);
  
      expect(service.createMilestone).toHaveBeenCalledWith(createMilestoneDto);
      expect(startupService.findStartupById).toHaveBeenCalledWith(createMilestoneDto.startupId);
      expect(result).toEqual(milestone);
    });
  
    it('should throw a NotFoundException if startup is not found', async () => {
      const createMilestoneDto = {
        startupId: 'startup-id', 
        title: 'New Milestone',  
        description: 'Test milestone description',  
        dueDate: new Date('2024-12-31'),  
        amountToBeReleased: 10000,  
        status: 'pending',  
        associatedSmartContractId: '64c1234abc5678def90ab123', 
      };
  
      jest.spyOn(startupService, 'findStartupById').mockResolvedValue(null);
  
      await expect(controller.createMilestone(createMilestoneDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });  

  describe('getAllMilestones', () => {
    it('should return an array of milestones', async () => {
      const result = [{ id: '1', title: 'milestone1' }];
      jest.spyOn(service, 'findAllMilestones').mockResolvedValue(result as Milestone[]);

      expect(await controller.getAllMilestones()).toBe(result);
    });
  });

  describe('getMilestoneById', () => {
    it('should return a single milestone by id', async () => {
      const milestoneId = '12345678';
      const result = { id: milestoneId, title: 'milestone1' };
      jest.spyOn(service, 'findMilestoneById').mockResolvedValue(result as Milestone);

      expect(await controller.getMilestoneById(milestoneId)).toBe(result);
    });

    it('should throw a NotFoundException if milestone is not found', async () => {
      const milestoneId = 'non-existent-id';
      jest
        .spyOn(service, 'findMilestoneById')
        .mockRejectedValue(new NotFoundException('milestone not found'));
  
      await expect(controller.getMilestoneById(milestoneId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updatemilestone', () => {
    it('should update an milestone', async () => {
      const milestoneId = '1';
      const updateDto: UpdateMilestoneDto = { title: 'Updated Name' };
      const result = { id: milestoneId, ...updateDto };

      // @ts-ignore
      jest.spyOn(service, 'updateMilestone').mockResolvedValue(result as Milestone);

      expect(await controller.updateMilestone(milestoneId, updateDto)).toBe(
        result,
      );
    });
  });

  describe('deletemilestone', () => {
    it('should delete an milestone', async () => {
      const milestoneId = '1';
      jest.spyOn(service, 'deleteMilestone').mockResolvedValue(true);

      expect(await controller.deleteMilestone(milestoneId)).toBe(true);
    });
  });

  describe('getBySector', () => {
    it('should return milestones filtered by sector', async () => {
      const title = 'milestone1';
      const result = [{ id: '1', title: 'milestone1'}];
      jest.spyOn(service, 'findByTitle').mockResolvedValue(result as Milestone[]);

      expect(await controller.getMilestonesByTitle(title)).toBe(result);
    });
  });

  describe('getMilestonesBySmartContract', () => {
    it('should return milestones filtered by region', async () => {
      const region = 'US';
      const result = [{ id: '1', title: 'milestone1', associatedSmartContractId: '60c72b2f9b1d8e1a4c8e4b3a' }];
      jest.spyOn(service, 'findBySmartContract').mockResolvedValue(result as unknown as Milestone[]);

      expect(await controller.getMilestonesBySmartContract(region)).toBe(result);
    });
  });
});
