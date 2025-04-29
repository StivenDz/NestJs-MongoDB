import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Reminder extends Document{

    @Prop({
        unique:true,
        index:true
    })

    @Prop()
    fullName: string;

    @Prop()
    phoneNumber: string;

    @Prop({type:Date,default:Date.now})
    createAt: string;

}

export const ReminderSchema = SchemaFactory.createForClass( Reminder );