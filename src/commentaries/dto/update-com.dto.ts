import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateComDto {

    @ApiProperty()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsString()
    content: string;
}
