const Database = require("better-sqlite3");
export const db = new Database("./dev.db");

export async function createDbPath(dbname) {
  const db1 = new Database(`./${dbname}.db`);
  return db1;
}
