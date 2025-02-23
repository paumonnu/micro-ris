import { Expose } from 'class-transformer';
import { BaseEntity } from '@/src/shared/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity({ name: 'role' })
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
  @JoinTable({
    name: 'permission_role',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  @Expose()
  permissions: Permission[];
}
