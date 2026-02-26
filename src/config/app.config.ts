import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  llmProvider: process.env.LLM_PROVIDER ?? 'openai',
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? '',
    model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE ?? '0'),
  },
  azure: {
    apiKey: process.env.AZURE_OPENAI_API_KEY ?? '',
    endpoint: process.env.AZURE_OPENAI_ENDPOINT ?? '',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? '',
    apiVersion: process.env.AZURE_OPENAI_API_VERSION ?? '2024-02-01',
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY ?? '',
    model: process.env.ANTHROPIC_MODEL ?? 'claude-3-haiku-20240307',
  },
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL ?? 'llama3',
  },
  vectorStore: process.env.VECTOR_STORE ?? 'memory',
  qdrant: {
    url: process.env.QDRANT_URL ?? 'http://localhost:6333',
    collection: process.env.QDRANT_COLLECTION ?? 'documents',
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
}));
