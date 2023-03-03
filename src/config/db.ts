import postgres from "postgres";

const sql = postgres("username:password@host:port/database", {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  transform: postgres.toCamel,
});

export { sql };
