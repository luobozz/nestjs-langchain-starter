import { Module } from '@nestjs/common';
import { LlmFactoryService } from './llm/llm-factory.service';
import { ChainService } from './chains/chain.service';
import { AgentService } from './agents/agent.service';
import { MemoryService } from './memory/memory.service';
import { VectorStoreService } from './vectorstore/vectorstore.service';
import { PromptsService } from './prompts/prompts.service';
import { ToolsService } from './tools/tools.service';
import { EvalService } from './eval/eval.service';

@Module({
  providers: [
    LlmFactoryService,
    ChainService,
    AgentService,
    MemoryService,
    VectorStoreService,
    PromptsService,
    ToolsService,
    EvalService,
  ],
  exports: [
    LlmFactoryService,
    ChainService,
    AgentService,
    MemoryService,
    VectorStoreService,
    PromptsService,
    ToolsService,
    EvalService,
  ],
})
export class LangchainModule {}
