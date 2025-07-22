import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    description: 'Project id',
    example: 1,
  })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Project name',
    example: 'Time tracker - personal account',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  projectName: string;

  @ApiProperty({
    description: 'Start date',
    example: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  starts: Date;

  @ApiProperty({
    description: 'Dead line',
    example: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  deadLine: Date;

  @ApiProperty({
    description: 'Project priority',
    example: 'Medium',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  priority: string;

  @ApiProperty({
    description: 'Project description',
    example:
      'App for maintaining your medical record, making appointments with a doctor, storing prescriptions',
    required: false,
  })
  @IsString()
  @Expose()
  description?: string;
}
