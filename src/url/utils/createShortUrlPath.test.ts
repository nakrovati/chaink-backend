import { describe, test, expect } from "bun:test";
import createShortUrlPath from "./createShortUrlPath";

describe("Util createShortUrlPath", () => {
  test("Creates a seven-character random string of numbers and letters", () => {
    const shortURLPathRegexp = /^\w{7}$/;

    const randomPath = createShortUrlPath();
    const result = shortURLPathRegexp.test(randomPath);

    expect(result).toBe(true);
  });
});
