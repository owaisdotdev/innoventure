import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rdxgo70@gmail.com',
      pass: 'yhytgdgmnkxyiadd',
    },
  });

  async sendResetPasswordEmail(email: string, resetCode: string) {
    const mailOptions = {
      from: 'rdxgo70@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      text: `Your password reset code is: ${resetCode}. It will expire in 15 minutes.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Failed to send reset password email');
    }
  }
}
