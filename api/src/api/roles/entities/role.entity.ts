import { Expose } from 'class-transformer';
import { BaseEntity } from '@/src/core/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

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

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles)
  @JoinTable()
  @Expose()
  permissions: Permission[];
}
