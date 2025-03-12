import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StartupService } from './startup.service';
import { StartupController } from './startup.controller';
// import { Startup, StartupSchema } from './schemas/startup.schema'; // Verify this path
import { Startup, StartupSchema } from 'src/schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupSchema }]),
  ],
  providers: [StartupService],
  exports: [StartupService],
  controllers: [StartupController],
})
export class StartupModule {}