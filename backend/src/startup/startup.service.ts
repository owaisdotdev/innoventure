// startup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Startup } from '../schemas/startup.schema';
import { CreateStartupDto } from 'src/dto/createStartup.dto';

@Injectable()
export class StartupService {
  constructor(@InjectModel(Startup.name) private startupModel: Model<Startup>) {}

  async createStartup(createStartupDto: CreateStartupDto): Promise<Startup> {
    const createdStartup = new this.startupModel(createStartupDto);
    return createdStartup.save();
  }
}
