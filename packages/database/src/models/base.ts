import {
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity {
  @ObjectIdColumn()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date;

  /* UPDATE */

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  /* DELETE */

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
