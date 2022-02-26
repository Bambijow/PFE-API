import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ResourcesRepository} from "./resources.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourcesRepository]),
  ],
  providers: [ResourcesService],
  controllers: [ResourcesController]
})
export class ResourcesModule {}
