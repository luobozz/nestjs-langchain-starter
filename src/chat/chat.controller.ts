import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Sse,
  MessageEvent,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * POST /chat
   * Send a message and get a complete response.
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async chat(@Body() dto: ChatRequestDto) {
    const response = await this.chatService.chat(dto);
    return { response };
  }

  /**
   * GET /chat/stream?message=...&sessionId=...
   * Server-Sent Events streaming endpoint.
   */
  @Sse('stream')
  stream(
    @Query('message') message: string,
    @Query('sessionId') sessionId?: string,
    @Query('system') system?: string,
  ): Observable<MessageEvent> {
    return this.chatService.streamChat(message, sessionId, system);
  }
}
