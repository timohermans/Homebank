<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20191129222526 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE categories (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_3AF346685E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transactions (id VARCHAR(255) NOT NULL, category_id VARCHAR(255) DEFAULT NULL, date DATE NOT NULL, payee VARCHAR(255) NOT NULL, memo VARCHAR(255) NOT NULL, outflow NUMERIC(10, 2) NOT NULL, inflow NUMERIC(10, 2) NOT NULL, isBankTransaction TINYINT(1) NOT NULL, isInflowForBudgeting TINYINT(1) NOT NULL, INDEX IDX_EAA81A4C12469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE transactions ADD CONSTRAINT FK_EAA81A4C12469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE transactions DROP FOREIGN KEY FK_EAA81A4C12469DE2');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE transactions');
    }
}
