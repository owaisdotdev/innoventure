import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Investor, InvestorSchema } from '../schemas/investor.schema';
import { Startup, StartupSchema } from '../schemas/startup.schema';
import { StartupModule } from '../startup/startup.module';
import { InvestorModule } from '../investor/investor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    StartupModule,
    InvestorModule,
    AdminModule,
    MongooseModule.forFeature([
      { name: Investor.name, schema: InvestorSchema },
      { name: Startup.name, schema: StartupSchema },
    ]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
