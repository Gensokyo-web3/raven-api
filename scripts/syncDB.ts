import { DBConnection } from '../db.ts';
import { Database } from '../deps.ts';
import * as models from '../models.ts';

try {
  const db = new Database(DBConnection);
  const allModels = Object.values(models)
  db.link(allModels);
  await db.sync({ drop: true });
  Deno.exit(0);
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
