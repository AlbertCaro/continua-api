import { Usuario } from 'src/data/database/entity/user.entity';
import { Role } from './role.enum';
import { UserReadDto } from 'src/infraestructure/user/dto/user-read.dto';
import { Course } from './course.model';
import { Enrollment } from './enrollment.model';

export class User {
  id: number;

  names: string;

  lastName: string;

  email: string;

  password: string;

  role: Role;

  code: number;

  courses: Course[] = [];

  enrollments: Enrollment[] = [];

  toDatabase() {
    const entity = new Usuario();

    entity.id = this.id;
    entity.nombres = this.names;
    entity.apellidos = this.lastName;
    entity.correo = this.email;
    entity.password = this.password;
    entity.rol = this.role;
    entity.codigo = this.code;

    entity.cursosCoordinados = this.courses.map((course) =>
      course.toDatabase(),
    );

    entity.inscripciones = this.enrollments.map((enrollment) =>
      enrollment.toDatabase(),
    );

    return entity;
  }

  toRead() {
    const dto = new UserReadDto();

    dto.id = this.id;
    dto.names = this.names;
    dto.lastName = this.lastName;
    dto.email = this.email;
    dto.role = this.role;
    dto.code = this.code;

    return dto;
  }
}
