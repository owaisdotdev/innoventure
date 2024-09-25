import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('/auth/signup/investor (POST) - investor', async () => {
    const signupData = {
      name: 'John Doe', // According to CreateInvestorDto
      email: 'john@example.com',
      password: 'password123',
      profileStatus: 'active',
      preferences: {
        sectors: ['Tech'], // InvestorPreferencesDto
        regions: ['US'],
        riskTolerance: 'Medium',
      },
      criteria: {
        minInvestment: 5000, // InvestorCriteriaDto
        maxInvestment: 50000,
        investmentHorizon: '5 years',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup/investor')
      .send(signupData)
      .expect(201); // Expect a successful signup
    expect(response.body.email).toBe(signupData.email);
  });

  it('/auth/signup/startup (POST) - startup', async () => {
    const signupData = {
      name: 'Startup Co', 
      email: 'startup@example.com',
      password: 'password123',
      businessPlan: {
        description: 'A comprehensive plan', 
        industry: 'Tech',
        team: ['Alice', 'Bob'],
      },
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup/startup')
      .send(signupData)
      .expect(201); // Expect a successful signup

    expect(response.body.email).toBe(signupData.email);
  });

  it('should throw ConflictException for duplicate email during investor signup', async () => {
    const duplicateSignupData = {
      name: 'John Doe', 
      email: 'john@example.com',
      password: 'password123',
      profileStatus: 'active',
      preferences: {
        sectors: ['Tech'],
        regions: ['US'],
        riskTolerance: 'Medium',
      },
      criteria: {
        minInvestment: 5000, 
        maxInvestment: 50000,
        investmentHorizon: '5 years',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup/investor')
      .send(duplicateSignupData)
      .expect(409); // Expect Conflict response

    expect(response.body.message).toBe('Email already in use');
  });

  it('should throw ConflictException for duplicate email during startup signup', async () => {
    const duplicateSignupData = {
      name: 'Startup Co', 
      email: 'startup@example.com',
      password: 'password123',
      businessPlan: {
        description: 'A comprehensive plan', 
        industry: 'Tech',
        team: ['Alice', 'Bob'],
      },
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup/startup')
      .send(duplicateSignupData)
      .expect(409); 

    expect(response.body.message).toBe('Email already in use');
  });

  it('/auth/login/investor (POST)', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login/investor')
      .send(loginData)
      .expect(200); // Expect a successful login

    expect(response.body).toHaveProperty('access_token'); // Check if the response contains the access token
    expect(typeof response.body.access_token).toBe('string'); // Ensure the access token is a string
  });

  it('should throw UnauthorizedException for invalid investor login', async () => {
    const loginData = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login/investor')
      .send(loginData)
      .expect(401);

    expect(response.body.message).toBe('Invalid login credentials');
  });

  it('/auth/login/startup (POST)', async () => {
    const loginData = {
      email: 'startup@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login/startup')
      .send(loginData)
      .expect(200); // Expect a successful login

    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
  });

  it('should throw UnauthorizedException for invalid startup login', async () => {
    const loginData = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login/startup')
      .send(loginData)
      .expect(401);

    expect(response.body.message).toBe('Invalid login credentials');
  });

  it('/auth/login/admin (POST)', async () => {
    const loginData = {
      email: 'admin@example.com',
      password: 'adminpassword123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login/admin')
      .send(loginData)
      .expect(200); 

    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
  });

  it('should throw UnauthorizedException for invalid admin login', async () => {
    const loginData = {
      email: 'invalidadmin@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login/admin')
      .send(loginData)
      .expect(401);

    expect(response.body.message).toBe('Invalid admin credentials');
  });
});
