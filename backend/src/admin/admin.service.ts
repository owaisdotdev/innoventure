import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { isValidObjectId, Model } from 'mongoose';
  import { Admin } from '../schemas/admin.schema'; 
  
  @Injectable()
  export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

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
  