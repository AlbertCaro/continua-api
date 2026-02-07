import { DataSourceOptions } from 'typeorm';
import { Usuario } from './entity/user.entity';
import { Curso } from './entity/course.entity';
import { Inscripcion } from './entity/enrollment.entity';
import { Pago } from './entity/payment.entity';
import { Comprobante } from './entity/receipt.entity';

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: 'picapapas',
  database: 'continua',
  synchronize: true,
  entities: [Usuario, Curso, Inscripcion, Pago, Comprobante],
};
