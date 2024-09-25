import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @Expose()
  type: string;

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  @Expose()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  @Exclude()
  deletedAt: Date;
}
