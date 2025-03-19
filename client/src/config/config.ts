import { NestedKeyOf } from '../types/nestedkeyof';
import { apiConfig, ApiConfig } from './api';

export type AppConfig = {
  api: ApiConfig;
};

export const appConfig: AppConfig = {
  api: apiConfig,
};

export function config(k: NestedKeyOf<typeof appConfig>): any {
  const keys = k.split('.');
  return keys.reduce((a, c) => a && a?.[c], appConfig);
}
