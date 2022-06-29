import { IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) - is an object that defines how the data will be sent over the network
export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
