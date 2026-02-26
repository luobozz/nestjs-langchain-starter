import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Document } from '@langchain/core/documents';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { FakeEmbeddings } from '@langchain/core/utils/testing';

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);
  private vectorStore: MemoryVectorStore | null = null;

  constructor(private readonly configService: ConfigService) {}

  async getVectorStore(): Promise<MemoryVectorStore> {
    if (!this.vectorStore) {
      this.logger.log('Initializing in-memory vector store');
      this.vectorStore = new MemoryVectorStore(new FakeEmbeddings());
    }
    return this.vectorStore;
  }

  async addDocuments(documents: Document[]): Promise<void> {
    const store = await this.getVectorStore();
    await store.addDocuments(documents);
    this.logger.log(`Added ${documents.length} documents to vector store`);
  }

  async similaritySearch(query: string, k = 4): Promise<Document[]> {
    const store = await this.getVectorStore();
    return store.similaritySearch(query, k);
  }
}
