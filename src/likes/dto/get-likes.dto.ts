import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class GetLikesDto{
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    user: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    resource: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    positive: string
}