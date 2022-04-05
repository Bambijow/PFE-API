import {UserStatusEnum} from "../enums/user-status.enum";
import {ApiProperty} from "@nestjs/swagger";

export class EditUserStatusDto {

    @ApiProperty()
    status: UserStatusEnum;

}
