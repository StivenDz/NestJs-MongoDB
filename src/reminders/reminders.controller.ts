import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {

    constructor(
        private readonly remindersService: RemindersService
    ) { }

    @Get()
    public getAllReminders() {
        return this.remindersService.findAll();
    }

    @Get(":id")
    public getReminderById(@Param("id") id: string) {
        return this.remindersService.findById(id);
    }


    @Post()
    @HttpCode(HttpStatus.OK)
    public createReminder(@Body() createReminderDto: CreateReminderDto) {
        return this.remindersService.create(createReminderDto);
    }
}
