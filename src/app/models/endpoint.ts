export class Endpoint {
  public name: string;
  public lang: string;
  public tags: string[];
  public execute: string;

  constructor(endpointInfo: Object) {
    this.name = endpointInfo['name'];
    this.email = endpointInfo['lang'];
    this.tags = endpointInfo['tags'];
    this.execute = JSON.stringify(endpointInfo['execute'];)
  }
}
