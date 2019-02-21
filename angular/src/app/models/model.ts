export abstract class Model {

    constructor(data?: any) {
        if(data){
            this.fill(data);
        }
    }

    get (name: PropertyKey): any {
        return this[name];
    }

    set (name: PropertyKey, value: any): Model {
        return this[name] = value;
    }

    attr (name: PropertyKey, value?:any) {
        if (typeof value != 'undefined') {
            return this.set(name, value);
        }
        return this.get(name);
    }

    fill(data:any): void {
        for (let key in data) {
            this.set(key, data[key]);
        }
    }
}