import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";


export class GetUsersFilterDto {

    @IsOptional()
    @ApiProperty({ required: false, description: 'Filtrer par id' })
    @IsNumber()
    @Type(() => Number)
    user_id?: number;

    @IsOptional()
    @ApiProperty({ required: false, description: 'Filtrer par prénoms' })
    @IsString()
    first_name?: string;

    @IsOptional()
    @ApiProperty({ required: false, description: 'Filter par noms' })
    @IsString()
    last_name?: string;

    @IsOptional()
    @ApiProperty({ required: false, description: 'Filtrer par statut de bannissement' })
    @IsNumber()
    @Type(() => Number)
    ban: number = -1;

}
