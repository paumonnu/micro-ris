import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../base/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: false })
  @Expose()
  email: string;

  @Column({ select: false, length: 128, nullable: false })
  @Exclude()
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
