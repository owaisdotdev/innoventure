import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  INVESTOR = 'investor',
  STARTUP = 'startup',
  ADMIN = 'admin',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Store hashed password

  @Prop({ type: String, enum: UserRole, default: UserRole.INVESTOR })
  role: UserRole; // Assign a role (Investor, Startup, Admin)
}

export const UserSchema = SchemaFactory.createForClass(User);
