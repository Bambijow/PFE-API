import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";

export class GetCategoriesDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    id: number;
}
