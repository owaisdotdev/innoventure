import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// describe('AuthController (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/auth/signup/investor (POST) - investor', async () => {
//     const signupData = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       profileStatus: 'active',
//       preferences: {
//         sectors: ['Tech'],
//         regions: ['US'],
//         riskTolerance: 'Medium',
//       },
//       criteria: {
//         minInvestment: 5000,
//         maxInvestment: 50000,
//         investmentHorizon: '5 years',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signup/investor')
//       .send(signupData)
//       .expect(201);
//     expect(response.body.email).toBe(signupData.email);
//   });

//   it('/auth/signup/startup (POST) - startup', async () => {
//     const signupData = {
//       name: 'Startup Co',
//       email: 'startup@example.com',
//       password: 'password123',
//       businessPlan: {
//         description: 'A comprehensive plan',
//         industry: 'Tech',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signup/startup')
//       .send(signupData)
//       .expect(201);

//     expect(response.body.email).toBe(signupData.email);
//   });

//   it('should throw ConflictException for duplicate email during investor signup', async () => {
//     const duplicateSignupData = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       profileStatus: 'active',
//       preferences: {
//         sectors: ['Tech'],
//         regions: ['US'],
//         riskTolerance: 'Medium',
//       },
//       criteria: {
//         minInvestment: 5000,
//         maxInvestment: 50000,
//         investmentHorizon: '5 years',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signup/investor')
//       .send(duplicateSignupData)
//       .expect(409);
//     expect(response.body.message).toBe('Email already in use');
//   });

//   it('should throw ConflictException for duplicate email during startup signup', async () => {
//     const duplicateSignupData = {
//       name: 'Startup Co',
//       email: 'startup@example.com',
//       password: 'password123',
//       businessPlan: {
//         description: 'A comprehensive plan',
//         industry: 'Tech',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signup/startup')
//       .send(duplicateSignupData)
//       .expect(409);

//     expect(response.body.message).toBe('Email already in use');
//   });

//   it('/auth/login/investor (POST)', async () => {
//     const loginData = {
//       email: 'john@example.com',
//       password: 'password123',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/login/investor')
//       .send(loginData)
//       .expect(200);

//     expect(response.body).toHaveProperty('access_token');
//     expect(typeof response.body.access_token).toBe('string');
//   });

//   it('should throw UnauthorizedException for invalid investor login', async () => {
//     const loginData = {
//       email: 'invalid@example.com',
//       password: 'wrongpassword',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/login/investor')
//       .send(loginData)
//       .expect(401);

//     expect(response.body.message).toBe('Invalid login credentials');
//   });

//   it('/auth/login/startup (POST)', async () => {
//     const loginData = {
//       email: 'startup@example.com',
//       password: 'password123',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/login/startup')
//       .send(loginData)
//       .expect(200); // Expect a successful login

//     expect(response.body).toHaveProperty('access_token');
//     expect(typeof response.body.access_token).toBe('string');
//   });

//   it('should throw UnauthorizedException for invalid startup login', async () => {
//     const loginData = {
//       email: 'invalid@example.com',
//       password: 'wrongpassword',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/login/startup')
//       .send(loginData)
//       .expect(401);

//     expect(response.body.message).toBe('Invalid login credentials');
//   });

//   it('/auth/login/admin (POST)', async () => {
//     const loginData = {
//       email: 'admin@example.com',
//       password: 'adminpassword123',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(loginData)
//       .expect(200);

//     expect(response.body).toHaveProperty('access_token');
//     expect(typeof response.body.access_token).toBe('string');
//   });

//   it('should throw UnauthorizedException for invalid admin login', async () => {
//     const loginData = {
//       email: 'invalidadmin@example.com',
//       password: 'wrongpassword',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(loginData)
//       .expect(401);

//     expect(response.body.message).toBe('Invalid admin credentials');
//   });
// });


describe('InvestorController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let adminToken: string;
  let createdInvestorId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login/investor')
      .send({
        email: 'john@example.com',
        password: 'password123',
      })
      .expect(200);

    const adminLoginResponse = await request(app.getHttpServer())
      .post('/auth/login/admin')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword123',
      })
      .expect(200);

    token = loginResponse.body.access_token;
    adminToken = adminLoginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/investors (GET) - should return all investors', async () => {
    const response = await request(app.getHttpServer())
      .get('/investors')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/investors/email (GET) - should return a specific investor by email', async () => {
    const response = await request(app.getHttpServer())
      .get('/investors/email')
      .query({ email: 'john@example.com' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    createdInvestorId = response.body._id;

    expect(response.body.email).toBe('john@example.com');
  });

  it('/investors/:id (GET) - should return a specific investor by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/investors/${createdInvestorId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.email).toBe('john@example.com');
  });

  it('/investors/:id (PUT) - should update an investor', async () => {
    const updateData = {
      name: 'John Updated',
      preferences: {
        sectors: ['Tech', 'Health'],
        regions: ['US'],
        riskTolerance: 'High',
      },
      criteria: {
        minInvestment: 10000,
        maxInvestment: 100000,
        investmentHorizon: '10 years',
      },
    };

    const response = await request(app.getHttpServer())
      .put(`/investors/${createdInvestorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .expect(200);

    expect(response.body.name).toBe('John Updated');
    expect(response.body.preferences.riskTolerance).toBe('High');
  });

  it('/investors/:id (DELETE) - should fail when an non admin tries to delete', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/investors/${createdInvestorId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('/investors/:id (DELETE) - should delete an investor', async () => {
    console.log('admin token', adminToken);
    await request(app.getHttpServer())
      .delete(`/investors/${createdInvestorId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    const getResponse = await request(app.getHttpServer())
      .get(`/investors/${createdInvestorId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(404);

    expect(getResponse.body.message).toBe('Investor not found');
  });

  it('should return investors by sector', async () => {
    const response = await request(app.getHttpServer())
      .get('/investors/sector')
      .query({ sector: 'Tech' })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body[0].preferences.sectors,
    ).toContain('Tech');
  });

  it('should return investors by region', async () => {
    const response = await request(app.getHttpServer())
      .get('/investors/region')
      .query({ region: 'US' })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body[0].preferences.regions,
    ).toContain('US');
  });

  it('should return investors by risk tolerance', async () => {
    const response = await request(app.getHttpServer())
      .get('/investors/risk-tolerance')
      .query({ riskTolerance: 'High' })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body[0].preferences.riskTolerance,
    ).toBe('High');
  });

  it('should return investors within an investment range', async () => {
    const response = await request(app.getHttpServer())
      .get('/investors/investment-range')
      .query({ min: 10000, max: 100000 })
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
