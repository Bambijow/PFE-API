import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class GetCommentariesDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    resource_id: string;
}
