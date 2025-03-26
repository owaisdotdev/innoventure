import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MatchService {
  constructor(private readonly httpService: HttpService) {}

  async findMatches(startup_id?: string, investor_id?: string): Promise<any> {
    const flaskUrl = 'http://127.0.0.1:8080/match';
    const payload = startup_id ? { startup_id } : { investor_id };

    console.log(`Calling Flask at ${flaskUrl} with payload: ${JSON.stringify(payload)}`);
    const response = await firstValueFrom(
      this.httpService.post(flaskUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
    );

    console.log(`Received response from Flask: ${JSON.stringify(response.data)}`);
    return response.data;
  }
}