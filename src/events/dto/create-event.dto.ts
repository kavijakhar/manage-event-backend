import { IsNotEmpty, IsString, IsDate, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  images?: string[];

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @IsInt()
  totalGuests: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
