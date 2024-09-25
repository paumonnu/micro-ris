import { Expose } from 'class-transformer';

export interface AuthTokenParams {
  accessToken: string;
  refreshToken: string;
}

export class AuthTokenDto {
  constructor({ accessToken, refreshToken }: AuthTokenParams) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
