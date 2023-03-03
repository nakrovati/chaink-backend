export default function isValidShortUrlPath(shortUrlPath: string) {
  const regexpShortUrlPath = /^\w{7}$/;

  return regexpShortUrlPath.test(shortUrlPath);
}
