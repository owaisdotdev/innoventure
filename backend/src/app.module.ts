import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvestorModule } from './investor/investor.module';
import { StartupModule } from './startup/startup.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { MilestoneModule } from './milestone/milestone.module';
import { SmartContractModule } from './smart-contract/smart-contract.module';
import { InvestmentModule } from './investment/investment.module';
import { DaoModule } from './dao/dao.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { InvestorDashboardModule } from './investor-dashboard/investor-dashboard.module';
import { ProposalsModule } from './proposal/proposal.module';
import { NotificationsModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Ensure .env exists with MONGODB_URI
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          console.error('MONGODB_URI is not defined in .env');
          throw new Error('MONGODB_URI is not defined in the .env file');
        }
        console.log(`Connecting to MongoDB at: ${uri}`); // Debug log
        return {
          uri,
          // Remove deprecated options (useNewUrlParser, useUnifiedTopology) as they are ignored in newer MongoDB drivers
        };
      },
    }),
    HttpModule, // Required for MatchService to make HTTP calls
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
    ProposalsModule,
    NotificationsModule,
    ChatModule,
  ],
  controllers: [AppController, MatchController], // Add MatchController here
  providers: [AppService, MatchService], // Add MatchService here
})
export class AppModule {}