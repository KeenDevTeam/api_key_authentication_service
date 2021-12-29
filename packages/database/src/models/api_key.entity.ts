import { Column, Entity, Index, OneToMany } from 'typeorm';

import BaseEntity from './base';
import AuditLog from './audit_log.entity';

@Entity('api_keys')
@Index(['tenantId', 'apiKey'], { unique: true })
@Index(['isActive', 'tenantId', 'apiKey'])
export default class ApiKey<T = any> extends BaseEntity {
  @Column({ name: 'tenant_id', nullable: false })
  tenantId: string;

  @Column({ name: 'api_key', nullable: false, unique: true })
  apiKey: string;

  @Column({ name: 'is_active', default: true, type: 'boolean' })
  isActive: boolean;

  @Column({ nullable: true, type: 'jsonb' })
  metadata: T;

  @OneToMany(() => AuditLog, (auditLog) => auditLog.apiKey, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  logs: Array<AuditLog>;
}
