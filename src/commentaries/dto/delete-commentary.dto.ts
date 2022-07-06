import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";

export class DeleteCommDto {

    @ApiProperty()
    @IsNumber()
    id: number
}
