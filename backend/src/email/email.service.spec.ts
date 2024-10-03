import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import nodemailerMock from 'nodemailer-mock';

jest.mock('nodemailer');

describe('EmailService', () => {
  let service: EmailService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'EMAIL_USER') return 'test-email@gmail.com';
              if (key === 'EMAIL_PASS') return 'test-password';
              if (key === 'EMAIL_FROM') return 'no-reply@yourapp.com';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock nodemailer createTransport
    (nodemailer.createTransport as jest.Mock).mockReturnValue(
      nodemailerMock.createTransport(),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send reset password email', async () => {
    const email = 'test@example.com';
    const resetCode = '123456';

    await service.sendResetPasswordEmail(email, resetCode);

    const sentMail = nodemailerMock.mock.getSentMail();
    expect(sentMail.length).toBe(1);
    expect(sentMail[0].to).toBe(email);
    expect(sentMail[0].subject).toBe('Reset Your Password');
    expect(sentMail[0].text).toContain(resetCode);
  });

  it('should throw an error if sending email fails', async () => {
    // Mock sendMail to throw an error
    const mockTransporter = nodemailer.createTransport();
    jest.spyOn(mockTransporter, 'sendMail').mockRejectedValue(new Error('Failed to send email'));

    try {
      await service.sendResetPasswordEmail('test@example.com', '123456');
    } catch (error) {
      expect(error.message).toBe('Failed to send reset password email');
    }
  });
});
