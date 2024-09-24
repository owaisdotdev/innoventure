import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserRole } from './../src/schemas/user.schema';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Ensure the app is closed to prevent open handles
  });

  it('/auth/signup (POST) - investor', async () => {
    const signupData = {
      name: 'John',
      email: 'john@example.com',
      password: 'password123',
      role: UserRole.INVESTOR,
      roleSpecificData: {
        sectors: ['Tech'],
        regions: ['US'],
        riskTolerance: 'Medium',
        profileStatus: 'active',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupData)
      .expect(201); // Expect a successful signup

    expect(response.body.email).toBe(signupData.email);
    expect(response.body.role).toBe(UserRole.INVESTOR);
  });

  it('/auth/signup (POST) - startup', async () => {
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

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupData)
      .expect(201); // Expect a successful signup

    expect(response.body.email).toBe(signupData.email);
    expect(response.body.role).toBe(UserRole.STARTUP);
  });

  it('should throw ConflictException for duplicate email during signup', async () => {
    const duplicateSignupData = {
      name: 'Jane',
      email: 'john@example.com',
      password: 'newpassword123',
      role: UserRole.INVESTOR,
      roleSpecificData: {
        sectors: ['Finance'],
        regions: ['EU'],
        riskTolerance: 'Low',
        profileStatus: 'active',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(duplicateSignupData)
      .expect(409); // Expect Conflict response

    expect(response.body.message).toBe('Email already in use');
  });

  it('/auth/login (POST)', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(200); // Expect a successful login

    expect(response.body).toHaveProperty('access_token'); // Check if the response contains the access token
    expect(typeof response.body.access_token).toBe('string'); // Ensure the access token is a string
  });

  it('should throw UnauthorizedException for invalid login', async () => {
    const loginData = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(401);

    expect(response.body.message).toBe('Invalid credentials');
  });
});
