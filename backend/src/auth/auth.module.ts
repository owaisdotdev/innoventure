import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { Investor, InvestorSchema } from '../investor/schemas/investor.schema'; // Adjusted path
import { Investor, InvestorSchema } from 'src/schemas/investor.schema';
// import { Startup, StartupSchema } from '../startup/schemas/startup.schema'; // Adjusted path
import { Startup, StartupSchema } from 'src/schemas/startup.schema';
import { StartupModule } from '../startup/startup.module';
import { InvestorModule } from '../investor/investor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule, // Already global, but explicitly included for clarity
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Changed to match .env
        signOptions: { expiresIn: '7d' },
      }),
    }),
    MongooseModule.forFeature([
      { name: Investor.name, schema: InvestorSchema },
      { name: Startup.name, schema: StartupSchema },
    ]),
    StartupModule,
    InvestorModule,
    AdminModule,
    EmailModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}