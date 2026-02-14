import { Injectable } from '@nestjs/common';
import { Comprobante } from './database/entity/receipt.entity';
import { Receipt } from 'src/domain/models/receipt.model';

@Injectable()
export class ReceiptRepository {
  async fetchByPaymentId(id: number) {
    // SELECT * FROM comprobantes LEFT JOIN pagos ON ... WHERE pagos.id = ?
    const receipt = await Comprobante.findOne({
      where: { pago: { id } },
    });

    return receipt?.toDomain();
  }

  async create(receipt: Receipt) {
    const entity = receipt.toDatabase();

    await entity.save();
    await entity.reload();

    return entity.toDomain();
  }

  async delete(receipt: Receipt) {
    await receipt.toDatabase().remove();
  }
}
