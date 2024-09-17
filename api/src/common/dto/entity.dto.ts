export class EntityDto<T> {
  readonly data: T;

  readonly relationships: [];

  constructor(data: T) {
    this.data = data;
    this.relationships = [];
  }
}
