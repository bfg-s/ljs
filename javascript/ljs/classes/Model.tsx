import unset from 'lodash/unset';
import merge from 'lodash/merge';
import get from 'lodash/get';
import {Helper} from "../../Helper";

export class Model
{
    private _prox: any;

    /**
     * Model Constructor
     * @param _path
     * @param _params
     * @param _state
     */
    constructor(
        private _path: string = "",
        private _params: any = {},
        private _state: any = {}
    ) {
        this._prox = new Proxy(this._make.bind(this), this as any);
        return this._prox;
    }

    /**
     * Model state setter
     * @param name
     * @param value
     */
    state (name: string, value?: string) {
        if (!value) value = name;
        this._state[name] = value;
        return this;
    }

    /**
     * Model params setter
     * @param params
     */
    params (params: any) {
        this._params = merge(this._params, params);
        return this;
    }

    /**
     * Model param setter
     * @param name
     * @param value
     */
    param (name: string, value: any) {
        this._params[name] = value;
        return this;
    }

    /**
     * Model blob maker
     * @param name
     * @param value
     * @param options
     */
    blob (name: string, value: BlobPart[], options?: BlobPropertyBag) {
        if (!Array.isArray(value) && typeof value === 'object') value = [JSON.stringify(value)];
        if (!Array.isArray(value)) value = [value];
        this._params[name] = new Blob(value, options);
        return this;
    }

    /**
     * Add blob collection
     * @param fields
     */
    blobs (fields: object) {
        Object.keys(fields).map((key: string) => {
            this.blob(key, (fields as any)[key]);
        });
        return this;
    }

    /**
     * Proxy get event
     * @param target
     * @param prop
     */
    get (target: Model, prop: string) {
        let that = this;
        let is_method = false;
        if (prop in this) { return (this as any)[prop]; }
        let path = (this._path ? this._path + '.' : this._path) + prop;
        let model = (new Model(path, this._params, this._state));
        this._params = {};
        this._state  = {};
        return model;
    }

    /**
     * Proxy make target
     * @param params
     */
    _make (...params: any) {
        let send_params = merge(Helper.query_get(), this._params);
        let route = window.ljs.cfg('jax');
        let route_param = route ? Helper.md5(route) : undefined;
        this._path = this._path.replace(/\.([a-zA-Z0-9\_]+)$/i, '@$1');
        let form = new FormData();
        form.append(`${route_param}[${this._path}]`, JSON.stringify(params));
        let addFormData = (data: any, parentKey?: string|null) => {
            if (
                data && typeof data === 'object' &&
                !(data instanceof Date) &&
                !(data instanceof File) &&
                !(data instanceof Blob)
            ) {
                Object.keys(data).forEach(key => {
                    addFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data === null ? '' : data;
                if (parentKey) { form.append(parentKey, value); }
            }
        }
        addFormData(send_params);
        return Model.request(form, this._state);
    }

    /**
     * Make ajax request
     * @param query
     * @param state
     */
    static request (query: any, state: any) {
        return new Promise((resolve, reject) => {
            window.ljs.switchProcess(true);
            let xhr = new XMLHttpRequest();
            let route = window.ljs.cfg('jax');
            xhr.open('post', `${window.location.origin}/${route}`, true);
            xhr.setRequestHeader('X-CSRF-TOKEN', window.ljs.cfg('token'));
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(query);
            xhr.onload = (e: any) => {
                let target = e.target;
                window.ljs._onload_header(target.getAllResponseHeaders());
                if (target.status >= 200 && target.status < 300) {
                    let data;
                    try { data = JSON.parse(target.response); }
                    catch (e) { data = target.response; }
                    if (typeof data === 'object' && '$exec' in data) {
                        window.ljs.exec(data.$exec);
                        unset(data, '$exec');
                    }
                    this.applyStates(state, data);
                    resolve(data);
                } else {
                    reject({status: target.status, statusText: target.statusText});
                }
                window.ljs.switchProcess(false);
            };
            xhr.onerror = (e: any) => {
                let target = e.target;
                reject({status: target.status, statusText: target.statusText});
                window.ljs.switchProcess(false);
            };
        });
    }

    /**
     * Apply state requests
     * @param state
     * @param data
     */
    static applyStates (state: any, data: any)  {
        Object.keys(state).map((key: string) => {
            window.state.set(key, get(data, state[key]));
        });
    }
}