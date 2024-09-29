import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['user'] });
  }


  async create(event: Event, userId: number): Promise<Event> {
    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    event.user = user;
    try {
      return await this.eventRepository.save(event);
    } catch (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Event> {
    if (!id) {
      throw new Error('Please Provide valid ID');
    }
    const event = await this.eventRepository.findOne({ where: { id },relations:['user'] });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
  
  async update(id: number, event: Event, user: User): Promise<Event> {
    if (!id) {
      throw new Error('Please Provide valid ID');
    }
    const existingEvent = await this.findOne(id);
    if (existingEvent.user.id !== user.id) {
      throw new Error("You don't have permission to update this event.");
    }
    Object.assign(existingEvent, event);
    return this.eventRepository.save(existingEvent);
  }

  async delete(id: number, user: User): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestException('Please provide a valid ID');
    }
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.user?.id !== user.id) {
      throw new ForbiddenException("You don't have permission to delete this event.");
    }
    await this.eventRepository.remove(event);

    return { message: 'Event deleted successfully' };
  }
}
