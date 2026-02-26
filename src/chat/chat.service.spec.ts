import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChainService } from '../langchain/chains/chain.service';

describe('ChatService', () => {
  let service: ChatService;
  const mockChainService = {
    invoke: jest.fn().mockResolvedValue('Hello! I am an AI assistant.'),
    stream: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: ChainService, useValue: mockChainService },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a chat response', async () => {
    const result = await service.chat({ message: 'Hello' });
    expect(result).toBe('Hello! I am an AI assistant.');
    expect(mockChainService.invoke).toHaveBeenCalledWith('Hello', undefined);
  });
});
