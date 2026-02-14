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
import { CourseDto } from './dto/course.dto';
import { IdInterceptor } from '../common/id.interceptor';
import { CreateCourse } from 'src/domain/usecases/course/create-course.usecase';
import { GetCourseById } from 'src/domain/usecases/course/get-course-by-id.usecase';
import { GetAllCourses } from 'src/domain/usecases/course/get-all-courses.usecase';
import { UpdateCourse } from 'src/domain/usecases/course/update-course.usecase';
import { DeleteCourse } from 'src/domain/usecases/course/delete-course.usecase';

@ApiTags('Cursos')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('courses')
@Auth(Role.ADMINISTRATOR)
export class CourseController {
  constructor(
    private readonly createCourse: CreateCourse,
    private readonly getCourseById: GetCourseById,
    private readonly getAllCourses: GetAllCourses,
    private readonly updateCourse: UpdateCourse,
    private readonly deleteCourse: DeleteCourse,
  ) {}

  @Get()
  async getAll() {
    const courses = await this.getAllCourses.execute();

    return courses.map((course) => course.toDto());
  }

  @Post()
  async save(@Body() dto: CourseDto) {
    const course = await this.createCourse.execute(
      dto.toDomain(),
      dto.coordinator,
    );

    return course.toDto();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const course = await this.getCourseById.execute(id);

    if (course === undefined) {
      throw new NotFoundException('Curso inexistente');
    }

    return course.toDto();
  }

  @Put(':id')
  @UseInterceptors(IdInterceptor)
  async update(@Param('id') id: number, @Body() dto: CourseDto) {
    const course = await this.updateCourse.execute(
      id,
      dto.toDomain(),
      dto.coordinator,
    );

    if (!course) {
      throw new NotFoundException('Curso inexistente');
    }

    return course.toDto();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const course = await this.deleteCourse.execute(id);

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    return course.toDto();
  }
}
