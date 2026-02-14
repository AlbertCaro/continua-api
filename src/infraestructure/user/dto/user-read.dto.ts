import { ApiProperty } from '@nestjs/swagger';
import { Enrollment } from 'src/domain/models/enrollment.model';
import { Role } from 'src/domain/models/role.enum';
import { EnrollmentDto } from 'src/infraestructure/enrollment/dto/enrollment.dto';

export class UserReadDto {
  @ApiProperty({ example: 1 })
  id?: number;
  @ApiProperty({ example: 'Alberto' })
  names: string;
  @ApiProperty({ example: 'Caro' })
  lastName: string;
  @ApiProperty({ example: 'alberto@gmail.com' })
  email: string;
  @ApiProperty({ example: Role.STUDENT })
  role: Role;
  @ApiProperty({ example: 215818158 })
  code: number;

  enrollments: EnrollmentDto[] = [];
}
