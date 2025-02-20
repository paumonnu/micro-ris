import { IsString, IsUUID } from 'class-validator';

export class GetOneDto {
  @IsUUID()
  id: string;
}

export class GetRelationshipDto {
  @IsUUID()
  id: string;

  @IsString()
  relation: string;
}

export class GetOneRelationshipDto {
  @IsUUID()
  id: string;

  @IsString()
  relationship: string;
}
