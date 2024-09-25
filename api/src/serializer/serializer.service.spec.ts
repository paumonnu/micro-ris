import { Test, TestingModule } from '@nestjs/testing';
import { SerializerService } from './serializer.service';

describe('SerializerService', () => {
  let service: SerializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerializerService],
    }).compile();

    service = module.get<SerializerService>(SerializerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
