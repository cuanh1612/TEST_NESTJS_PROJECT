import { ProductEntity } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (productEntity) => productEntity.creator)
  products: ProductEntity[];
}
