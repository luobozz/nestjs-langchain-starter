import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().default(3000),
  LLM_PROVIDER: Joi.string()
    .valid('openai', 'azure', 'anthropic', 'ollama')
    .default('openai'),
  OPENAI_API_KEY: Joi.string().allow('').default(''),
  OPENAI_MODEL: Joi.string().default('gpt-4o-mini'),
  OPENAI_TEMPERATURE: Joi.number().min(0).max(2).default(0),
  AZURE_OPENAI_API_KEY: Joi.string().allow('').default(''),
  AZURE_OPENAI_ENDPOINT: Joi.string().allow('').default(''),
  AZURE_OPENAI_DEPLOYMENT: Joi.string().allow('').default(''),
  AZURE_OPENAI_API_VERSION: Joi.string().default('2024-02-01'),
  ANTHROPIC_API_KEY: Joi.string().allow('').default(''),
  ANTHROPIC_MODEL: Joi.string().default('claude-3-haiku-20240307'),
  OLLAMA_BASE_URL: Joi.string().default('http://localhost:11434'),
  OLLAMA_MODEL: Joi.string().default('llama3'),
  VECTOR_STORE: Joi.string().valid('qdrant', 'memory').default('memory'),
  QDRANT_URL: Joi.string().default('http://localhost:6333'),
  QDRANT_COLLECTION: Joi.string().default('documents'),
  REDIS_URL: Joi.string().default('redis://localhost:6379'),
});
