import LRUCache from "lru-cache";

import { DATES } from "@/types/global.d.js";
import { IUrlRepo } from "./urlRepo";
import { createShortUrlPath } from "./utils/index";

const { BACKEND_URL } = process.env;

const cahceOptions = {
  max: 5000,
  ttl: DATES.WEEK,
};
const initialUrlCache = new LRUCache<string, string>(cahceOptions);

export class UrlService {
  urlRepo: IUrlRepo;

  constructor(urlRepo: IUrlRepo) {
    this.urlRepo = urlRepo;
  }

  async findInitialUrl(shortUrlPath: string) {
    const shortUrl = `${BACKEND_URL}/${shortUrlPath}`;

    const cachedInitialUrl = initialUrlCache.get(shortUrl);

    if (cachedInitialUrl && typeof cachedInitialUrl === "string") {
      return cachedInitialUrl;
    }

    const urlRecord = await this.urlRepo.selectInitialUrlByShortUrl(shortUrl);

    if (!urlRecord) {
      return;
    }

    initialUrlCache.set(shortUrl, urlRecord.initialUrl);

    return urlRecord.initialUrl;
  }

  async findUrlRecord(shortUrlPath: string) {
    const shortUrl = `${BACKEND_URL}/${shortUrlPath}`;

    const urlRecord = await this.urlRepo.selectUrlRecordByShortUrl(shortUrl);

    return urlRecord;
  }

  async addShortUrl(initialUrl: string, dateCreated: string) {
    let shortUrl: string;
    let urlRecord: IUrl | undefined;

    do {
      shortUrl = `${BACKEND_URL}/${createShortUrlPath()}`;
      urlRecord = await this.urlRepo.insertUrlRecord(
        shortUrl,
        initialUrl,
        dateCreated,
      );
    } while (!urlRecord);

    return urlRecord;
  }
}
