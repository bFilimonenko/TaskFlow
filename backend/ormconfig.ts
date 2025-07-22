import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateUsers1750059644849 } from './src/migrations/1750059644849-CreateUsers';
import { CreateTokens1750338932463 } from './src/migrations/1750338932463-CreateTokens';
import { CreateProjects1751039385931 } from './src/migrations/1751039385931-CreateProjects';
import { CreateTasks1751446658622 } from './src/migrations/1751446658622-CreateTasks';
import { CreateTasksUsersJoinTable1751453247864 } from './src/migrations/1751453247864-CreateTasksUsersJoinTable';
import { AddUsersRoles1752761244725 } from './src/migrations/1752761244725-AddUsersRoles';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['entity/*.ts'],
  synchronize: false,
  migrations: [
    CreateUsers1750059644849,
    CreateTokens1750338932463,
    CreateProjects1751039385931,
    CreateTasks1751446658622,
    CreateTasksUsersJoinTable1751453247864,
    AddUsersRoles1752761244725,
  ],
});
