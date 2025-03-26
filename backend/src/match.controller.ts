import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async match(@Body() body: { startup_id?: string; investor_id?: string }) {
    const { startup_id, investor_id } = body;

    if (!startup_id && !investor_id) {
      throw new HttpException('Please provide either a startup_id or an investor_id', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.matchService.findMatches(startup_id, investor_id);
      return result;
    } catch (error) {
      console.error('Error in match endpoint:', error.message);
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}