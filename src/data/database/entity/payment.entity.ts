import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inscripcion } from './enrollment.entity';
import { Comprobante } from './receipt.entity';
import { Payment } from 'src/domain/models/payment.model';

@Entity('pagos')
export class Pago extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 45 })
  banco: string;

  @Column({ type: 'float', precision: 2, scale: 2 })
  monto: number;

  @ManyToOne(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.pagos)
  @JoinColumn({ name: 'inscripcion_id' })
  inscripcion: Inscripcion;

  @OneToOne(() => Comprobante, (comprobante: Comprobante) => comprobante.pago)
  comprobante: Comprobante;

  toDomain() {
    const model = new Payment();

    model.id = this.id;
    model.bank = this.banco;
    model.amount = this.monto;
    model.enrollment = this.inscripcion.toDomain();
    model.receipt = this.comprobante.toDomain();

    return model;
  }
}
