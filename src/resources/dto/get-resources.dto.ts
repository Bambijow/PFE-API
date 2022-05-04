import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetResourceDto {

    @IsOptional()
    @ApiProperty({ required: false })
    @IsString()
    id: string;

    @IsOptional()
    @ApiProperty({ required: false })
    @IsString()
    active: string;
    
}
