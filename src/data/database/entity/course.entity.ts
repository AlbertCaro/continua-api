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
import { Inscripcion } from './enrollment.entity';
import { Course } from 'src/domain/models/course.model';

@Entity('cursos')
export class Curso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  nombre: string;

  @Column({ name: 'descripcion_corta', type: 'text', nullable: true })
  descripcionCorta: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'longtext', nullable: false })
  objetivos: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  duracion: string;

  @Column({ type: 'date', nullable: false })
  inicio: Date;

  @Column({ type: 'date', nullable: false })
  fin: Date;

  @Column()
  esfuerzo: string;

  @Column({ name: 'costo_incio', type: 'float', scale: 2, nullable: false })
  costoInicio: number;

  @Column({ name: 'costo_fin', type: 'float', scale: 2, nullable: false })
  costoFin: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  tema: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  nive: string;

  @Column({ type: 'int', nullable: false })
  cupo: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  pago: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  doc: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  info: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  img: string;

  @Column({ type: 'int', nullable: false })
  estatus: number;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.cursosCoordinados)
  @JoinColumn({ name: 'coordinador_id' })
  coordinador: Usuario;

  @OneToMany(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.curso)
  inscripciones: Inscripcion[];

  toDomain() {
    const model = new Course();

    model.id = this.id;
    model.name = this.nombre;
    model.shortDescription = this.descripcionCorta;
    model.description = this.descripcion;
    model.objetives = this.objetivos;
    model.duration = this.duracion;
    model.startDate = this.inicio;
    model.endDate = this.fin;
    model.effort = this.esfuerzo;
    model.initialCost = this.costoInicio;
    model.finalCost = this.costoFin;
    model.topic = this.tema;
    model.nive = this.nive;
    model.capacity = this.cupo;
    model.payment = this.pago;
    model.document = this.doc;
    model.info = this.info;
    model.img = this.img;
    model.status = this.estatus;

    model.coordinator = this.coordinador.toDomain();

    model.enrollments = this.inscripciones.map((inscripciones) =>
      inscripciones.toDomain(),
    );

    return model;
  }
}
