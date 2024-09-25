import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { isValidObjectId, Model } from 'mongoose';
  import { Admin } from '../schemas/admin.schema'; // Assuming you have an Admin schema
  import { CreateAdminDto } from '../dto/createAdmin.dto';
  import { UpdateAdminDto } from '../dto/updateAdmin.dto';
  import * as bcrypt from 'bcryptjs';
  
  @Injectable()
  export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}
  
    // Create a new admin with hashed password
    async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      const createdAdmin = await this.adminModel.create({
        ...createAdminDto,
        password: hashedPassword,
      });
      return createdAdmin;
    }
  
    // Find all admins
    async findAllAdmins(): Promise<Admin[]> {
      return this.adminModel.find().exec();
    }
  
    // Find an admin by ID
    async findAdminById(adminId: string): Promise<Admin> {
      if (!isValidObjectId(adminId)) {
        throw new BadRequestException(`Invalid ID format`);
      }
      const admin = await this.adminModel.findById(adminId).exec();
  
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
  
      return admin;
    }
  
    // Update an admin
    async updateAdmin(
      adminId: string,
      updateAdminDto: UpdateAdminDto,
    ): Promise<Admin> {
      if (!isValidObjectId(adminId)) {
        throw new BadRequestException(`Invalid ID format`);
      }
      const updatedAdmin = await this.adminModel
        .findByIdAndUpdate(
          adminId,
          { $set: updateAdminDto },
          { new: true }, // Return the updated document
        )
        .exec();
  
      if (!updatedAdmin) {
        throw new NotFoundException('Admin not found');
      }
  
      return updatedAdmin;
    }
  
    // Delete an admin
    async deleteAdmin(adminId: string): Promise<void> {
      if (!isValidObjectId(adminId)) {
        throw new BadRequestException(`Invalid ID format`);
      }
      const result = await this.adminModel.findByIdAndDelete(adminId).exec();
      if (!result) {
        throw new NotFoundException('Admin not found');
      }
    }
  
    // Find admin by email (used for login and authentication)
    async findByEmail(email: string): Promise<Admin | null> {
      return this.adminModel.findOne({ email }).exec();
    }
  }
  