import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateInvestorDto } from '../dto/createInvestor.dto';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { LoginDto } from '../dto/login.dto';
import { Investor } from '../schemas/investor.schema';
import { Startup } from 'src/schemas/startup.schema';
import { Types } from 'mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let investorService: InvestorService;
  let startupService: StartupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginInvestor: jest.fn(),
            loginStartup: jest.fn(),
            validateInvestor: jest.fn(),
            validateStartup: jest.fn(),
          },
        },
        {
          provide: InvestorService,
          useValue: {
            findByEmail: jest.fn(),
            createInvestor: jest.fn(),
          },
        },
        {
          provide: StartupService,
          useValue: {
            findByEmail: jest.fn(),
            createStartup: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    investorService = module.get<InvestorService>(InvestorService);
    startupService = module.get<StartupService>(StartupService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signupInvestor', () => {
    const createInvestorDto: CreateInvestorDto = {
      name: 'Test Investor',
      email: 'investor@test.com',
      password: 'password',
      profileStatus: 'active',
      preferences: {
        sectors: ['tech'],
        regions: ['US'],
        riskTolerance: 'medium',
      },
      criteria: {
        minInvestment: 1000,
        maxInvestment: 5000,
        investmentHorizon: '5 years',
      },
    };

    it('should sign up an investor and return a login token', async () => {
      const investor: Partial<Investor> = {
        _id: '12345',
        name: createInvestorDto.name,
        email: createInvestorDto.email,
        password: createInvestorDto.password,
        profileStatus: createInvestorDto.profileStatus,
        preferences: createInvestorDto.preferences,
        criteria: createInvestorDto.criteria,
      };

      jest.spyOn(investorService, 'findByEmail').mockResolvedValue(null);
      jest
        .spyOn(investorService, 'createInvestor')
        .mockResolvedValue(investor as Investor);
      jest.spyOn(authService, 'loginInvestor').mockResolvedValue({
        access_token: 'login_token',
        investor: investor,
      });

      const result = await authController.signupInvestor(createInvestorDto);
      expect(investorService.findByEmail).toHaveBeenCalledWith(
        createInvestorDto.email,
      );
      expect(investorService.createInvestor).toHaveBeenCalledWith(
        createInvestorDto,
      );
      expect(authService.loginInvestor).toHaveBeenCalledWith(investor);
      expect(result).toEqual({
        access_token: 'login_token',
        investor: investor,
      });
    });

    it('should throw a ConflictException if email is already registered', async () => {
      const mockInvestor: Partial<Investor> = {
        _id: '123456', // Simulated MongoDB ObjectId
        name: createInvestorDto.name,
        email: createInvestorDto.email,
        password: createInvestorDto.password,
        profileStatus: createInvestorDto.profileStatus,
        preferences: createInvestorDto.preferences,
        criteria: createInvestorDto.criteria,
        investments: [],
        notifications: [],
      };

      // Mock `findByEmail` to return an existing investor object
      jest
        .spyOn(investorService, 'findByEmail')
        .mockResolvedValue(mockInvestor as Investor);

      // Expect that ConflictException will be thrown
      await expect(
        authController.signupInvestor(createInvestorDto),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest
        .spyOn(investorService, 'findByEmail')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        authController.signupInvestor(createInvestorDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('signupStartup', () => {
    const createStartupDto: CreateStartupDto = {
      name: 'Test Startup',
      email: 'startup@test.com',
      password: 'password',
      businessPlan: {
        description: 'A great startup',
        industry: 'tech',
        team: ['Alice', 'Bob'],
      },
      fundingNeeds: {
        totalAmount: 1000000,
        milestones: [
          {
            // @ts-ignore
            milestoneId: '123456', // MilestoneDto uses string for milestoneId
            description: 'MVP release',
            dueDate: new Date(),
            fundingRequired: 500000,
            status: 'Pending', // Include the status field as required by the schema
          },
        ],
      },
    };
    
    it('should sign up a startup and return a login token', async () => {
      const startup: Partial<Startup> = {
        ...createStartupDto,
        id: '12345',
        fundingNeeds: {
          totalAmount: 1000000,
          milestones: [
            {
              milestoneId: new Types.ObjectId(), // Use ObjectId for milestoneId
              description: 'MVP release',
              dueDate: new Date(),
              fundingRequired: 500000,
              status: 'Pending', // Ensure status is included as per the schema
            },
          ],
        },
      };
    
      jest.spyOn(startupService, 'findByEmail').mockResolvedValue(null);
      jest
        .spyOn(startupService, 'createStartup')
        .mockResolvedValue(startup as Startup);
      jest.spyOn(authService, 'loginStartup').mockResolvedValue({
        access_token: 'login_token',
        startup: startup,
      });
    
      const result = await authController.signupStartup(createStartupDto);
    
      expect(startupService.findByEmail).toHaveBeenCalledWith(
        createStartupDto.email,
      );
      expect(startupService.createStartup).toHaveBeenCalledWith(createStartupDto);
      expect(authService.loginStartup).toHaveBeenCalledWith(startup);
      expect(result).toEqual({
        access_token: 'login_token',
        startup: startup,
      });
    });
    

    it('should throw a ConflictException if email is already registered', async () => {
      const startup: Partial<Startup> = {
        ...createStartupDto,
        id: '12345',
        fundingNeeds: {
          totalAmount: 1000000,
          milestones: [
            {
              milestoneId: new Types.ObjectId(), // Use ObjectId for milestoneId
              description: 'MVP release',
              dueDate: new Date(),
              fundingRequired: 500000,
              status: 'Pending', // Ensure status is included as per the schema
            },
          ],
        },
      };

      jest
        .spyOn(startupService, 'findByEmail')
        .mockResolvedValue(startup as Startup);

      await expect(
        authController.signupStartup(createStartupDto),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest
        .spyOn(startupService, 'findByEmail')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        authController.signupStartup(createStartupDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('loginInvestor', () => {
    const loginDto: LoginDto = {
      email: 'investor@test.com',
      password: 'password',
    };

    it('should login an investor and return a token', async () => {
      const investor = { id: '12345', email: loginDto.email };
      jest.spyOn(authService, 'validateInvestor').mockResolvedValue(investor);
      jest.spyOn(authService, 'loginInvestor').mockResolvedValue({
        access_token: 'login_token',
        investor: investor,
      });

      const result = await authController.loginInvestor(loginDto);
      expect(authService.validateInvestor).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(authService.loginInvestor).toHaveBeenCalledWith(investor);
      expect(result).toEqual({
        access_token: 'login_token',
        investor: investor,
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(authService, 'validateInvestor').mockResolvedValue(null);

      await expect(authController.loginInvestor(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('loginStartup', () => {
    const loginDto: LoginDto = {
      email: 'startup@test.com',
      password: 'password',
    };

    it('should login a startup and return a token', async () => {
      const startup = { id: '12345', email: loginDto.email };
      jest.spyOn(authService, 'validateStartup').mockResolvedValue(startup);
      jest.spyOn(authService, 'loginStartup').mockResolvedValue({
        access_token: 'login_token',
        startup: startup,
      });

      const result = await authController.loginStartup(loginDto);
      expect(authService.validateStartup).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(authService.loginStartup).toHaveBeenCalledWith(startup);
      expect(result).toEqual({
        access_token: 'login_token',
        startup: startup,
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(authService, 'validateStartup').mockResolvedValue(null);

      await expect(authController.loginStartup(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
