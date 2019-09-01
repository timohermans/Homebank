<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20190830030018 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE categories DROP FOREIGN KEY FK_3AF34668B4B21A12');
        $this->addSql('ALTER TABLE categories ADD CONSTRAINT FK_3AF34668B4B21A12 FOREIGN KEY (categoryGroup_id) REFERENCES category_groups (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE categories DROP FOREIGN KEY FK_3AF34668B4B21A12');
        $this->addSql('ALTER TABLE categories ADD CONSTRAINT FK_3AF34668B4B21A12 FOREIGN KEY (categoryGroup_id) REFERENCES categories (id)');
    }
}
