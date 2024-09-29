import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('text', { array: true })
  images: string[];

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  totalGuests: number;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
