import { Comprobante } from 'src/data/database/entity/receipt.entity';
import { Payment } from './payment.model';

export class Receipt {
  id?: number;

  fileName: string;

  fileType: string;

  content: string;

  payment: Payment;

  toDatabase() {
    const entity = new Comprobante();

    entity.id = this.id;
    entity.nombreArchivo = this.fileName;
    entity.tipoArchivo = this.fileType;
    entity.contenido = this.content;
    entity.pago = this.payment.toDatabase();

    return entity;
  }
}
