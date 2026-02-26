import { Injectable } from '@nestjs/common';
import { DynamicTool } from '@langchain/core/tools';

@Injectable()
export class ToolsService {
  getDefaultTools(): DynamicTool[] {
    return [
      new DynamicTool({
        name: 'current_time',
        description: 'Returns the current date and time in ISO format.',
        func: async () => new Date().toISOString(),
      }),
      new DynamicTool({
        name: 'calculator',
        description:
          'Evaluates a simple arithmetic expression. Input should be a valid math expression like "2 + 2" or "10 * 5".',
        func: async (input: string) => {
          try {
            // Simple safe eval for arithmetic only
            const sanitized = input.replace(/[^0-9+\-*/.() ]/g, '');
            const result = Function(`'use strict'; return (${sanitized})`)();
            return String(result);
          } catch {
            return 'Error: Could not evaluate expression';
          }
        },
      }),
    ];
  }
}
