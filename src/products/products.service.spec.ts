import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductsRepository = {
    create: jest.fn().mockImplementation((mockProduct) => {
      return {
        ...mockProduct,
        id: 1,
      };
    }),

    save: jest.fn().mockImplementation((mockProduct) => {
      return {
        ...mockProduct,
        id: 1,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create new product', () => {
    expect(service.createProduct).toBeDefined();
  });
});
