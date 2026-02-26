import { Injectable } from '@nestjs/common';
import { DynamicTool } from '@langchain/core/tools';

@Injectable()
export class ToolsService {
  /**
   * Safe arithmetic evaluator – no eval/Function constructor used.
   * Supports +, -, *, / and parentheses with integer/decimal numbers.
   */
  private safeEval(expr: string): number {
    const tokens = expr.match(/\d+\.?\d*|[+\-*/()]/g);
    if (!tokens) throw new Error('Invalid expression');
    let pos = 0;

    const parseExpr = (): number => {
      let left = parseTerm();
      while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
        const op = tokens[pos++];
        const right = parseTerm();
        left = op === '+' ? left + right : left - right;
      }
      return left;
    };

    const parseTerm = (): number => {
      let left = parseFactor();
      while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
        const op = tokens[pos++];
        const right = parseFactor();
        if (op === '/' && right === 0) throw new Error('Division by zero');
        left = op === '*' ? left * right : left / right;
      }
      return left;
    };

    const parseFactor = (): number => {
      if (tokens[pos] === '(') {
        pos++; // consume '('
        const val = parseExpr();
        if (tokens[pos] !== ')') throw new Error('Missing closing parenthesis');
        pos++; // consume ')'
        return val;
      }
      const num = parseFloat(tokens[pos]);
      if (isNaN(num)) throw new Error(`Unexpected token: ${tokens[pos]}`);
      pos++;
      return num;
    };

    const result = parseExpr();
    if (pos !== tokens.length) throw new Error('Unexpected tokens remaining');
    return result;
  }

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
            return String(this.safeEval(input));
          } catch {
            return 'Error: Could not evaluate expression';
          }
        },
      }),
    ];
  }
}
