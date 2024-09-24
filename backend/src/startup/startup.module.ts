import { Module } from '@nestjs/common';
import { StartupService } from './startup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Startup, StartupSchema } from '../schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupSchema }]),
  ],
  providers: [StartupService],
  exports: [StartupService],
})
export class StartupModule {}
