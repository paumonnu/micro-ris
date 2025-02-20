import { RelationshipsDto } from '@/src/common/dto/relationships.dto';
import { IsRelationshipAllowed } from '@/src/validation/is-allowed-relationships';
import { IsUserAllowed } from '@/src/validation/is-user-allowed';
import { IsString } from 'class-validator';

export class RelationshipsUserDto extends RelationshipsDto {
  @IsRelationshipAllowed({
    info: ['resources.users.read'],
  })
  relationship: string;
}
