import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';

export const appDbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'huy16120101',
  database: 'test_nestjs_project',
  entities: [ProductEntity, UserEntity],
  synchronize: true,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  logging: true,
};
