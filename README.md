# NestJS LangChain Starter

A production-ready NestJS starter with a full LangChain integration layer, supporting multiple LLM providers (OpenAI, Azure OpenAI, Anthropic, Ollama).

## Features

- **NestJS 10** application skeleton with TypeScript
- **LangChain** integration layer:
  - LLM factory / provider router (OpenAI, Azure OpenAI, Anthropic, Ollama)
  - Prompt templates (chat, conversational, RAG)
  - Tools (calculator, current time – easily extensible)
  - In-memory buffer memory with session management
  - Vector store abstraction (in-memory by default, Qdrant optional)
  - Chain service (invoke + streaming)
  - Agent service with tool-use
  - Eval skeleton
- **ChatModule** – REST `POST /chat` and SSE `GET /chat/stream`
- **HealthModule** – `GET /health` via `@nestjs/terminus`
- **Config module** with Joi schema validation
- **Docker Compose** for optional Qdrant + Redis
- Tests skeleton (unit + e2e)

## Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm

## Setup

```bash
# Install dependencies
pnpm install

# Copy env file and fill in your API keys
cp .env.example .env
```

Edit `.env` and set at minimum:
- `LLM_PROVIDER` (default: `openai`)
- The relevant API key for your chosen provider

## Running

```bash
# Development (watch mode)
pnpm start:dev

# Production
pnpm build
pnpm start:prod
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health greeting |
| GET | `/health` | Server health check |
| POST | `/chat` | Send a message, receive full response |
| GET | `/chat/stream` | SSE streaming endpoint |

### POST /chat

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is LangChain?"}'
```

Response:
```json
{ "response": "LangChain is a framework for building LLM-powered applications..." }
```

### GET /chat/stream

```bash
curl -N "http://localhost:3000/chat/stream?message=Tell+me+a+joke"
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment |
| `PORT` | `3000` | HTTP port |
| `LLM_PROVIDER` | `openai` | Provider: `openai`, `azure`, `anthropic`, `ollama` |
| `OPENAI_API_KEY` | – | OpenAI API key |
| `OPENAI_MODEL` | `gpt-4o-mini` | OpenAI model name |
| `OPENAI_TEMPERATURE` | `0` | Sampling temperature |
| `AZURE_OPENAI_API_KEY` | – | Azure OpenAI key |
| `AZURE_OPENAI_ENDPOINT` | – | Azure OpenAI endpoint |
| `AZURE_OPENAI_DEPLOYMENT` | – | Azure deployment name |
| `AZURE_OPENAI_API_VERSION` | `2024-02-01` | Azure API version |
| `ANTHROPIC_API_KEY` | – | Anthropic API key |
| `ANTHROPIC_MODEL` | `claude-3-haiku-20240307` | Anthropic model |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `llama3` | Ollama model name |
| `VECTOR_STORE` | `memory` | `memory` or `qdrant` |
| `QDRANT_URL` | `http://localhost:6333` | Qdrant URL |
| `QDRANT_COLLECTION` | `documents` | Qdrant collection name |
| `REDIS_URL` | `redis://localhost:6379` | Redis URL (for memory) |

## Optional Services (Docker Compose)

```bash
# Start Qdrant vector store
docker compose --profile vector up -d

# Start Redis
docker compose --profile cache up -d
```

## Scripts

```bash
# Run document ingestion
pnpm ingest

# Run seed data
pnpm seed
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:cov
```

## Architecture

```
src/
├── config/          # App config + env validation
├── langchain/       # LangChain integration layer
│   ├── llm/         # LLM factory (OpenAI/Azure/Anthropic/Ollama)
│   ├── prompts/     # Prompt templates
│   ├── tools/       # LangChain tools
│   ├── memory/      # Chat memory (buffer)
│   ├── vectorstore/ # Vector store abstraction
│   ├── chains/      # Chain compositions
│   ├── agents/      # Agent executor
│   └── eval/        # Evaluation skeleton
├── chat/            # Chat feature module
│   ├── dto/         # Request DTOs
│   ├── chat.controller.ts
│   └── chat.service.ts
└── health/          # Health check module
```
