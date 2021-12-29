import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialVersion1640763386037 implements MigrationInterface {
  name = 'initialVersion1640763386037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "api_key_auth"."audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timestamp" TIMESTAMP NOT NULL, "tenant_address" character varying NOT NULL, "client_address" character varying NOT NULL, "action_requested" character varying NOT NULL, "action_result" character varying NOT NULL, "metadata" jsonb, "api_key_id" uuid NOT NULL, CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_833735f998494bd9058441b161" ON "api_key_auth"."audit_logs" ("api_key_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "api_key_auth"."api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "tenant_id" character varying NOT NULL, "api_key" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "metadata" jsonb, CONSTRAINT "UQ_9ccce5863aec84d045d778179de" UNIQUE ("api_key"), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a1c71ee63cc5e44665e3386be" ON "api_key_auth"."api_keys" ("is_active", "tenant_id", "api_key") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_684613ffb90f2c32e2d409d3bf" ON "api_key_auth"."api_keys" ("tenant_id", "api_key") `,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key_auth"."audit_logs" ADD CONSTRAINT "FK_833735f998494bd9058441b161e" FOREIGN KEY ("api_key_id") REFERENCES "api_key_auth"."api_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "api_key_auth"."audit_logs" DROP CONSTRAINT "FK_833735f998494bd9058441b161e"`,
    );
    await queryRunner.query(
      `DROP INDEX "api_key_auth"."IDX_684613ffb90f2c32e2d409d3bf"`,
    );
    await queryRunner.query(
      `DROP INDEX "api_key_auth"."IDX_7a1c71ee63cc5e44665e3386be"`,
    );
    await queryRunner.query(`DROP TABLE "api_key_auth"."api_keys"`);
    await queryRunner.query(
      `DROP INDEX "api_key_auth"."IDX_833735f998494bd9058441b161"`,
    );
    await queryRunner.query(`DROP TABLE "api_key_auth"."audit_logs"`);
  }
}
