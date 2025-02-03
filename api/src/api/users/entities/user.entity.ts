import { Exclude, Expose, Type } from 'class-transformer';
import { BaseEntity } from '@/src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { UserInfo } from './user-info.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  @Expose()
  email: string;

  @Column({ length: 128, nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude()
  passwordChangedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @Type(() => Role)
  @Expose()
  role: Role;

  @OneToOne(() => UserInfo, (info) => info.user, { eager: true })
  @JoinColumn()
  @Type(() => UserInfo)
  @Expose()
  info: UserInfo;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude()
  disabledAt: Date;

  constructor() {
    super();

    this.type = 'users';
  }
}
