import postgres from "postgres";

import { sql } from "@config/db";

export interface IUrlRepo {
  selectInitialUrlByShortUrl(
    shortUrl: string,
  ): Promise<IInitialUrl | undefined>;

  selectUrlRecordByShortUrl(shortUrl: string): Promise<IUrl | undefined>;

  insertUrlRecord(
    shortUrl: string,
    initialUrl: string,
    dateCreated: string,
  ): Promise<IUrl | undefined>;
}

export class UrlRepo implements IUrlRepo {
  async selectInitialUrlByShortUrl(shortUrl: string) {
    try {
      const [record] = await sql<IInitialUrl[]>`
        SELECT initial_url
        FROM urls
        WHERE short_url = ${shortUrl}`;

      return record;
    } catch (error) {
      console.error(error);
    }
  }

  async selectUrlRecordByShortUrl(shortUrl: string) {
    try {
      const [record] = await sql<IUrl[]>`
        SELECT short_url, initial_url, date_created
        FROM urls
        WHERE short_url = ${shortUrl}`;

      return record;
    } catch (error) {
      console.error(error);
    }
  }

  async insertUrlRecord(
    shortUrl: string,
    initialUrl: string,
    dateCreated: string,
  ) {
    try {
      const [record] = await sql<IUrl[]>`
        INSERT INTO urls (short_url, initial_url, date_created)
        VALUES (${shortUrl}, ${initialUrl}, ${dateCreated})
        RETURNING short_url, initial_url, date_created`;

      return record;
    } catch (error) {
      if (error instanceof postgres.PostgresError) {
        if (error.code === "23505") {
          return undefined;
        }
      }
      console.error(error);
    }
  }
}
