export class Settings {
  public static VALIDATION_RULES = {
    text: /[a-zA-Z]+/,
    number: /[0-9]+/,
    textAndNumber: /[a-zA-Z0-9]+/,
    name: /[a-zA-Z_-]+/
  };
}
