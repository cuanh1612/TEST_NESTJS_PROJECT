import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ProductEntity } from '../src/products/entities/product.entity';
import { ProductsModule } from '../src/products/products.module';

describe('Product (e2e)', () => {
  let app: INestApplication;
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

    find: jest.fn().mockImplementation(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(getRepositoryToken(ProductEntity))
      .useValue(mockProductsRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/products (POST)', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        body: 'body',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          body: 'body',
        });
      });
  });

  it('/products (POST) ---> on error Forbidden', () => {
    return request(app.getHttpServer()).post('/products').expect(403).expect({
      statusCode: 403,
      message: 'Forbidden',
    });
  });
});
