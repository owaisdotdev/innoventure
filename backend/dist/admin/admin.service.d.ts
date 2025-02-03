import { Model } from 'mongoose';
import { Admin } from '../schemas/admin.schema';
export declare class AdminService {
    private adminModel;
    constructor(adminModel: Model<Admin>);
    findAllAdmins(): Promise<Admin[]>;
    findAdminById(adminId: string): Promise<Admin>;
    deleteAdmin(adminId: string): Promise<void>;
    findByEmail(email: string): Promise<Admin | null>;
}
