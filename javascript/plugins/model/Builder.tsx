import collect from 'collect.js';

export class Builder {

    static model: any;
    static directives: any;
    static related: boolean;
    static singular: boolean = false;
    static method: string = 'POST';

    constructor(model: any, related: boolean = false) {

        (this as any).constructor.model = model;

        (this as any).constructor.directives = {};

        (this as any).constructor.related = related;
    }

    find (id: number, fields: any = null) {

        return this.directive('id',id).setSingular().get(fields);
    }

    get (fields: any = null) {

        return this.setMany().makeRequest(this.buildQuery(fields));
    }

    paginate (limit: number = 10, page: number = 1, fields: any = null) {

        return this.directive('first',limit).directive('page', page).get(fields);
    }

    endpoint () {
        let model: any = (this as any).constructor.model;
        return window.location.origin + '/' + model.endpoint.trim('/');
    }

    directive (key: string, value: any) {
        (this as any).constructor.directives[key] = value;
        return this;
    }

    setSingular () {
        (this as any).constructor.singular = true;
        return this;
    }

    setMany () {
        (this as any).constructor.singular = false;
        return this;
    }

    get buildQuery () {
        return (this as any).constructor.buildQuery;
    }

    makeRequest (query: any) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open((this as any).constructor.method, this.endpoint(), true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(query));
            xhr.onload = (e: any) => {
                let target = e.target;
                if (target.status >= 200 && target.status < 300) {
                    resolve((this as any).constructor.makeResult(JSON.parse(target.response)));
                } else {
                    reject({status: target.status, statusText: target.statusText});
                }
            };
            xhr.onerror = (e: any) => {
                let target = e.target;
                reject({status: target.status, statusText: target.statusText});
            };
        });
    }

    static makeResult (data: any) {

        if ('data' in data) {

            let model: any = this.model;
            let singular: boolean = this.singular;
            let table = model.__getTable(singular);

            if (table in data.data) {

                let results: any = data.data[table];

                if (!singular) {
                    return collect(results.data.map((items: any) => {
                        return (new this.model(items)).toJson();
                    }));
                }
                return (new this.model(results)).toJson();
            }
        }

        return collect([]);
    }

    static buildQuery (fields: any = null) {

        let model: any = (this as any).constructor.model;
        let directives: any = (this as any).constructor.directives;
        let related: any = (this as any).constructor.related;
        let singular: boolean = (this as any).constructor.singular;

        fields = fields === null ? model.fillable.join(',') : fields.join(',');
        fields = singular ? `{${fields}}` : `{data{${fields}}}`;

        let dirs: any = [];
        Object.keys(directives).map((key: string) => { dirs.push(`${key}:${directives[key]}`); });
        dirs = dirs.join(',');
        dirs = dirs ? `(${dirs})` : dirs;

        let query = `{${model.__getTable(singular)}${dirs}${fields}}`;

        return related ? query : {
            operationName: null,
            query: query,
            variables: {}
        }
    }
}