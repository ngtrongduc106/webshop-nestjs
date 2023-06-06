import { MigrationInterface, QueryRunner } from "typeorm";

export class V11686017061030 implements MigrationInterface {
    name = 'V11686017061030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`userAddress\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`cityId\` varchar(255) NOT NULL, \`districtId\` varchar(255) NOT NULL, \`homeAddress\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`FK_userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`userId\` varchar(36) NOT NULL, \`userEmail\` varchar(255) NOT NULL, \`userPassword\` varchar(255) NOT NULL, \`userFirstName\` varchar(255) NOT NULL, \`userLastName\` varchar(255) NOT NULL, \`userPhone\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roleHasPermission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`FK_roleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`roleId\` varchar(36) NOT NULL, \`roleName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userHasRole\` (\`userId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_79802e0f18ca5887fa395cea05\` (\`userId\`), INDEX \`IDX_0152f52c6dda0a5b8e813b722b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`userAddress\` ADD CONSTRAINT \`FK_6eaf15a711dc2c29dfeb003b76e\` FOREIGN KEY (\`FK_userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roleHasPermission\` ADD CONSTRAINT \`FK_eadfecd7672b57d4246078947a1\` FOREIGN KEY (\`FK_roleId\`) REFERENCES \`roles\`(\`roleId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userHasRole\` ADD CONSTRAINT \`FK_79802e0f18ca5887fa395cea057\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`userHasRole\` ADD CONSTRAINT \`FK_0152f52c6dda0a5b8e813b722b2\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`roleId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userHasRole\` DROP FOREIGN KEY \`FK_0152f52c6dda0a5b8e813b722b2\``);
        await queryRunner.query(`ALTER TABLE \`userHasRole\` DROP FOREIGN KEY \`FK_79802e0f18ca5887fa395cea057\``);
        await queryRunner.query(`ALTER TABLE \`roleHasPermission\` DROP FOREIGN KEY \`FK_eadfecd7672b57d4246078947a1\``);
        await queryRunner.query(`ALTER TABLE \`userAddress\` DROP FOREIGN KEY \`FK_6eaf15a711dc2c29dfeb003b76e\``);
        await queryRunner.query(`DROP INDEX \`IDX_0152f52c6dda0a5b8e813b722b\` ON \`userHasRole\``);
        await queryRunner.query(`DROP INDEX \`IDX_79802e0f18ca5887fa395cea05\` ON \`userHasRole\``);
        await queryRunner.query(`DROP TABLE \`userHasRole\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`roleHasPermission\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`userAddress\``);
    }

}
