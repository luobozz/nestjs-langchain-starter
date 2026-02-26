import { Injectable, Logger } from '@nestjs/common';
import { LlmFactoryService } from '../llm/llm-factory.service';
import { PromptsService } from '../prompts/prompts.service';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class ChainService {
  private readonly logger = new Logger(ChainService.name);

  constructor(
    private readonly llmFactory: LlmFactoryService,
    private readonly prompts: PromptsService,
  ) {}

  async invoke(input: string, systemMessage?: string): Promise<string> {
    const llm = this.llmFactory.getLlm();
    const prompt = this.prompts.getChatPrompt(systemMessage);
    const parser = new StringOutputParser();

    const chain = prompt.pipe(llm).pipe(parser);

    this.logger.debug(`Invoking chain with input: ${input.substring(0, 100)}...`);
    const result = await chain.invoke({ input });
    return result;
  }

  async *stream(input: string, systemMessage?: string): AsyncGenerator<string> {
    const llm = this.llmFactory.getLlm();
    const prompt = this.prompts.getChatPrompt(systemMessage);
    const parser = new StringOutputParser();

    const chain = prompt.pipe(llm).pipe(parser);

    this.logger.debug(`Streaming chain with input: ${input.substring(0, 100)}...`);
    const stream = await chain.stream({ input });

    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
