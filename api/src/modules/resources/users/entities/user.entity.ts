import { Exclude, Expose, Type } from 'class-transformer';
import { BaseEntity } from '@/src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Expose()
  type: string = 'users';

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  @Expose()
  email: string;

  @Column({ length: 128, nullable: false })
  @Exclude()
  password: string;
}
