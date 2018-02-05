export class FunctionInfo {
  public name: string;
  public lang: string;
  // deprecated
  public tags: string[];
  public execute: string;
  public className: string;
  public defaultContext: string;
  public file: File;
  public path: string;

  constructor(functionInfo: Object) {
    this.name = functionInfo['name'];
    this.lang = functionInfo['lang'];
    // deprecated
    this.tags = functionInfo['tags'];
    this.execute = JSON.stringify(functionInfo['execute']) || null;
    this.defaultContext = functionInfo['defaultContext'];
    this.className = functionInfo['className'];
    this.file = functionInfo['file'];
    this.path = functionInfo['path'];
  }

  executeExample() {
    let execute = JSON.parse(this.execute);
    let generatedObject: object = {};
    for (let key in execute) {
        let newObj: object = {};
        newObj[key] = this.make(execute[key]);
        Object.assign(generatedObject, newObj);
    }
    if (Object.keys(generatedObject).length === 0) {
      return '';
    } else {
      return JSON.stringify(generatedObject, null, "\t");
    }
  }

  private make(paramType) {
    let t = paramType.type;
    let args = paramType.args;
    if (t == 'MString') {
        return 'string';
    }
    if (t == 'MAny') {
        return {};
    }
    if (t == 'MMap') {
        let newObj = {};
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
        let list = [];
        list.push(this.make(args[0]));
        return list;
    }
    if (t == 'MOption') {
        return this.make(args[0]);
    }
    if (t == 'MObj') {
        let newObj = {};
        for (let key in paramType.fields) {
          newObj[key] = this.make(paramType.fields[key]);
        }
        return newObj;
    }

  }
}
