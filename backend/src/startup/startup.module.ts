import { Module } from '@nestjs/common';
import { StartupService } from './startup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Startup, StartupSchema } from '../schemas/startup.schema';
import { StartupController } from './startup.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupSchema }]),
  ],
  providers: [StartupService],
  exports: [StartupService],
  controllers: [StartupController],
})
export class StartupModule {}
