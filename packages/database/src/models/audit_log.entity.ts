import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ApiKey from './api_key.entity';

@Entity('audit_logs')
@Index(['apiKey'])
export default class AuditLog<T = any> {
  @ObjectIdColumn()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'timestamp without time zone' })
  timestamp: Date;

  @ManyToOne((type) => ApiKey, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'api_key_id' })
  apiKey: ApiKey;

  @Column({ name: 'tenant_address', nullable: false })
  tenantAddress: string;

  @Column({ name: 'client_address', nullable: false })
  clientAddress: string;

  @Column({ name: 'action_requested', nullable: false })
  action: string;

  @Column({ name: 'action_result', nullable: false })
  result: string;

  @Column({ nullable: true, type: 'jsonb' })
  metadata: T;
}
