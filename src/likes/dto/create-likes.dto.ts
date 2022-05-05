import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Resources } from "src/resources/resources.entity";
import { Users } from "src/users/users.entity";

export class CreateLikesDto{
    @ApiProperty()
    @Type(() => Users)
    user: Users

    @ApiProperty()
    @Type(() => Resources)
    resource: Resources

    @ApiProperty()
    @IsBoolean()
    positive: boolean
}