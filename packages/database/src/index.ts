import 'reflect-metadata';

import BaseEntity from './models/base';
import ApiKey from './models/api_key.entity';
import AuditLog from './models/audit_log.entity';

export default {
  models: { ApiKey, AuditLog, BaseEntity },
};
