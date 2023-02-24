import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.products)
  creator: UserEntity;
}
