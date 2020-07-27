import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import {Helper} from "../../Helper";

export class Jax2
{
    public _prox: any
    public _path: string
    public _last: string
    public _props: any;
    public _with: any;

    constructor(path: string = "") {

        this._prox = new Proxy(this, this);
        this._path = path + "";
        this._last = "";
        this._props = {};
        this._with = [];
        return this._prox;
    }

    props (props: any) {

        this._props = merge(this._props, props);

        return this;
    }

    with (...withs: any) {

        withs.map((i: any) => this._with.push(i))

        return this;
    }

    get (target: Jax2, prop: string) {

        let that = this;
        let is_method = false;

        if (prop in this) {

            return (this as any)[prop];
        }

        else {

            this._last = prop;
        }

        return (new Jax2((this._path ? this._path + '.' : this._path) + prop))
            .props(this._props)
            .with(...this._with)
            ._setLast(this._last);
    }

    _make (params: any = {}) {

        let props = Helper.query_get();

        props = merge(props, this._props, params);

        let route = window.ljs.cfg('jax');

        let route_param = route ? Helper.md5(route) : undefined;

        this._path = this._path.replace(new RegExp(`\.${this._last}$`), '');

        props[`${route_param}[${this._path}@${this._last}]`] = this._with.map((w: any) => {
            if (typeof w === 'object') return w._make();
            return w;
        });

        return props;

        //return (new Promise(() => false));
    }

    send () {

        return this._make();
    }

    _setLast (last: string) {

        this._last = last;

        return this;
    }

    _getPath () {

        return this._path;
    }
}