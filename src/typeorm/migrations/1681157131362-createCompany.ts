import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class createCompany1681157131362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'companyName',
            type: 'varchar',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'availableSeats',
            type: 'int',
          },
          {
            name: 'primaryColor',
            type: 'varchar',
          },
          {
            name: 'secondaryColor',
            type: 'varchar',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
