import { STATUS_CODE } from "@/types/global.d.js";
import { UrlRepo } from "./urlRepo";
import { UrlService } from "./urlService";
import { isValidShortUrlPath } from "./utils/index";
import {
  redirectToDetailsPage,
  redirectToInitialSite,
} from "@/redirectService";

const { BACKEND_URL } = process.env;

const urlRepo = new UrlRepo();
const urlService = new UrlService(urlRepo);

export async function resolveShortUrl(shortUrlPath: string) {
  // If the path is valid, it redirects to the original site.
  // If path is not valid or has a '+' at the end, it redirects to the details page.
  if (!isValidShortUrlPath(shortUrlPath)) {
    return redirectToDetailsPage(shortUrlPath);
  }

  try {
    const initialUrl = await urlService.findInitialUrl(shortUrlPath);

    if (!initialUrl) {
      return redirectToDetailsPage(shortUrlPath);
    }

    return redirectToInitialSite(initialUrl);
  } catch (error) {
    redirectToDetailsPage(shortUrlPath);
    console.error(error);
  }
}

export async function getUrlData(shortUrlPath: string) {
  const shortUrl = `${BACKEND_URL}/${shortUrlPath}`;

  if (!isValidShortUrlPath(shortUrlPath)) {
    return new Response(`Short URL ${shortUrl} isn't valid`, {
      status: STATUS_CODE.BAD_REQUEST,
    });
  }

  try {
    const urlRecord = await urlService.findUrlRecord(shortUrlPath);

    if (!urlRecord) {
      return new Response(`Short URL ${shortUrl} doesn't exist`, {
        status: STATUS_CODE.NOT_FOUND,
      });
    }

    return urlRecord;
  } catch (error) {
    console.error(error);
  }
}

export async function shortenUrl(body: {
  initialUrl: string;
  dateCreated: string;
}) {
  const { initialUrl, dateCreated } = body;

  try {
    const addedUrlRecord = await urlService.addShortUrl(
      initialUrl,
      dateCreated,
    );

    return addedUrlRecord;
  } catch (error) {
    console.error(error);
  }
}
