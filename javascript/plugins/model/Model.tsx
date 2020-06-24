import {BaseModel} from "./BaseModel";
import {Builder} from "./Builder";

window.Model = class Model extends BaseModel {

    toJson () {
        let result: any = {};
        let constructor: any = (this as any)._super;
        Object.keys(constructor.attributes).map((key: string) => {
            if (constructor.guarded.indexOf(key) === -1) {
                result[key] = (this as any)[key];
            }
        });
        constructor.appends.map((key: string) => {
            result[key] = (this as any)[key];
        });
        return result;
    }

    stringify () {
        return JSON.stringify(this.toJson());
    }
    
    query () {

        return (this as any)._super.builder;
    }

    find (id: number, fields: any = null) {

        return this.query().find(id, fields);
    }

    get (fields: any = null) {

        return this.query().get(fields);
    }

    paginate (limit: number = 10, page: number = 1, fields: any = null) {

        return this.query().paginate(limit, page, fields);
    }
}

window.User = class User extends window.Model {

    static table = "user";

    static fillable: any = [
        'id', 'name', 'email', 'created_at', 'updated_at'
    ];

    static casts = {
        id: 'int'
    };

    // static appends = [
    //     'test'
    // ];

    // static attributes: object = {
    //     id: 1,
    //     name: 'User name',
    //     email: 'xsaven@gmail.com',
    //     created_at: "2020-05-18 16:54:33",
    //     updated_at: "2020-06-09 01:15:12"
    // };

    // getTestAttribute () {
    //
    //     return this.created_at.format('DD.MM.YYYY');
    // }
}