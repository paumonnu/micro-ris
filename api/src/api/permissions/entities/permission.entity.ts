import { Expose } from 'class-transformer';
import { BaseEntity } from '@/src/core/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class Permission extends BaseEntity {
  @Expose()
  type: string = 'permissions';

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  @Expose()
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: true, unique: false })
  @Expose()
  description: string = '';

  @ManyToMany(() => Role, (role: Role) => role.permissions)
  @Expose()
  roles: Role[];
}
