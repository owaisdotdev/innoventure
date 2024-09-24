import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../schemas/user.schema';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            validatePassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return the user if email and password are valid', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: 'hashedPassword',
    } as User;

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(userService, 'validatePassword').mockResolvedValue(true);

    const result = await authService.validateUser(
      'test@example.com',
      'validPassword',
    );
    expect(result).toEqual(mockUser);
  });

  it('should return null if email is not found', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

    const result = await authService.validateUser(
      'invalid@example.com',
      'password',
    );
    expect(result).toBeNull();
  });

  it('should return null if password is invalid', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedPassword' } as User;

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(userService, 'validatePassword').mockResolvedValue(false);

    const result = await authService.validateUser('test@example.com', 'wrongPassword');
    expect(result).toBeNull();
  });

  it('should return a valid access token', async () => {
    const mockUser = { email: 'test@example.com', role: UserRole.INVESTOR, _id: '123' } as User;
    const mockToken = 'mockAccessToken';

    jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

    const result = await authService.login(mockUser);
    expect(result).toEqual({ access_token: mockToken });
  });
});
