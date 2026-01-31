import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { CreateUser } from './domain/usecases/user/create-user.usecase';
import { GetAllUsers } from './domain/usecases/user/get-all-users.usecase';
import { User } from './domain/models/user.model';
import { Role } from './domain/models/role.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle("Continua Cursos backend")
    .setDescription("API para administrar los cursos de Continua UDG")
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const createUser = app.get(CreateUser)
  const getAllUsers = app.get(GetAllUsers)

  const users = await getAllUsers.execute()

  if (users.length === 0) {
    const user = new User()

    user.email = "albertcaronava@gmail.com"
    user.names = "Alberto"
    user.lastName = "Caro Navarro"
    user.password = "hola123"
    user.role = Role.ADMINISTRATOR
    user.code = 215818158

    await createUser.execute(user)
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
