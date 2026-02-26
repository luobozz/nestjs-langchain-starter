/**
 * Document ingestion script.
 * Usage: pnpm ingest
 *
 * This script loads documents from ./data directory, splits them,
 * and adds them to the configured vector store.
 */

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log('Starting document ingestion...');
  console.log('Add your document loading logic here.');
  console.log('Example: Load PDFs from ./data, split, embed, and store.');
  console.log('Ingestion placeholder completed.');
}

main().catch(console.error);
