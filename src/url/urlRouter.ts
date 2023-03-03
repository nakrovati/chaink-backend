import { Elysia, t } from "elysia";

import { resolveShortUrl, getUrlData, shortenUrl } from "./urlController";

const urlRouter = (app: Elysia) =>
  app
    .get("/:shortUrlPath", ({ params: { shortUrlPath } }) =>
      resolveShortUrl(shortUrlPath),
    )
    .group("/url", (app) =>
      app
        .get("/:shortUrlPath", ({ params: { shortUrlPath } }) =>
          getUrlData(shortUrlPath),
        )
        .post("/", ({ body }) => shortenUrl(body), {
          schema: {
            body: t.Object({
              initialUrl: t.String(),
              dateCreated: t.String(),
            }),
          },
        }),
    );

export default urlRouter;
