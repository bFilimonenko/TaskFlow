import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokens1750338932463 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        foreignKeys: [
          {
            onDelete: 'CASCADE',
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          },
        ],
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'validFrom',
            type: 'date',
          },
          {
            name: 'validUntil',
            type: 'date',
          },
          {
            name: 'refreshToken',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
