import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RelationshipsDto {
  @IsUUID()
  id: string;

  @IsString()
  relationship: string;

  @IsUUID()
  @IsOptional()
  relationshipId?: string;
}
