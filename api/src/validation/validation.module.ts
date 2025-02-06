import { Module } from '@nestjs/common';
import { IsUniqueValidator } from './is-unique';

@Module({
  providers: [IsUniqueValidator],
})
export class ValidationModule {}
