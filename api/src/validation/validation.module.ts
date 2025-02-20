import { Module } from '@nestjs/common';
import { IsUniqueValidator } from './is-unique';
import { IsUserAllowedValidator } from './is-user-allowed';
import { IsRelationshipAllowedValidator } from './is-allowed-relationships';
import { IsValidPasswordValidator } from './is-password';

@Module({
  providers: [
    IsUniqueValidator,
    IsUserAllowedValidator,
    IsRelationshipAllowedValidator,
    IsValidPasswordValidator,
  ],
  imports: [],
})
export class ValidationModule {}
