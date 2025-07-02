import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskDto {
  @ApiProperty({
    description: 'Task id',
    example: 1,
  })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Task name',
    example: 'Database schema design',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  taskName: string;

  @ApiProperty({
    description: 'Estimate',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  estimate: number;

  @ApiProperty({
    description: 'Dead line',
    example: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  deadLine: Date;

  @ApiProperty({
    description: 'Task priority',
    example: 'Medium',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  priority: string;

  @ApiProperty({
    description: 'Users id',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  @Expose()
  users: number[];

  @ApiProperty({
    description: 'Task description',
    example: 'Design relational DB schema including user, roles, and permissions.',
    required: false,
  })
  @IsString()
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Project id for task',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  projectId: number;
}
