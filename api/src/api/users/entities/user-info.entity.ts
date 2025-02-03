import { Exclude, Expose, Type } from 'class-transformer';
import { BaseEntity } from '@/src/core/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { User } from './user.entity';

@Entity()
export class UserInfo extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: true })
  @Expose()
  firstName: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  @Expose()
  lastName: string;

  @OneToOne(() => User, (user) => user.info)
  @Type(() => User)
  @Expose()
  user: User;

  constructor() {
    super();

    this.type = 'user-info';
  }
}
