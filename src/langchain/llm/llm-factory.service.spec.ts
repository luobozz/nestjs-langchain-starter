import { Test, TestingModule } from '@nestjs/testing';
import { LlmFactoryService } from './llm-factory.service';
import { ConfigService } from '@nestjs/config';

describe('LlmFactoryService', () => {
  let service: LlmFactoryService;
  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string, defaultValue?: any) => {
      const config: Record<string, any> = {
        'app.llmProvider': 'openai',
        'app.openai.apiKey': 'test-key',
        'app.openai.model': 'gpt-4o-mini',
        'app.openai.temperature': 0,
      };
      return config[key] ?? defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LlmFactoryService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<LlmFactoryService>(LlmFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an LLM instance', () => {
    const llm = service.getLlm();
    expect(llm).toBeDefined();
  });
});
