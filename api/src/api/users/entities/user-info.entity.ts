import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { User } from './user.entity';
import { BaseEntity } from '@/src/shared/base.entity';

@Entity({ name: 'user_info' })
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
