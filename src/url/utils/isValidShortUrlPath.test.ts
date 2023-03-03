import { describe, test, expect } from "bun:test";
import isValidShortUrlPath from "./isValidShortUrlPath";

describe("Util isValidShortUrlPath", () => {
  test("When short URL path is valid, then returns true", () => {
    const shortUrlPath = "j4t1Pln";

    const result = isValidShortUrlPath(shortUrlPath);

    expect(result).toBe(true);
  });

  test("When short URL path isn't valid, then returns false", () => {
    const shortUrlPath = "wrong-short-url-path";

    const result = isValidShortUrlPath(shortUrlPath);

    expect(result).toBe(false);
  });
});
