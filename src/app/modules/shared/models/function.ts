export interface IFunction {
    name: string;
    lang: string;
    tags: string[];
    execute: string;
    className: string;
    defaultContext: string;
    path: string;
}

export class Function implements IFunction {
    public name: string;
    public lang: string;
    public tags: string[];
    public execute: string;
    public className: string;
    public defaultContext: string;
    public path: string;

    constructor(props: Object) {
        this.name = props['name'];
        this.lang = props['lang'];
        this.tags = props['tags'];
        this.execute = JSON.stringify(props['execute']) || null;
        this.defaultContext = props['defaultContext'];
        this.className = props['className'];
        this.path = props['path'];
    }

    executeExample() {
        let execute = JSON.parse(this.execute);
        let generatedObject: object = {};
        if (this.isEmpty(execute)) {
            return '{}';
        }
        for (let key in execute) {
            if (execute.hasOwnProperty(key)) {
                let newObj: object = {};
                newObj[key] = this.make(execute[key]);
                Object.assign(generatedObject, newObj);
            }
        }
        if (Object.keys(generatedObject).length === 0) {
            return '{}';
        } else {
            return JSON.stringify(generatedObject, null, '\t');
        }
    }

    private isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    private make(paramType) {
        let t = paramType.type;
        let args = paramType.args;
        if (t === 'MString') {
            return 'string';
        }
        if (t === 'MAny') {
            return {};
        }
        if (t === 'MMap') {
            let newObj = {};
            newObj[this.make(args[0])] = this.make(args[1]);
            return newObj;
        }
        if (t === 'MInt') {
            return Math.round(Math.random() * 10);
        }
        if (t === 'MDouble') {
            return Math.random() * 10;
        }
        if (t === 'MList') {
            let list = [];
            list.push(this.make(args[0]));
            return list;
        }
        if (t === 'MOption') {
            return this.make(args[0]);
        }
        if (t === 'MObj') {
            let newObj = {};
            for (let key in paramType.fields) {
                if (paramType.fields.hasOwnProperty(key)) {
                    newObj[key] = this.make(paramType.fields[key]);
                }
            }
            return newObj;
        }

    }
}
