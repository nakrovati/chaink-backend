declare interface IUrl {
  shortUrl: string;
  initialUrl: string;
  dateCreated: string;
}

declare type IInitialUrl = Pick<IUrl, "initialUrl">;
