import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../auth/role.guard';
import { Auth } from '../auth/auth-role.decorator';
import { Role } from 'src/domain/models/role.enum';
import { CreateEnrollment } from 'src/domain/usecases/enrollment/create-enrollment.usecase';
import { GetAllEnrollments } from 'src/domain/usecases/enrollment/get-all-enrollment.usecase';
import { GetEnrollmentById } from 'src/domain/usecases/enrollment/get-enrollment-by-id.usecase';
import { UpdateEnrollment } from 'src/domain/usecases/enrollment/update-enrollment.usecase';
import { DeleteEnrollment } from 'src/domain/usecases/enrollment/delete-enrollment.usecase';
import { EnrollmentDto } from './dto/enrollment.dto';
import { IdInterceptor } from '../common/id.interceptor';

@ApiTags('Inscripciones')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('enrollments')
@Auth(Role.ADMINISTRATOR)
export class EnrollmentController {
  constructor(
    private readonly createEnrollment: CreateEnrollment,
    private readonly getEnrollmentById: GetEnrollmentById,
    private readonly getAllEnrollments: GetAllEnrollments,
    private readonly updateEnrollment: UpdateEnrollment,
    private readonly deleteEnrollment: DeleteEnrollment,
  ) {}

  @Get()
  async getAll() {
    const enrollments = await this.getAllEnrollments.execute();

    return enrollments.map((enrollment) => enrollment.toDto());
  }

  @Post()
  async save(@Body() dto: EnrollmentDto) {
    const enrollment = await this.createEnrollment.execute(
      dto.toDomain(),
      dto.student,
      dto.course,
    );

    return enrollment.toDto();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const enrollment = await this.getEnrollmentById.execute(id);

    if (enrollment === undefined) {
      throw new NotFoundException('Inscripción inexistente');
    }

    return enrollment.toDto();
  }

  @Put(':id')
  @UseInterceptors(IdInterceptor)
  async update(@Param('id') id: number, @Body() dto: EnrollmentDto) {
    const enrollment = await this.updateEnrollment.execute(
      id,
      dto.toDomain(),
      dto.student,
      dto.course,
    );

    if (!enrollment) {
      throw new NotFoundException('Inscripción inexistente');
    }

    return enrollment.toDto();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const enrollment = await this.deleteEnrollment.execute(id);

    if (!enrollment) {
      throw new NotFoundException('Inscripción no encontrado');
    }

    return enrollment.toDto();
  }
}
