import { Controller, Post, Body, Headers, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ProposalsService } from './proposal.service'; // Correct path assumed
// import { NotificationService } from '../notification/notification.service'; // Import NotificationService
import { NotificationsService } from 'src/notification/notification.service';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Controller('proposals')
export class ProposalsController {
  constructor(
    private readonly proposalsService: ProposalsService,
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationsService, // Inject NotificationService
  ) {}

  private extractUserIdFromToken(authHeader: string): string {
    if (!authHeader) {
      console.error('No authorization header provided');
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error('Token missing from header');
      throw new UnauthorizedException('Token missing');
    }
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      console.log('Using JWT_SECRET:', secret ? 'Set' : 'Not set'); // Log if secret is loaded
      const decoded = jwt.verify(token, secret) as { sub: string; iat: number; exp: number };
      console.log('Decoded token:', decoded);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.iat > currentTime) {
        console.error('Token issued in the future:', decoded.iat, 'vs', currentTime);
        throw new UnauthorizedException('Token issued in the future');
      }
      return decoded.sub;
    } catch (error) {
      console.error('JWT Error:', error.message, error.stack);
      throw new UnauthorizedException(`Invalid token: ${error.message}`);
    }
  }

  @Post()
  async create(
    @Body() createProposalDto: CreateProposalDto,
    @Headers('authorization') authHeader: string,
  ) {
    try {
      console.log('Received proposal:', createProposalDto);
      const investorId = this.extractUserIdFromToken(authHeader);
      createProposalDto.investorId = investorId;
      console.log('Creating proposal with investorId:', investorId);
      const result = await this.proposalsService.create(createProposalDto);
      console.log('Proposal created successfully:', result);

      // Trigger notifications
      await this.notificationService.create({
        userId: createProposalDto.startupId,
        message: `New proposal received from Investor ${investorId} for ${createProposalDto.startupName}`,
        type: 'startup',
      });
      await this.notificationService.create({
        userId: investorId,
        message: `Proposal sent to Startup ${createProposalDto.startupName}`,
        type: 'investor',
      });

      return result;
    } catch (error) {
      console.error('Error in create proposal:', error.message, error.stack);
      throw new InternalServerErrorException(error.message || 'Failed to create proposal');
    }
  }
}