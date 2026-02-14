import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Course } from 'src/domain/models/course.model';
import { IsUserId } from 'src/infraestructure/user/validation/is-user-id.validator';

export class CourseDto {
  @ApiHideProperty()
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortDescription: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  objetives: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  effort: string;

  @IsNotEmpty()
  initialCost: number;

  @IsNotEmpty()
  finalCost: number;

  @IsNotEmpty()
  topic: string;

  @IsNotEmpty()
  nive: string;

  @IsNotEmpty()
  capacity: number;

  @IsNotEmpty()
  payment: string;

  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  info: string;

  @IsNotEmpty()
  img: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  @IsUserId()
  coordinator: number;

  toDomain() {
    const model = new Course();

    model.id = this.id;
    model.name = this.name;
    model.shortDescription = this.shortDescription;
    model.description = this.description;
    model.objetives = this.objetives;
    model.duration = this.duration;
    model.startDate = this.startDate;
    model.endDate = this.endDate;
    model.effort = this.effort;
    model.initialCost = this.initialCost;
    model.finalCost = this.finalCost;
    model.topic = this.topic;
    model.nive = this.nive;
    model.capacity = this.capacity;
    model.payment = this.payment;
    model.document = this.document;
    model.info = this.info;
    model.img = this.img;
    model.status = this.status;

    return model;
  }
}
