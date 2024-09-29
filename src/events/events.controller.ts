import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { EventService } from './events.service';
import { Event } from './entities/event.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Post()
  create(@Body() event: Event, @Body('userId') userId: number): Promise<Event> {
    const user = new User();
    user.id = userId;
    return this.eventService.create(event, userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() event: Event, @Body('userId') userId: number): Promise<Event> {
    const user = new User();
    user.id = userId;
    return this.eventService.update(+id, event, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body('userId') userId: number): Promise<{ message: string }> {
    const user = new User();
    user.id = userId;
    return this.eventService.delete(+id, user);
  }
}
