import { Module } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';
import {CommentariesRepository} from "./commentaries.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forFeature([CommentariesRepository])
  ],
  providers: [CommentariesService],
  controllers: [CommentariesController]
})
export class CommentariesModule {}
