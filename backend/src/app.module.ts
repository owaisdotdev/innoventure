import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestorModule } from './investor/investor.module';
import { StartupModule } from './startup/startup.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { MilestoneModule } from './milestone/milestone.module';
import { SmartContractModule } from './smart-contract/smart-contract.module';
import { InvestmentModule } from './investment/investment.module';
import { DaoModule } from './dao/dao.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { InvestorDashboardModule } from './investor-dashboard/investor-dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
      }),
    }),
    InvestorModule,
    StartupModule,
    AuthModule,
    AdminModule,
    EmailModule,
    MilestoneModule,
    SmartContractModule,
    InvestmentModule,
    DaoModule,
    AdminDashboardModule,
    InvestorDashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
