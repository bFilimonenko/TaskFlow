import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateUsers1750059644849 } from './src/migrations/1750059644849-CreateUsers';
import { CreateTokens1750338932463 } from './src/migrations/1750338932463-CreateTokens';
import { CreateProjects1751039385931 } from './src/migrations/1751039385931-CreateProjects';

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
  migrations: [CreateUsers1750059644849, CreateTokens1750338932463, CreateProjects1751039385931],
});
