import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";

export class GetCommentariesDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    resource_id: number;
}
