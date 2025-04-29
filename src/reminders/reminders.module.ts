import { Module } from '@nestjs/common';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reminder, ReminderSchema } from './entities/reminder.entity';

@Module({
    controllers: [RemindersController],
    providers: [RemindersService],
    imports: [MongooseModule.forFeature([
        {
            name: Reminder.name,
            schema: ReminderSchema
        }
    ])]
})
export class RemindersModule { }
