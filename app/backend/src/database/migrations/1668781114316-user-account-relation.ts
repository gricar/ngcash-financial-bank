import { MigrationInterface, QueryRunner } from "typeorm";

export class userAccountRelation1668781114316 implements MigrationInterface {
    name = 'userAccountRelation1668781114316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "accountId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_42bba679e348de51a699fb0a803" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountId"`);
    }

}
