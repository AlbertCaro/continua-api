import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/domain/models/role.enum';
import { Auth } from 'src/infraestructure/auth/auth-role.decorator';
import { RoleGuard } from 'src/infraestructure/auth/role.guard';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('payments')
@Auth(Role.ADMINISTRATOR)
export class PaymentController {
  @Get()
  async list() {}

  @Post()
  async create() {}

  @Get(':id')
  async getById() {}

  @Get(':id/receipt')
  async getReceipt() {}

  @Post(':id/receipt')
  async createReceipt() {}
}
