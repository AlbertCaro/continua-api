import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pago } from './payment.entity';
import { Receipt } from 'src/domain/models/receipt.model';

@Entity('comprobantes')
export class Comprobante extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'nombre_archivo' })
  nombreArchivo: string;

  @Column({ name: 'tipo_archivo', length: 45 })
  tipoArchivo: string;

  @Column({ type: 'longblob' })
  contenido: Buffer;

  @OneToOne(() => Pago, (pago: Pago) => pago.comprobante)
  @JoinColumn({ name: 'pago_id' })
  pago: Pago;

  toDomain() {
    const model = new Receipt();

    model.id = this.id;
    model.fileName = this.nombreArchivo;
    model.fileType = this.tipoArchivo;
    model.content = this.contenido;

    return model;
  }
}
