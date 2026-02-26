import { Injectable, Logger } from '@nestjs/common';
import { ChainService } from '../chains/chain.service';

export interface EvalResult {
  input: string;
  output: string;
  score?: number;
  latencyMs: number;
}

@Injectable()
export class EvalService {
  private readonly logger = new Logger(EvalService.name);

  constructor(private readonly chainService: ChainService) {}

  async runEval(
    testCases: Array<{ input: string; expected?: string }>,
  ): Promise<EvalResult[]> {
    const results: EvalResult[] = [];

    for (const testCase of testCases) {
      const start = Date.now();
      try {
        const output = await this.chainService.invoke(testCase.input);
        const latencyMs = Date.now() - start;

        results.push({
          input: testCase.input,
          output,
          latencyMs,
        });

        this.logger.log(`Eval: "${testCase.input.substring(0, 50)}" -> ${latencyMs}ms`);
      } catch (error) {
        this.logger.error(`Eval failed for: ${testCase.input}`, error);
        results.push({
          input: testCase.input,
          output: `Error: ${(error as Error).message}`,
          latencyMs: Date.now() - start,
        });
      }
    }

    return results;
  }
}
