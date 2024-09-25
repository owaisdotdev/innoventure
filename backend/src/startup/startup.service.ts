import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Startup } from '../schemas/startup.schema';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { UpdateStartupDto } from '../dto/updateStartup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StartupService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<Startup>,
  ) {}

  // Create a new startup with hashed password
  async createStartup(createStartupDto: CreateStartupDto): Promise<Startup> {
    try {
      const hashedPassword = await bcrypt.hash(createStartupDto.password, 10);
      const createdStartup = await this.startupModel.create({
        ...createStartupDto,
        password: hashedPassword,
      });
      return createdStartup;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create startup');
    }
  }

  // Get all startups
  async findAll(): Promise<Startup[]> {
    return this.startupModel.find().exec();
  }

  // Get a specific startup by ID
  async findStartupById(id: string): Promise<Startup> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const startup = await this.startupModel.findById(id).exec();
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    return startup;
  }

  // Update an existing startup by ID
  async updateStartup(
    id: string,
    updateStartupDto: UpdateStartupDto,
  ): Promise<Startup> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const updatedStartup = await this.startupModel
      .findByIdAndUpdate(id, { $set: updateStartupDto }, { new: true })
      .exec();

    if (!updatedStartup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    return updatedStartup;
  }

  // Delete a startup by ID
  async deleteStartup(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const result = await this.startupModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
  }

  // Find startup by email (for authentication purposes)
  async findByEmail(email: string): Promise<Startup | null> {
    return this.startupModel.findOne({ email }).exec();
  }

  // Validate startup password
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
