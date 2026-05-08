import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-api-key'];
    const valid = this.config.get('API_SECRET_KEY');

    if (!token || token !== valid) {
      throw new UnauthorizedException('Invalid or missing API key');
    }
    return true;
  }
}