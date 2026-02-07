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
import { CreateUser } from 'src/domain/usecases/user/create-user.usecase';
import { UserWriteDto } from './dto/user-write.dto';
import { GetUserById } from 'src/domain/usecases/user/get-user-by-id.usecase';
import { GetAllUsers } from 'src/domain/usecases/user/get-all-users.usecase';
import { UpdateUser } from 'src/domain/usecases/user/update-user.usecase';
import { DeleteUser } from 'src/domain/usecases/user/delete-user.usecase';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Auth } from '../auth/auth-role.decorator';
import { Role } from 'src/domain/models/role.enum';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserReadDto } from './dto/user-read.dto';
import { IdInterceptor } from '../common/id.interceptor';

@ApiTags('Usuarios')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('users')
@Auth(Role.ADMINISTRATOR)
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUserById: GetUserById,
    private readonly getAllUsers: GetAllUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar usuarios',
    description: 'Lista todos los usuarios del sistema',
  })
  @ApiOkResponse({
    description: 'Lista de usuarios',
    isArray: true,
    type: UserReadDto,
  })
  async getAll() {
    const users = await this.getAllUsers.execute();

    return users.map((user) => user.toRead());
  }

  @Post()
  @ApiOperation({
    summary: 'Crear usuarios',
    description: 'Crea un usuario nuevo.',
  })
  @ApiOkResponse({
    description: 'Usuario guardado',
    type: UserReadDto,
  })
  @ApiResponse({ status: 400, description: 'Error de validación' })
  async save(@Body() dto: UserWriteDto) {
    const user = await this.createUser.execute(dto.toDomain());

    return user.toRead();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener usuario',
    description: 'Obtiene la información de un usuario',
  })
  @ApiOkResponse({
    description: 'Usuarios encontrado',
    type: UserReadDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario inexistente' })
  async getById(@Param('id') id: number) {
    const user = await this.getUserById.execute(id);

    if (user === undefined) {
      throw new NotFoundException('Usuario inexistente');
    }

    return user.toRead();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza la información de un usuario nuevo.',
  })
  @ApiOkResponse({
    description: 'Usuario actualizado',
    type: UserReadDto,
  })
  @ApiResponse({ status: 400, description: 'Error de validación' })
  @ApiResponse({ status: 404, description: 'El usuario no existe' })
  @UseInterceptors(IdInterceptor)
  async update(@Param('id') id: number, @Body() data: UserWriteDto) {
    const user = await this.updateUser.execute(id, data.toDomain());

    if (!user) {
      throw new NotFoundException('Usuario inexistente');
    }

    return user.toRead();
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina la información de un usuario nuevo.',
  })
  @ApiOkResponse({
    description: 'Usuario elimado',
    type: UserReadDto,
  })
  @ApiResponse({ status: 404, description: 'El usuario no existe' })
  async delete(@Param('id') id: number) {
    const user = await this.deleteUser.execute(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user.toRead();
  }
}
