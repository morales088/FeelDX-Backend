import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    const config = { get: jest.fn() } as unknown as ConfigService;
    expect(new ApiKeyGuard(config)).toBeDefined();
  });
});
