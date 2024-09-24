import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { InvestorService } from '../investor/investor.service';
import { StartupService } from '../startup/startup.service';
import { UserRole } from '../schemas/user.schema';
import {
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let investorService: InvestorService;
  let startupService: StartupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
        {
          provide: InvestorService,
          useValue: {
            createInvestor: jest.fn(),
          },
        },
        {
          provide: StartupService,
          useValue: {
            createStartup: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    investorService = module.get<InvestorService>(InvestorService);
    startupService = module.get<StartupService>(StartupService);
  });

  describe('signup', () => {
    it('should sign up an investor and return the validated user', async () => {
      const mockUser = {
        _id: '123',
        email: 'test@example.com',
        role: UserRole.INVESTOR,
      };
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        role: UserRole.INVESTOR,
        roleSpecificData: {
          sectors: ['Tech'],
          regions: ['US'],
          riskTolerance: 'Medium',
        },
      };

      // @ts-ignore
      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);
      jest
        .spyOn(investorService, 'createInvestor')
        .mockResolvedValue(undefined);
      // @ts-ignore
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);

      const result = await authController.signup(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
        signupData.roleSpecificData,
      );

      expect(userService.createUser).toHaveBeenCalledWith(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
      );
      expect(investorService.createInvestor).toHaveBeenCalledWith({
        userId: mockUser._id,
        ...signupData.roleSpecificData,
      });
      expect(authService.validateUser).toHaveBeenCalledWith(
        signupData.email,
        signupData.password,
      );
      expect(result).toEqual(mockUser);
    });

    it('should sign up a startup and return the validated user', async () => {
      const mockUser = {
        _id: '123',
        email: 'startup@example.com',
        role: UserRole.STARTUP,
      };
      const signupData = {
        name: 'Startup Co',
        email: 'startup@example.com',
        password: 'password123',
        role: UserRole.STARTUP,
        roleSpecificData: {
          businessPlan: {
            description: 'Plan',
            industry: 'Tech',
            team: ['Alice', 'Bob'],
          },
          fundingNeeds: { totalAmount: 100000, milestones: [] },
        },
      };

      // @ts-ignore
      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);
      jest.spyOn(startupService, 'createStartup').mockResolvedValue(undefined);
      // @ts-ignore
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);

      const result = await authController.signup(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
        signupData.roleSpecificData,
      );

      expect(userService.createUser).toHaveBeenCalledWith(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
      );
      expect(startupService.createStartup).toHaveBeenCalledWith({
        userId: mockUser._id,
        ...signupData.roleSpecificData,
      });
      expect(authService.validateUser).toHaveBeenCalledWith(
        signupData.email,
        signupData.password,
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw InternalServerErrorException if creating user fails', async () => {
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        role: UserRole.INVESTOR,
        roleSpecificData: {
          sectors: ['Tech'],
          regions: ['US'],
          riskTolerance: 'Medium',
        },
      };

      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new Error('User creation failed'));

      await expect(
        authController.signup(
          signupData.name,
          signupData.email,
          signupData.password,
          signupData.role,
          signupData.roleSpecificData,
        ),
      ).rejects.toThrow(InternalServerErrorException);

      expect(userService.createUser).toHaveBeenCalledWith(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
      );
      expect(investorService.createInvestor).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException and rollback if investor creation fails', async () => {
      const mockUser = {
        _id: '123',
        email: 'test@example.com',
        role: UserRole.INVESTOR,
      };
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        role: UserRole.INVESTOR,
        roleSpecificData: {
          sectors: ['Tech'],
          regions: ['US'],
          riskTolerance: 'Medium',
        },
      };

      // @ts-ignore
      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);
      jest
        .spyOn(investorService, 'createInvestor')
        .mockRejectedValue(new Error('Investor creation failed'));

      await expect(
        authController.signup(
          signupData.name,
          signupData.email,
          signupData.password,
          signupData.role,
          signupData.roleSpecificData,
        ),
      ).rejects.toThrow(InternalServerErrorException);

      expect(userService.createUser).toHaveBeenCalledWith(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
      );
      expect(investorService.createInvestor).toHaveBeenCalledWith({
        userId: mockUser._id,
        ...signupData.roleSpecificData,
      });
    });
  });

  describe('login', () => {
    it('should return a valid access token for a correct email and password', async () => {
      const mockUser = {
        _id: '123',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      const mockToken = { access_token: 'jwt_token' };

      // @ts-ignore
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

      const result = await authController.login(
        'test@example.com',
        'validPassword',
      );

      expect(authService.validateUser).toHaveBeenCalledWith(
        'test@example.com',
        'validPassword',
      );
      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockToken);
    });

    it('should throw an UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null); // Simulate invalid credentials

      await expect(
        authController.login('invalid@example.com', 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException); // This will now correctly expect UnauthorizedException

      expect(authService.validateUser).toHaveBeenCalledWith(
        'invalid@example.com',
        'wrongPassword',
      );
      expect(authService.login).not.toHaveBeenCalled();
    });
  });
});
