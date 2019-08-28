import { Test, TestingModule } from '@nestjs/testing';
import { FileFsService } from './file.fs.service';

describe('FileFsService', () => {
  let service: FileFsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileFsService],
    }).compile();

    service = module.get<FileFsService>(FileFsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
