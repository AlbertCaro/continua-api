import { DataSourceOptions } from 'typeorm';
import { Usuario } from './entity/user.entity';

export const DataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'picapapas',
    database: 'continua',
    synchronize: true,
    entities: [Usuario]
}