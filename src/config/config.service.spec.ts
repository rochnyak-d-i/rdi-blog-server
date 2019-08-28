import { Test, TestingModule } from '@nestjs/testing';
import { Schema } from 'convict';
import { ConfigService } from './config.service';

describe.only('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const schema: Schema<any> = {
      foo: {default: 'bar'}
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService,
        useValue: new ConfigService(schema)
      }],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return valid value', () => {
    expect(service.get('foo')).toBe('bar');
  });

  it('should be throw error if trying get unknow property', () => {
    expect(() => service.get('unknown')).toThrow();
  });
});
