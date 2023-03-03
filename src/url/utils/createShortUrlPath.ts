function createRandomPath(): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let outputString = "";

  for (let i = 0; i < 7; i++) {
    outputString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return outputString;
}

export default createRandomPath;
