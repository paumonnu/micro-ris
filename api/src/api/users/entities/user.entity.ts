import { Exclude, Expose, Type } from 'class-transformer';
import { BaseEntity } from '@/src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { UserInfo } from './user-info.entity';

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

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude()
  passwordChangedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude()
  disabledAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude()
  verifiedAt: Date = null;

  @ManyToOne(() => Role, (role) => role.users)
  @Type(() => Role)
  @Expose()
  role: Role;

  @OneToOne(() => UserInfo, (info) => info.user, { eager: true })
  @JoinColumn()
  @Type(() => UserInfo)
  @Expose()
  info: UserInfo;

  constructor() {
    super();

    this.type = 'users';
  }
}
