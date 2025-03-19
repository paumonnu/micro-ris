import { Exclude, Expose, Type } from 'class-transformer';
import { BaseEntity } from '@/src/shared/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { UserInfo } from './user-info.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  @Expose()
  email: string;

  @Column({ length: 128, nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude({ toPlainOnly: true })
  passwordChangedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude({ toPlainOnly: true })
  disabledAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Exclude({ toPlainOnly: true })
  verifiedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @Type(() => Role)
  @Expose()
  role: Role;

  @OneToOne(() => UserInfo, (info) => info.user)
  @JoinColumn()
  @Type(() => UserInfo)
  @Expose()
  info: UserInfo;
}
