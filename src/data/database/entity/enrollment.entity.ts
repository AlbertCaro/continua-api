import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './user.entity';
import { Curso } from './course.entity';
import { Pago } from './payment.entity';
import { Enrollment } from 'src/domain/models/enrollment.model';

@Entity('inscripciones')
export class Inscripcion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 150 })
  motivos: string;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ type: 'float' })
  precio: number;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.inscripciones)
  @JoinColumn({ name: 'alumno_id' })
  alumno: Usuario;

  @ManyToOne(() => Curso, (curso: Curso) => curso.inscripciones)
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;

  @OneToMany(() => Pago, (pago: Pago) => pago.inscripcion)
  pagos: Pago[];

  toDomain(): any {
    const model = new Enrollment();

    model.id = this.id;
    model.reasons = this.motivos;
    model.date = this.fecha;
    model.price = this.precio;

    if (this.alumno) {
      model.student = this.alumno.toDomain();
    }

    if (this.curso) {
      model.course = this.curso.toDomain();
    }

    if (this.pagos) {
      model.payments = this.pagos.map((pago) => pago.toDomain());
    }

    return model;
  }
}
