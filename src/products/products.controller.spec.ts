import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import * as httpMocks from 'node-mocks-http';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { UsersService } from '../users/users.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = new UserEntity();
  mockRequest.user = {
    id: 1,
    name: 'Nguyen Quang Huy',
  };

  const mockProduct = {
    body: 'nivea',
    createdAt: new Date(),
    creator: mockRequest.user,
  };

  const mockProductService = {
    createProduct: jest.fn().mockImplementation((product: ProductEntity) => {
      return {
        ...product,
        id: 1,
      };
    }),
  };

  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', () => {
    expect(controller.create(mockProduct)).toEqual({
      ...mockProduct,
      id: expect.any(Number),
    });
  });
});
