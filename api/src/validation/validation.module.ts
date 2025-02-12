import { Module } from '@nestjs/common';
import { IsUniqueValidator } from './is-unique';
import { IsUserAllowedValidator } from './is-user-allowed';

@Module({
  providers: [IsUniqueValidator, IsUserAllowedValidator],
  imports: [],
})
export class ValidationModule {}
