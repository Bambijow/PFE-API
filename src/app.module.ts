import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ResourcesModule } from './resources/resources.module';
import { CommentariesModule } from './commentaries/commentaries.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'db123',
        database: 'PFE',
        entities: ['dist/**/*.entity{.ts,.js}', 'node_modules/**/*.entity.js'],
        synchronize: false,
      }),
      UsersModule,
      ResourcesModule,
      CommentariesModule,
      CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
