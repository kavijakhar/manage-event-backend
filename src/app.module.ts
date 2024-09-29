import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module'; // Import UserModule
import { EventsModule } from './events/events.module'; // Import EventModule if applicable
import { User } from './users/entities/user.entity'; // User entity
import { Event } from './events/entities/event.entity'; // Event entity (if applicable)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-sync entities; use carefully in production
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    UsersModule, // Register UserModule
    EventsModule, // Register EventModule if applicable
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
