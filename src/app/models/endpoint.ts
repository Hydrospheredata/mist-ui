export class Endpoint {
  public name: string;
  public lang: string;
  public tags: string[];
  public execute: string;

  constructor(endpointInfo: Object) {
    this.name = endpointInfo['name'];
    this.lang = endpointInfo['lang'];
    this.tags = endpointInfo['tags'];
    this.execute = JSON.stringify(endpointInfo['execute']);
  }

  executeExample() {
    let execute = JSON.parse(this.execute)
    let generatedObject: object = {};
    for (let key in execute) {
        let newObj: object = {};
        newObj[key] = this.make(execute[key]);
        Object.assign(generatedObject, newObj);
    }
    return JSON.stringify(generatedObject)
  }

  private make(paramType) {
    let t = paramType.type
    let args = paramType.args
    if (t == 'MString') {
        return 'string';
    }
    if (t == 'MAny') {
        return {};
    }
    if (t == 'MMap') {
        var newObj = {};
        newObj[this.make(args[0])] = this.make(args[1]);
        return newObj;
    }
    if (t == 'MInt') {
        return Math.round(Math.random() * 10);
    }
    if (t == 'MDouble') {
        return Math.random() * 10;
    }
    if (t == 'MList') {
        var list = [];
        list.push(this.make(args[0]));
        return list;
    }
    if (t == 'MOption') {
        return this.make(args[0]);
    }
  }
}
