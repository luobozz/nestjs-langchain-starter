import { Injectable } from '@nestjs/common';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { BaseMessage } from '@langchain/core/messages';

@Injectable()
export class MemoryService {
  private sessions = new Map<string, ChatMessageHistory>();

  getOrCreateSession(sessionId: string): ChatMessageHistory {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, new ChatMessageHistory());
    }
    return this.sessions.get(sessionId)!;
  }

  createBufferMemory(sessionId?: string): BufferMemory {
    const history = sessionId
      ? this.getOrCreateSession(sessionId)
      : new ChatMessageHistory();

    return new BufferMemory({
      chatHistory: history,
      returnMessages: true,
      memoryKey: 'chat_history',
    });
  }

  async clearSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }

  async getHistory(sessionId: string): Promise<BaseMessage[]> {
    const history = this.sessions.get(sessionId);
    if (!history) return [];
    return history.getMessages();
  }
}
