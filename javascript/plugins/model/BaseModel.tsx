import moment from 'moment';
import {Builder} from "./Builder";

const pluralize = require('pluralize');

export class BaseModel {

    static table: string|null = null;
    static endpoint: string = 'graphql'
    static attributes: any = {};
    static guarded: any = [];
    static fillable: any = ['id'];
    static appends: any = [];
    static casts: any = {};
    static times: any = ['created_at', 'updated_at', 'deleted_at'];
    static proxy: any;
    static builder: any;

    constructor(attributes: any = {}) {

        Object.keys((this as any).constructor.attributes).map((key: string) => {
            (this as any).constructor.attributes[key] =
                (this as any).constructor.__make_cast(key, (this as any).constructor.attributes[key]);
        });

        Object.keys(attributes).map((key: string) => {
            (this as any).constructor.attributes[key] =
                (this as any).constructor.__make_cast(key, attributes[key]);
        });

        (this as any).constructor.builder = new Builder((this as any).constructor);

        return (this as any).constructor.proxy = new Proxy(this, {
            get: (this as any).constructor.__get,
            set: (this as any).constructor.__set
        });
    }

    static __getTable (singular: boolean) {
        if (!this.table) { throw new Error("Set table in Model"); }
        return pluralize(this.table, singular ? 1 : 0);
    }

    static __get (target: any, prop: any) {

        let constructor: any = target.constructor;

        if (prop === '_target') { return target; }

        if (prop === '_super') { return constructor; }

        let mutatorName = window.ljs.help.camelize(`get_${prop}_attribute`);

        if (Reflect.has(target, mutatorName)) {

            return Reflect.get(target, mutatorName).bind(target.constructor.proxy)(constructor.attributes[prop]);
        }

        if (prop in constructor.attributes) {

            return constructor.attributes[prop]
        }

        if (Reflect.has(target, prop)) {

            return Reflect.get(target, prop);
        }
    }

    static __make_cast (name: string, value: any) {

        let cast = null;

        if (this.times.indexOf(name) !== -1) {
            cast = 'moment';
        } else {
            cast = name in this.casts ? this.casts[name] : null;
        }

        switch (cast) {
            case 'moment':
            case 'date':
                value = moment(value);
                break;
            case 'bool':
            case 'boolean':
                value = !!value;
                break;
            case 'number':
            case 'integer':
            case 'int':
                value = Number(value);
                break;
            case 'string':
                value = typeof value === 'object' ? JSON.stringify(value) : String(value);
                break;
            case 'object':
            case 'array':
                value = typeof value === 'string' ? JSON.parse(value) : Object(value);
                break;
        }

        return value;
    }

    static __set (target: any, prop: any, value: any, proxy: any) {

        let mutatorName = window.ljs.help.camelize(`set_${prop}_attribute`);

        if (Reflect.has(target, mutatorName)) {

            value = Reflect.get(target, mutatorName)(value);
        }

        target.constructor.attributes[prop] = target.constructor.__make_cast(prop, value);

        return true;
    }
}
