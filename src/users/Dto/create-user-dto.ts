import { IsEmail,IsNotEmpty,IsString,IsEnum} from "class-validator";


export class createUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
     
    @IsEmail()
    email: string;

    @IsEnum(["ADMIN","ENGINEER","INTERN"],{
        message:'dfegdw'

    })
    role: "ADMIN" | "ENGINEER" | "INTERN"
}