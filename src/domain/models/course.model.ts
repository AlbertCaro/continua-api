import { Curso } from 'src/data/database/entity/course.entity';
import { User } from './user.model';
import { Enrollment } from './enrollment.model';

export class Course {
  id?: number;

  name: string;

  shortDescription: string;

  description: string;

  objetives: string;

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
    entity.objetivos = this.objetives;
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

    entity.coordinador = this.coordinator.toDatabase();
    entity.inscripciones = this.enrollments.map((enrollment) =>
      enrollment.toDatabase(),
    );

    return entity;
  }
}
