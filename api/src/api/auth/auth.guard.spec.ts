import { AuthTokenGuard } from './auth-token.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthTokenGuard()).toBeDefined();
  });
});
