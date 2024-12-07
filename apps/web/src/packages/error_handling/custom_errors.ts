type CustomGraphlQLFetchErrorConstructor = {
  message: string;
  statusCode: number;
};

export class CustomGraphlQLFetchError
  extends Error
  implements CustomGraphlQLFetchErrorConstructor
{
  public statusCode: number;
  constructor(statusCode: number) {
    super("CustomGraphlQLFetchError");
    this.name = "CustomGraphlQLFetchError";
    this.statusCode = statusCode;
  }
}
