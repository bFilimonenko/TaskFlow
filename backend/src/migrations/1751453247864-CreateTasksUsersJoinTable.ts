import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTasksUsersJoinTable1751453247864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks_users',
        columns: [
          {
            name: 'tasksId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'usersId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('tasks_users', [
      new TableForeignKey({
        columnNames: ['tasksId'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['usersId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks_users');
  }
}
