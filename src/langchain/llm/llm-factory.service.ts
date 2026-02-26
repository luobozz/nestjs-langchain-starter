import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

@Injectable()
export class LlmFactoryService {
  private readonly logger = new Logger(LlmFactoryService.name);
  private llm: BaseChatModel | null = null;

  constructor(private readonly configService: ConfigService) {}

  getLlm(): BaseChatModel {
    if (this.llm) return this.llm;

    const provider = this.configService.get<string>('app.llmProvider', 'openai');
    this.logger.log(`Initializing LLM provider: ${provider}`);

    switch (provider) {
      case 'openai':
        this.llm = this.createOpenAI();
        break;
      case 'azure':
        this.llm = this.createAzureOpenAI();
        break;
      case 'anthropic':
        this.llm = this.createAnthropic();
        break;
      case 'ollama':
        this.llm = this.createOllama();
        break;
      default:
        this.logger.warn(`Unknown LLM provider "${provider}", falling back to OpenAI`);
        this.llm = this.createOpenAI();
    }

    return this.llm;
  }

  private createOpenAI(): BaseChatModel {
    // Dynamic import to avoid hard dependency at startup
    const { ChatOpenAI } = require('@langchain/openai');
    return new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('app.openai.apiKey'),
      modelName: this.configService.get<string>('app.openai.model', 'gpt-4o-mini'),
      temperature: this.configService.get<number>('app.openai.temperature', 0),
    });
  }

  private createAzureOpenAI(): BaseChatModel {
    const { AzureChatOpenAI } = require('@langchain/openai');
    return new AzureChatOpenAI({
      azureOpenAIApiKey: this.configService.get<string>('app.azure.apiKey'),
      azureOpenAIApiInstanceName: this.configService.get<string>('app.azure.endpoint'),
      azureOpenAIApiDeploymentName: this.configService.get<string>('app.azure.deployment'),
      azureOpenAIApiVersion: this.configService.get<string>('app.azure.apiVersion', '2024-02-01'),
    });
  }

  private createAnthropic(): BaseChatModel {
    const { ChatAnthropic } = require('@langchain/anthropic');
    return new ChatAnthropic({
      anthropicApiKey: this.configService.get<string>('app.anthropic.apiKey'),
      model: this.configService.get<string>('app.anthropic.model', 'claude-3-haiku-20240307'),
    });
  }

  private createOllama(): BaseChatModel {
    const { ChatOllama } = require('@langchain/community/chat_models/ollama');
    return new ChatOllama({
      baseUrl: this.configService.get<string>('app.ollama.baseUrl', 'http://localhost:11434'),
      model: this.configService.get<string>('app.ollama.model', 'llama3'),
    });
  }
}
