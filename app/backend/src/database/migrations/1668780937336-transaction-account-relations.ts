import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionAccountRelations1668780937336 implements MigrationInterface {
    name = 'transactionAccountRelations1668780937336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_90970e74d61cc1e18df1564e3be" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_90970e74d61cc1e18df1564e3be"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccountId"`);
    }

}
