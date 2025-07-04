import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
