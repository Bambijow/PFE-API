import {UserRoleEnum} from "../enums/user-role.enum";
import {ApiProperty} from "@nestjs/swagger";

export class EditUserRoleDto {

    @ApiProperty()
    role: UserRoleEnum;

}
