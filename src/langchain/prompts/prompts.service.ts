import { Injectable } from '@nestjs/common';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';

@Injectable()
export class PromptsService {
  getChatPrompt(systemMessage = 'You are a helpful assistant.'): ChatPromptTemplate {
    return ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(systemMessage),
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);
  }

  getConversationalPrompt(): ChatPromptTemplate {
    return ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(
        'You are a helpful assistant. Use the conversation history to provide contextual responses.',
      ),
      ['placeholder', '{chat_history}'],
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);
  }

  getRagPrompt(): ChatPromptTemplate {
    return ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `You are a helpful assistant. Answer the question based on the context provided.
Context: {context}

If you cannot find the answer in the context, say so clearly.`,
      ),
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);
  }
}
