import {IsNumber, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetResourceDto {

    @IsOptional()
    @ApiProperty({ required: false })
    @IsNumber()
    id: number;
    
}
