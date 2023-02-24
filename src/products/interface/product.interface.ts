import { UserEntity } from '../../users/entities/user.entity';

export interface Product {
  id?: number;
  body?: string;
  createdAt: Date;
  creator?: UserEntity;
}
