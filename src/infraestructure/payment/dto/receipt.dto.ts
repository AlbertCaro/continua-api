import { Payment } from 'src/domain/models/payment.model';
import { Receipt } from 'src/domain/models/receipt.model';

export class ReceiptDto {
  id: number;

  fileName: string;

  fileType: string;

  content: string;

  constructor(receipt: Receipt) {
    this.id = receipt.id;
    this.fileName = receipt.fileName;
    this.fileType = receipt.fileType;
    this.content = receipt.content.toString('base64');
  }
}
