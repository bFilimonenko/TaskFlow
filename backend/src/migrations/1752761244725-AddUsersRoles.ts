import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUsersRoles1752761244725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        default: "'user'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role');
  }
}
