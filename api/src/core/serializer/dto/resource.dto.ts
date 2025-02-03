import { Expose } from 'class-transformer';

export class ResourceDto {
  constructor({ id, type, attributes, relationships }) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
    this.relationships = relationships;
  }

  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  attributes: object;

  @Expose()
  relationships?: object;
}
