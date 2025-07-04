import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjects1751039385931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'projectName',
            type: 'varchar',
          },
          {
            name: 'starts',
            type: 'date',
          },
          {
            name: 'deadLine',
            type: 'date',
          },
          {
            name: 'priority',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
