import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
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
