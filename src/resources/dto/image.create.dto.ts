import {ApiProperty} from "@nestjs/swagger";

export class ImageCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    link: string;

    @ApiProperty()
    size: string;
}
