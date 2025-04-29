import { IsString, MinLength } from "class-validator";

export class CreateReminderDto{

    @IsString()
    @MinLength(2)
    readonly fullName: string;

    @IsString()
    @MinLength(2)
    readonly phoneNumber: string;
}