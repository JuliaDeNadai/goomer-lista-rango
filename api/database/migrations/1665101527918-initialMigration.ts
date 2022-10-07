import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1665101527918 implements MigrationInterface {
    name = 'initialMigration1665101527918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Restaurante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`foto\` varchar(255) NULL, \`abertura\` time NOT NULL, \`encerramento\` time NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Produto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`preco\` decimal(10,2) NOT NULL DEFAULT '0.00', \`idCategoria\` int NULL, \`idRestaurante\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Promocao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` varchar(255) NOT NULL, \`dia_semana\` int NOT NULL, \`ativa\` char(1) NOT NULL DEFAULT 'N', \`inicio\` time NOT NULL, \`encerramento\` time NOT NULL, \`preco\` decimal(10,2) NOT NULL DEFAULT '0.00', \`idProduto\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Produto\` ADD CONSTRAINT \`FK_31ea2f159f557e3fd1129f21325\` FOREIGN KEY (\`idCategoria\`) REFERENCES \`Categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Produto\` ADD CONSTRAINT \`FK_bad54f9366a43b41285dbf00b67\` FOREIGN KEY (\`idRestaurante\`) REFERENCES \`Restaurante\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Promocao\` ADD CONSTRAINT \`FK_3080811c9bd7c76517c0cff9824\` FOREIGN KEY (\`idProduto\`) REFERENCES \`Produto\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Promocao\` DROP FOREIGN KEY \`FK_3080811c9bd7c76517c0cff9824\``);
        await queryRunner.query(`ALTER TABLE \`Produto\` DROP FOREIGN KEY \`FK_bad54f9366a43b41285dbf00b67\``);
        await queryRunner.query(`ALTER TABLE \`Produto\` DROP FOREIGN KEY \`FK_31ea2f159f557e3fd1129f21325\``);
        await queryRunner.query(`DROP TABLE \`Promocao\``);
        await queryRunner.query(`DROP TABLE \`Produto\``);
        await queryRunner.query(`DROP TABLE \`Restaurante\``);
        await queryRunner.query(`DROP TABLE \`Categoria\``);
    }

}
