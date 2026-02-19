import { Curso } from 'src/data/database/entity/course.entity';
import { User } from './user.model';
import { Enrollment } from './enrollment.model';
import { CourseDto } from 'src/infraestructure/course/dto/course.dto';

export class Course {
  b;
  id?: number;

  name: string;

  shortDescription: string;

  description: string;

  objectives: string;

  duration: string;

  startDate: Date;

  endDate: Date;

  effort: string;

  initialCost: number;

  finalCost: number;

  topic: string;

  nive: string;

  capacity: number;

  payment: string;

  document: string;

  info: string;

  img: string;

  status: number;

  coordinator: User;

  enrollments: Enrollment[];

  toDatabase() {
    const entity = new Curso();

    entity.id = this.id;
    entity.nombre = this.name;
    entity.descripcionCorta = this.shortDescription;
    entity.descripcion = this.description;
    entity.objetivos = this.objectives;
    entity.duracion = this.duration;
    entity.inicio = this.startDate;
    entity.fin = this.endDate;
    entity.esfuerzo = this.effort;
    entity.costoInicio = this.initialCost;
    entity.costoFin = this.finalCost;
    entity.tema = this.topic;
    entity.nive = this.nive;
    entity.cupo = this.capacity;
    entity.pago = this.payment;
    entity.doc = this.document;
    entity.info = this.info;
    entity.img = this.img;
    entity.estatus = this.status;

    if (this.coordinator) {
      entity.coordinador = this.coordinator.toDatabase();
    }

    if (this.enrollments) {
      entity.inscripciones = this.enrollments.map((enrollment) =>
        enrollment.toDatabase(),
      );
    }

    return entity;
  }

  toDto() {
    const dto = new CourseDto();

    dto.id = this.id;
    dto.name = this.name;
    dto.shortDescription = this.shortDescription;
    dto.description = this.description;
    dto.objectives = this.objectives;
    dto.duration = this.duration;
    dto.startDate = this.startDate;
    dto.endDate = this.endDate;
    dto.effort = this.effort;
    dto.initialCost = this.initialCost;
    dto.finalCost = this.finalCost;
    dto.topic = this.topic;
    dto.nive = this.nive;
    dto.capacity = this.capacity;
    dto.payment = this.payment;
    dto.document = this.document;
    dto.info = this.info;
    dto.img = this.img;
    dto.status = this.status;
    dto.coordinator = this.coordinator.id!;

    return dto;
  }
}
