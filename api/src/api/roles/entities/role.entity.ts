import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '@/src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role extends BaseEntity {
  @Expose()
  type: string = 'roles';

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  @Expose()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  @Expose()
  users: User[];
}
