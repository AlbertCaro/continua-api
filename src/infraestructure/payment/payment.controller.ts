import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/domain/models/role.enum';
import { CreatePayment } from 'src/domain/usecases/payment/create-payment.usecase';
import { CreateReceipt } from 'src/domain/usecases/payment/create-receipt.usecase';
import { GetAllPayments } from 'src/domain/usecases/payment/get-all-payments.usecase';
import { GetPaymentById } from 'src/domain/usecases/payment/get-payment-by-id.usecase';
import { GetPaymentReceipt } from 'src/domain/usecases/payment/get-payment-receipt.usecase';
import { Auth } from 'src/infraestructure/auth/auth-role.decorator';
import { RoleGuard } from 'src/infraestructure/auth/role.guard';
import { PaymentDto } from './dto/payment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Receipt } from 'src/domain/models/receipt.model';
import { ReceiptDto } from './dto/receipt.dto';
import { Response } from 'express';
import { DeletePaymentById } from 'src/domain/usecases/payment/delete-payment-by-id.usecase';
import { DeleteReceiptById } from 'src/domain/usecases/payment/delete-receipt-by-id.usecase';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('payments')
@Auth(Role.ADMINISTRATOR, Role.STUDENT)
export class PaymentController {
  constructor(
    private readonly createPayment: CreatePayment,
    private readonly createReceipt: CreateReceipt,
    private readonly getAllPayments: GetAllPayments,
    private readonly getPaymentById: GetPaymentById,
    private readonly deletePayment: DeletePaymentById,
    private readonly deleteReceiptById: DeleteReceiptById,
    private readonly getPaymentReceipt: GetPaymentReceipt,
  ) {}

  @Get()
  async list() {
    const payments = await this.getAllPayments.execute();

    return payments.map((payment) => payment.toDto());
  }

  @Post()
  async create(@Body() dto: PaymentDto) {
    const payment = await this.createPayment.execute(
      dto.toDomain(),
      dto.enrollment,
    );

    return payment.toDto();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const payment = await this.getPaymentById.execute(id);

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return payment.toDto();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.deletePayment.execute(id);
  }

  @Delete(':id/receipt')
  async deleteReceipt(@Param('id') id: number) {
    await this.deleteReceiptById.execute(id);
  }

  @Get(':id/receipt')
  async getReceipt(@Param('id') id: number) {
    const payment = await this.getPaymentById.execute(id);

    if (!payment) {
      throw new NotFoundException('Pago no encontrado.');
    }

    const receipt = await this.getPaymentReceipt.execute(id);

    if (!receipt) {
      throw new NotFoundException('Comprobante no encontrado.');
    }

    return new ReceiptDto(receipt);
  }

  @Get(':id/receipt/download')
  async downloadReceipt(@Param('id') id: number, @Res() response: Response) {
    const payment = await this.getPaymentById.execute(id);

    if (!payment) {
      throw new NotFoundException('Pago no encontrado.');
    }

    const receipt = await this.getPaymentReceipt.execute(id);

    if (!receipt) {
      throw new NotFoundException('Comprobante no encontrado.');
    }

    response.set({
      'Content-Type': receipt.fileType,
      'Content-Length': receipt.content.length,
      'Content-Disposition': `attachment; filename="${receipt.fileName}"`,
    });

    response.send(receipt.content);
  }

  @Post(':id/receipt')
  @UseInterceptors(FileInterceptor('file'))
  async uploadReceipt(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const receipt = new Receipt();

    receipt.fileName = file.originalname;
    receipt.content = file.buffer;
    receipt.fileType = file.mimetype;

    const savedReceipt = await this.createReceipt.execute(receipt, id);

    if (!savedReceipt) {
      throw new NotFoundException('Pago no encontrado');
    }

    return new ReceiptDto(savedReceipt);
  }
}
