const { FRONTEND_URL } = process.env;

export function redirectToInitialSite(initialUrl: string) {
  return Response.redirect(initialUrl);
}

export function redirectToDetailsPage(shortUrlPath: string) {
  const detailsPage = `${FRONTEND_URL}/${shortUrlPath}`;

  return Response.redirect(detailsPage);
}
