import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTasks1751446658622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'taskName',
            type: 'varchar',
          },
          {
            name: 'estimate',
            type: 'int',
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
          {
            name: 'projectId',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedTableName: 'projects',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
