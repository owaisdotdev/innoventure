import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types } from 'mongoose';
import { CreateInvestorDto } from 'src/dto/createInvestor.dto';
import { CreateStartupDto } from 'src/dto/createStartup.dto';
import { CreateMilestoneDto } from 'src/dto/createMilestone.dto';
import { CreateInvestmentDto } from 'src/dto/createInvestment.dto';

// LOGIN CREDENTIALS
const investorLoginData = {
  email: 'ali.khan@example.com',
  password: 'securepassword123',
};
const startupLoginData = {
  email: 'info@techinnovators.pk',
  password: 'securepassword123',
};
const adminLoginData = {
  email: 'admin@example.com',
  password: 'adminpassword123',
};
const investorDetails = {
  id: '675d8f1bdfaebd7bdfb533cc',
  name: 'Ali Khan',
};
const startupDetails = {
  id: '675d8f1bdfaebd7bdfb533d2',
  name: 'Tech Innovators Pvt Ltd',
};
const mileStoneId = new Types.ObjectId('675d9a1b0b64c117754ee260');
const contractId = new Types.ObjectId('675da7ad83cb99af73145dac');

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
//     const signupData: CreateInvestorDto = {
//       name: 'Ali Khan',
//       email: 'ali.khan@example.com',
//       password: 'securepassword123',
//       profileStatus: 'active',
//       preferences: {
//         sectors: ['Technology', 'Real Estate'],
//         regions: ['Pakistan', 'Middle East'],
//         riskTolerance: 'Medium',
//       },
//       criteria: {
//         minInvestment: 50,
//         maxInvestment: 500,
//         investmentHorizon: '3 years',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signup/investor')
//       .send(signupData)
//       .expect(201);
//     expect(response.body.email).toBe(signupData.email);
//   });

//   it('/auth/signup/startup (POST) - startup', async () => {
//     const signupData: CreateStartupDto = {
//       name: 'Tech Innovators Pvt Ltd',
//       email: 'info@techinnovators.pk',
//       password: 'securepassword123',
//       businessPlan: {
//         description:
//           'Our business plan focuses on developing AI-powered solutions for the healthcare sector in Pakistan.',
//         industry: 'Healthcare Technology',
//       },
//       isFydp: true,
//       fydpDetails: {
//         university: 'National University of Sciences and Technology (NUST)',
//         year: 2024,
//         supervisorName: 'Dr. Ahmed Raza',
//         githubRepoUrl: 'https://github.com/techinnovators/fydp',
//         tags: ['AI', 'Healthcare', 'Blockchain'],
//         remarks:
//           'This project won the Best Innovation Award at the NUST Tech Expo 2024.',
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
//       email: 'ali.khan@example.com',
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
//       email: 'info@techinnovators.pk',
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
//     const response = await request(app.getHttpServer())
//       .post('/auth/login/investor')
//       .send(investorLoginData)
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
//     const response = await request(app.getHttpServer())
//       .post('/auth/login/startup')
//       .send(startupLoginData)
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
//     const response = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(adminLoginData)
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

// describe('InvestorController (e2e)', () => {
//   let app: INestApplication;
//   let token: string;
//   let adminToken: string;
//   let createdInvestorId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     const loginResponse = await request(app.getHttpServer())
//       .post('/auth/login/investor')
//       .send(investorLoginData)
//       .expect(200);

//     const adminLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(adminLoginData)
//       .expect(200);

//     token = loginResponse.body.access_token;
//     adminToken = adminLoginResponse.body.access_token;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/investors (GET) - should return all investors', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investors')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//   });

//   it('/investors/email (GET) - should return a specific investor by email', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investors/email')
//       .query({ email: investorLoginData.email })
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     createdInvestorId = response.body._id;

//     expect(response.body.email).toBe(investorLoginData.email);
//   });

//   it('/investors/:id (GET) - should return a specific investor by ID', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investors/${createdInvestorId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(response.body.email).toBe(investorLoginData.email);
//   });

//   it('/investors/:id (PUT) - should update an investor', async () => {
//     const updateData = {
//       criteria: {
//         minInvestment: 10,
//         maxInvestment: 100,
//         investmentHorizon: '10 years',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .put(`/investors/${createdInvestorId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(updateData)
//       .expect(200);

//     expect(response.body.name).toBe(investorDetails.name);
//     expect(response.body.preferences.riskTolerance).toBe('Medium');
//   });

//   it('/investors/:id (DELETE) - should fail when an non admin tries to delete', async () => {
//     const response = await request(app.getHttpServer())
//       .delete(`/investors/${createdInvestorId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(401);

//     expect(response.body.message).toBe('Unauthorized');
//   });

//   it('/investors/:id (DELETE) - should delete an investor', async () => {
//     await request(app.getHttpServer())
//       .delete(`/investors/${createdInvestorId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     const getResponse = await request(app.getHttpServer())
//       .get(`/investors/${createdInvestorId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(404);

//     expect(getResponse.body.message).toBe('Investor not found');
//   });

//   it('should return investors by sector', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investors/sector')
//       .query({ sector: 'Technology' })
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0].preferences.sectors).toContain('Technology');
//   });

//   it('should return investors by region', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investors/region')
//       .query({ region: 'Pakistan' })
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0].preferences.regions).toContain('Pakistan');
//   });

//   it('should return investors by risk tolerance', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investors/risk-tolerance')
//       .query({ riskTolerance: 'Medium' })
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0].preferences.riskTolerance).toBe('Medium');
//   });

//   it('should return investors within an investment range', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investors/investment-range')
//       .query({ min: 10000, max: 100000 })
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//   });
// });

// describe('StartupController (e2e)', () => {
//   let app: INestApplication;
//   let token: string;
//   let adminToken: string;
//   let createdStartupId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     const loginResponse = await request(app.getHttpServer())
//       .post('/auth/login/startup')
//       .send(startupLoginData)
//       .expect(200);

//     const adminLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(adminLoginData)
//       .expect(200);

//     token = loginResponse.body.access_token;
//     adminToken = adminLoginResponse.body.access_token;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/startups (GET) - should return all startups', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/startups')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//   });

//   it('/startups/email (GET) - should return a specific startup by email', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/startups/email')
//       .query({ email: startupLoginData.email })
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     createdStartupId = response.body._id;

//     expect(response.body.email).toBe(startupLoginData.email);
//   });

//   it('/startups/:id (GET) - should return a specific startup by ID', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/startups/${createdStartupId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(response.body.email).toBe(startupLoginData.email);
//   });

//   it('/startups/:id (PUT) - should update an startup', async () => {
//     const updateData = {
//       businessPlan: {
//         description:
//           'Our business plan focuses on developing AI-powered solutions for the healthcare sector.',
//         industry: 'AI',
//       },
//     };

//     const response = await request(app.getHttpServer())
//       .put(`/startups/${createdStartupId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(updateData)
//       .expect(200);

//     expect(response.body.name).toBe(startupDetails.name);
//     expect(response.body.businessPlan.industry).toBe('AI');
//   });

//   it('should return startups by industry', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/startups/industry')
//       .query({ industry: 'AI' })
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0].businessPlan.industry).toBe('AI');
//   });

//   it('/startups/:id (DELETE) - should fail when an non admin tries to delete', async () => {
//     const response = await request(app.getHttpServer())
//       .delete(`/startups/${createdStartupId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(401);

//     expect(response.body.message).toBe('Unauthorized');
//   });

//   // it('/startups/:id (DELETE) - should delete an startup', async () => {
//   //   await request(app.getHttpServer())
//   //     .delete(`/startups/${createdStartupId}`)
//   //     .set('Authorization', `Bearer ${adminToken}`)
//   //     .expect(200);

//   //   const getResponse = await request(app.getHttpServer())
//   //     .get(`/startups/${createdStartupId}`)
//   //     .set('Authorization', `Bearer ${adminToken}`)
//   //     .expect(404);

//   //   expect(getResponse.body.message).toBe('Startup not found');
//   // });
// });

// describe('MilestoneController (e2e)', () => {
//   let app: INestApplication;
//   let token: string;
//   let adminToken: string;
//   let createdMilestoneId: string;
//   let startupId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     // Login as admin
//     const adminLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(adminLoginData)
//       .expect(200);

//     adminToken = adminLoginResponse.body.access_token;

//     // Login as startup to get token if needed
//     const startupLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/startup')
//       .send(startupLoginData)
//       .expect(200);

//     token = startupLoginResponse.body.access_token;
//     startupId = startupDetails.id;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/milestones/create (POST) - should create a milestone', async () => {
//     const createMilestoneDto: CreateMilestoneDto = {
//       startupId: new Types.ObjectId(startupId),
//       title: 'Prototype Development',
//       description:
//         'Develop a functional prototype for the smart irrigation system.',
//       dueDate: new Date('2025-06-30'),
//       amountToBeReleased: 5000,
//       status: 'pending',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/milestones/create')
//       .send(createMilestoneDto)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(201);

//     expect(response.body.title).toBe(createMilestoneDto.title);
//     expect(response.body.description).toBe(createMilestoneDto.description);

//     createdMilestoneId = response.body._id;
//   });

//   it('/milestones (GET) - should return all milestones', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/milestones')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   it('/milestones/title (GET) - should return milestones by title', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/milestones/title')
//       .query({ title: 'Prototype Development' })
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0].title).toBe('Prototype Development');
//   });

//   it('/milestones/:id (GET) - should return a milestone by ID', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/milestones/${createdMilestoneId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(response.body._id).toBe(createdMilestoneId);
//     expect(response.body.title).toBe('Prototype Development');
//   });

//   it('/milestones/:id (PUT) - should update a milestone', async () => {
//     const updateMilestoneDto = {
//       status: 'pending',
//     };

//     const response = await request(app.getHttpServer())
//       .put(`/milestones/${createdMilestoneId}`)
//       .send(updateMilestoneDto)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(response.body.status).toBe(updateMilestoneDto.status);
//   });

//   // it('/milestones/:id (DELETE) - should delete a milestone', async () => {
//   //   await request(app.getHttpServer())
//   //     .delete(`/milestones/${createdMilestoneId}`)
//   //     .set('Authorization', `Bearer ${adminToken}`)
//   //     .expect(200);

//   //   await request(app.getHttpServer())
//   //     .get(`/milestones/${createdMilestoneId}`)
//   //     .set('Authorization', `Bearer ${adminToken}`)
//   //     .expect(404);
//   // });

//   it('/milestones/title (GET) - should return 400 if title is missing', async () => {
//     await request(app.getHttpServer())
//       .get('/milestones/title')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(400);
//   });

//   it('/milestones/smart-contract (GET) - should return 400 if smartContractId is missing', async () => {
//     await request(app.getHttpServer())
//       .get('/milestones/smart-contract')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(400);
//   });
// });

// describe('SmartContractController (e2e)', () => {
//   let app: INestApplication;
//   let adminToken: string;
//   let startupId: string;
//   let createdSmartContractId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     const startupSignupResponse = await request(app.getHttpServer())
//       .post('/auth/login/startup')
//       .send(startupLoginData);

//     startupId = startupSignupResponse.body.startup._doc._id;

//     // Login as admin
//     const adminLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(adminLoginData)
//       .expect(200);

//     adminToken = adminLoginResponse.body.access_token;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/smart-contracts (POST) - should create a smart contract', async () => {
//     const createSmartContractDto = {
//       terms: {
//         milestoneConditions:
//           'Deliver a working MVP for the blockchain-based supply chain solution.',
//         escrowAmount: 100,
//       },
//       milestoneStatus: {
//         milestoneId: mileStoneId,
//         status: 'Pending',
//       },
//       escrowAmount: 100, // PKR
//       status: 'active',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/smart-contracts')
//       .send(createSmartContractDto)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(201);

//     expect(response.body.terms.milestoneConditions).toBe(
//       createSmartContractDto.terms.milestoneConditions,
//     );
//     expect(response.body.status).toBe(createSmartContractDto.status);

//     createdSmartContractId = response.body._id;
//   });

//   it('/smart-contracts (GET) - should return all smart contracts', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/smart-contracts')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   it('/smart-contracts/:id (GET) - should return a smart contract by ID', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/smart-contracts/${createdSmartContractId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(response.body._id).toBe(createdSmartContractId);
//     expect(response.body.status).toBe('active');
//   });

//   it('/smart-contracts/:id (PUT) - should update a smart contract', async () => {
//     const updateSmartContractDto = {
//       status: 'active',
//     };

//     const response = await request(app.getHttpServer())
//       .put(`/smart-contracts/${createdSmartContractId}`)
//       .send(updateSmartContractDto)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(response.body.status).toBe(updateSmartContractDto.status);
//   });

//   it('/smart-contracts/status/:status (GET) - should retrieve smart contracts by status', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/smart-contracts/status/active')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     response.body.forEach((contract) => {
//       expect(contract.status).toBe('active');
//     });
//   });

//   it('/smart-contracts/:id (DELETE) - should return 404 if smart contract not found', async () => {
//     const nonExistentId = new Types.ObjectId().toHexString();

//     await request(app.getHttpServer())
//       .delete(`/smart-contracts/${nonExistentId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(404);
//   });

//   it('/smart-contracts/:id/investment (POST) - should return 400 for invalid investmentId', async () => {
//     await request(app.getHttpServer())
//       .post(`/smart-contracts/${createdSmartContractId}/investment`)
//       .send({ investmentId: 'invalid-id' })
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(400);
//   });
// });

// describe('InvestmentController (e2e)', () => {
//   let app: INestApplication;
//   let adminToken: string;
//   let createdInvestmentId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     // Login as admin
//     const adminLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send(adminLoginData)
//       .expect(200);

//     adminToken = adminLoginResponse.body.access_token;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/investments (POST) - should create a new investment', async () => {
//     const createInvestmentDto: CreateInvestmentDto = {
//       investorId: new Types.ObjectId(investorDetails.id),
//       startupId: new Types.ObjectId(startupDetails.id),
//       amount: 500,
//       terms: {
//         equity: 10,
//         conditions: 'Investor holds 10% equity with no voting rights',
//       },
//       escrowStatus: {
//         amount: 250,
//         releaseDate: new Date('2024-12-31T00:00:00.000Z'),
//         status: 'In escrow',
//       },
//       contractId: contractId,
//       equityDistribution: 10,
//       investmentDate: new Date('2024-01-01T00:00:00.000Z'),
//     };

//     const response = await request(app.getHttpServer())
//       .post('/investments')
//       .send(createInvestmentDto)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(201);

//     expect(response.body.amount).toBe(createInvestmentDto.amount);
//     createdInvestmentId = response.body._id;
//   });

//   it('/investments (GET) - should return all investments', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/investments')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   it('/investments/:id (GET) - should return an investment by ID', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investments/${createdInvestmentId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(response.body._id).toBe(createdInvestmentId);
//   });

//   it('/investments/:id (PUT) - should update an investment', async () => {
//     const updateInvestmentDto = {
//       amount: 700,
//     };

//     const response = await request(app.getHttpServer())
//       .put(`/investments/${createdInvestmentId}`)
//       .send(updateInvestmentDto)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(response.body.amount).toBe(updateInvestmentDto.amount);
//   });

//   // it('/investments/:id (DELETE) - should delete an investment by ID', async () => {
//   //   await request(app.getHttpServer())
//   //     .delete(`/investments/${createdInvestmentId}`)
//   //     .set('Authorization', `Bearer ${adminToken}`)
//   //     .expect(200);
//   // });

//   it('/investments/by-investor/:investorId (GET) - should retrieve investments by investor ID', async () => {
//     const investorId = new Types.ObjectId(investorDetails.id);
//     const response = await request(app.getHttpServer())
//       .get(`/investments/by-investor/${investorId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     response.body.forEach((investment) => {
//       expect(investment.investorId).toBe(investorId.toString());
//     });
//   });

//   it('/investments/by-startup/:startupId (GET) - should retrieve investments by startup ID', async () => {
//     const startupId = startupDetails.id;

//     const response = await request(app.getHttpServer())
//       .get(`/investments/by-startup/${startupId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     response.body.forEach((investment) => {
//       expect(investment.startupId).toBe(startupId.toString());
//     });
//   });

//   it('/investments/:id (DELETE) - should return 404 if investment not found', async () => {
//     const nonExistentId = new Types.ObjectId().toHexString();

//     await request(app.getHttpServer())
//       .delete(`/investments/${nonExistentId}`)
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(404);
//   });
// });

// describe('AdminDashboardController (e2e)', () => {
//   let app: INestApplication;
//   let adminToken: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     // Login as admin
//     const adminLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/admin')
//       .send({
//         email: 'admin@example.com',
//         password: 'adminpassword123',
//       })
//       .expect(200);

//     adminToken = adminLoginResponse.body.access_token;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/admin-dashboard/total-investments (GET) - should return total investments (amount and count)', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/admin-dashboard/total-investments')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     console.log(response.body);
//     expect(response.body.totalAmount).toBeDefined();
//     expect(response.body.totalCount).toBeDefined();
//   });

//   it('/admin-dashboard/active-startups (GET) - should return total active startups', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/admin-dashboard/active-startups')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     console.log(response.body);
//     expect(typeof response.body.activeStartups).toBe('number');
//   });

//   it('/admin-dashboard/active-investors (GET) - should return total active investors', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/admin-dashboard/active-investors')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     console.log(response.body);
//     expect(typeof response.body.activeInvestors).toBe('number');
//   });

//   it('/admin-dashboard/recent-activity (GET) - should return recent activity', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/admin-dashboard/recent-activity')
//       .set('Authorization', `Bearer ${adminToken}`)
//       .expect(200);

//     console.log(response.body);
//     expect(response.body.recentInvestments).toBeDefined();
//     expect(response.body.recentStartups).toBeDefined();
//     expect(response.body.recentInvestors).toBeDefined();
//   });
// });

// describe('InvestorDashboardController (e2e)', () => {
//   let app: INestApplication;
//   let investorToken: string;
//   const investorId = investorDetails.id;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     // Login as investor
//     const investorLoginResponse = await request(app.getHttpServer())
//       .post('/auth/login/investor')
//       .send(investorLoginData)
//       .expect(200);

//     investorToken = investorLoginResponse.body.access_token;
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/investor-dashboard/:investorId/total-investment (GET) - should return total investment amount', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investor-dashboard/${investorId}/total-investment`)
//       .set('Authorization', `Bearer ${investorToken}`)
//       .expect(200);

//     expect(typeof response.body.total).toBe('number');
//   });

//   it('/investor-dashboard/:investorId/active-projects (GET) - should return total active startups', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investor-dashboard/${investorId}/active-projects`)
//       .set('Authorization', `Bearer ${investorToken}`)
//       .expect(200);

//     expect(typeof response.body.activeProjects).toBe('number');
//   });

//   it('/investor-dashboard/:investorId/total-returns (GET) - should return total returns', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investor-dashboard/${investorId}/total-returns`)
//       .set('Authorization', `Bearer ${investorToken}`)
//       .expect(200);

//     expect(typeof response.body.totalReturns).toBe('number');
//   });

//   it('/investor-dashboard/:investorId/recent-activity (GET) - should return recent activity', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investor-dashboard/${investorId}/recent-activity?limit=5`)
//       .set('Authorization', `Bearer ${investorToken}`)
//       .expect(200);

//     console.log(response.body);
//     expect(Array.isArray(response.body)).toBe(true);
//     if (response.body.length > 0) {
//       expect(response.body[0]).toHaveProperty('type');
//       expect(response.body[0]).toHaveProperty('message');
//       expect(response.body[0]).toHaveProperty('date');
//     }
//   });

//   it('/investor-dashboard/:investorId/portfolio (GET) - should return active investments', async () => {
//     const response = await request(app.getHttpServer())
//       .get(`/investor-dashboard/${investorId}/portfolio`)
//       .set('Authorization', `Bearer ${investorToken}`)
//       .expect(200);

//     console.log(response.body);
//     expect(Array.isArray(response.body)).toBe(true);
//     if (response.body.length > 0) {
//       expect(response.body[0]).toHaveProperty('startupName');
//       expect(response.body[0]).toHaveProperty('amount');
//       expect(response.body[0]).toHaveProperty('status');
//     }
//   });
// });

describe('ProposalController (e2e)', () => {
  let app: INestApplication;
  let investorToken: string;
  const investorId = investorDetails.id;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login as investor
    const investorLoginResponse = await request(app.getHttpServer())
      .post('/auth/login/investor')
      .send(investorLoginData)
      .expect(200);

    investorToken = investorLoginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  let createdProposalId: string;
  const createProposalDto = {
    investorId: investorDetails.id,
    startupId: startupDetails.id,
    industry: 'Technology',
    investmentAmount: 1000,
    terms: {
      equity: 10,
      conditions: 'Monthly revenue share of 5%',
    },
    escrowStatus: {
      amount: 1000,
      releaseDate: new Date().toISOString(),
      status: 'In escrow',
    },
    status: 'pending',
  };

  it('/proposals (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/proposals')
      .set('Authorization', `Bearer ${investorToken}`)
      .send(createProposalDto)
      .expect(201);

    createdProposalId = response.body._id;
    expect(response.body).toHaveProperty('_id');
    expect(response.body.investorId).toBe(investorDetails.id);
    expect(response.body.startupId).toBe(startupDetails.id);
  });

  it('/proposals (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/proposals')
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('investorId');
      expect(response.body[0]).toHaveProperty('startupId');
      expect(response.body[0]).toHaveProperty('status');
    }
  });

  it('should get proposals filtered by status', async () => {
    const response = await request(app.getHttpServer())
      .get('/proposals?status=pending')
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((proposal) => {
      expect(proposal.status).toBe('pending');
    });
  });

  it('/proposals/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/proposals/${createdProposalId}`)
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(200);

    expect(response.body._id).toBe(createdProposalId);
    expect(response.body.investorId).toBe(investorDetails.id);
  });

  it('should return 404 for non-existent proposal', async () => {
    await request(app.getHttpServer())
      .get('/proposals/507f1f77bcf86cd799439011')
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(404);
  });

  it('/proposals/:id (PUT)', async () => {
    const updateDto = {
      investmentAmount: 150000,
      terms: {
        equity: 15,
        conditions: 'Quarterly revenue share of 7%',
      },
    };

    const response = await request(app.getHttpServer())
      .put(`/proposals/${createdProposalId}`)
      .set('Authorization', `Bearer ${investorToken}`)
      .send(updateDto)
      .expect(200);

    expect(response.body.investmentAmount).toBe(150000);
    expect(response.body.terms.equity).toBe(15);
  });

  it('/proposals/:id/status (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/proposals/${createdProposalId}/status`)
      .set('Authorization', `Bearer ${investorToken}`)
      .send({ status: 'accepted' })
      .expect(200);

    expect(response.body.status).toBe('accepted');
  });

  it('/proposals/:id/escrow (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/proposals/${createdProposalId}/escrow`)
      .set('Authorization', `Bearer ${investorToken}`)
      .send({
        status: 'Released',
        releaseDate: new Date().toISOString(),
      })
      .expect(200);

    expect(response.body.escrowStatus.status).toBe('Released');
  });

  it('/proposals/:id (DELETE', async () => {
    await request(app.getHttpServer())
      .delete(`/proposals/${createdProposalId}`)
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(200);

    // Verify the proposal is deleted
    await request(app.getHttpServer())
      .get(`/proposals/${createdProposalId}`)
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(404);
  });

  it('should return 404 for deleting non-existent proposal', async () => {
    await request(app.getHttpServer())
      .delete('/proposals/507f1f77bcf86cd799439011')
      .set('Authorization', `Bearer ${investorToken}`)
      .expect(404);
  });
});
