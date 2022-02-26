import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @Matches(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ -]+$/, {
        message: 'Le nom doit contenir uniquement des lettres, des \'-\' et des \' \''
    })
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @Matches(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ -]+$/, {
        message: 'Le prénom doit contenir uniquement des lettres, des \'-\' et des \' \''
    })
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Le mot de passe est trop faible. ',
    })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number;
}
