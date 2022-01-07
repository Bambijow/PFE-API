import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

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
        synchronize: true,
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
