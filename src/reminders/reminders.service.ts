import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreateReminderDto } from './dto/create-reminder.dto';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {

    constructor(
        @InjectModel(Reminder.name)
        private reminderModel: Model<Reminder>
    ) { }

    public async findAll() {
        return await this.reminderModel.find();
    }

    public async findById(id: string) {
        let reminder: Reminder;

        if (isValidObjectId(id)) {
            reminder = await this.reminderModel.findById(id)
        }


        if (!reminder) throw new NotFoundException(`Reminder with id '${id}' not found`);
        return reminder;
    }

    public async create(createReminderDto: CreateReminderDto) {

        return this.handleExceptions(async () => {
            const reminder = await this.reminderModel.create(createReminderDto);

            return reminder;
        });
    }

    private async handleExceptions(code: () => any) {
        try {
            return await code();
        } catch (err) {
            if (err.code === 11000) {
                throw new BadRequestException({
                    message: `Reminder with the same ${Object.keys(err.keyValue)} already exists`,
                    keyValues: (err.keyValue)
                })
            }
            throw new InternalServerErrorException("Cant Create Reminder - Check Server Logs")
        }
    }


}
