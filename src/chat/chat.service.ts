import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { ChainService } from '../langchain/chains/chain.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chainService: ChainService) {}

  async chat(dto: ChatRequestDto): Promise<string> {
    return this.chainService.invoke(dto.message, dto.system);
  }

  streamChat(
    message: string,
    // Reserved for future session-based memory integration
    _sessionId?: string,
    system?: string,
  ): Observable<MessageEvent> {
    const generator = this.chainService.stream(message, system);

    return new Observable((subscriber) => {
      (async () => {
        try {
          for await (const chunk of generator) {
            subscriber.next({ data: chunk } as MessageEvent);
          }
          subscriber.next({ data: '[DONE]' } as MessageEvent);
          subscriber.complete();
        } catch (err) {
          subscriber.error(err);
        }
      })();
    });
  }
}
