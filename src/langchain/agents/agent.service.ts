import { Injectable, Logger } from '@nestjs/common';
import { LlmFactoryService } from '../llm/llm-factory.service';
import { ToolsService } from '../tools/tools.service';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    private readonly llmFactory: LlmFactoryService,
    private readonly toolsService: ToolsService,
  ) {}

  async invoke(input: string): Promise<string> {
    try {
      const { createReactAgent } = require('langchain/agents');
      const { AgentExecutor } = require('langchain/agents');

      const llm = this.llmFactory.getLlm();
      const tools = this.toolsService.getDefaultTools();

      const { ChatPromptTemplate } = require('@langchain/core/prompts');
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', "You are a helpful assistant. Answer the user's question."],
        ['human', '{input}'],
      ]);

      const agent = createReactAgent({ llm, tools, prompt });
      const agentExecutor = new AgentExecutor({ agent, tools });
      const result = await agentExecutor.invoke({ input });
      return result.output ?? String(result);
    } catch (error) {
      this.logger.error('Agent invocation failed, falling back to direct LLM', error);
      // Fallback to direct LLM call
      const llm = this.llmFactory.getLlm();
      const response = await llm.invoke(input);
      return typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);
    }
  }
}
