import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class EditUserEmailDto {

    @ApiProperty()
    @IsString()
    email: string;
}
