import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserRole } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  const mockUserModel = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockUser = {
    _id: '123',
    name: 'John Doe',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: UserRole.INVESTOR,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return a user if one is found', async () => {
      mockUserModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await userService.findByEmail('test@example.com');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
      expect(result).toEqual(mockUser);
    });

    it('should return undefined if no user is found', async () => {
      mockUserModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      const result = await userService.findByEmail('nonexistent@example.com');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: 'nonexistent@example.com',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should hash the password and create a new user', async () => {
      const hashedPassword = 'hashedPassword';
      const mockCreateUserInput = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.INVESTOR,
      };

      // Explicitly cast bcrypt.hash for type assertion
      jest
        .spyOn(bcrypt, 'hash' as keyof typeof bcrypt)
        .mockResolvedValue(hashedPassword as never);

      // Mock save method
      mockUserModel.create.mockImplementationOnce(() => ({
        save: jest
          .fn()
          .mockResolvedValue({ ...mockUser, password: hashedPassword }),
      }));

      const result = await userService.createUser(
        mockCreateUserInput.name,
        mockCreateUserInput.email,
        mockCreateUserInput.password,
        mockCreateUserInput.role,
      );

      expect(bcrypt.hash).toHaveBeenCalledWith(
        mockCreateUserInput.password,
        10,
      );
      expect(result.password).toEqual(hashedPassword);
      expect(result.name).toEqual(mockCreateUserInput.name);
      expect(result.email).toEqual(mockCreateUserInput.email);
    });
  });

  describe('validatePassword', () => {
    it('should return true if password matches the hashed password', async () => {
      // @ts-ignore
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await userService.validatePassword(
        'password123',
        'hashedPassword',
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      expect(result).toBe(true);
    });

    it('should return false if password does not match the hashed password', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await userService.validatePassword(
        'wrongPassword',
        'hashedPassword',
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongPassword',
        'hashedPassword',
      );
      expect(result).toBe(false);
    });
  });
});
