import unset from 'lodash/unset';
import merge from 'lodash/merge';
import get from 'lodash/get';
import {Helper} from "../../Helper";

(function () {
    let proxyInstances: any = new WeakSet()
    let originalProxy: any = Proxy
    Proxy = new Proxy(Proxy, {
        construct(target, args: any) {
            let newProxy = new originalProxy(...args)
            proxyInstances.add(newProxy)
            return newProxy
        },
        get: function (obj, prop) {
            if (prop == Symbol.hasInstance) {
                return function (instance: any) {
                    return proxyInstances.has(instance)
                }
            }
            // @ts-ignore
            return Reflect.get(...arguments)
        }
    })
})()

export class Model {
    private _prox: any;

    /**
     * Model Constructor
     * @param _path
     * @param _params
     * @param _state
     * @param _progress_event
     */
    constructor(
        private _path: string = "",
        private _params: any = {},
        private _state: any = {},
        private _progress_event: any = []
    ) {
        this._prox = new Proxy(this._make.bind(this), this as any);
        return this._prox;
    }

    /**
     * Make ajax request
     * @param query
     * @param state
     * @param _progress_event
     */
    static request(query: any, state: any, _progress_event: any = null) {
        return new Promise((resolve, reject) => {
            window.ljs.switchProcess(true);
            let xhr = new XMLHttpRequest();
            let route = window.ljs.cfg('jax');
            xhr.open('post', `${window.location.origin}/${route}`, true);
            xhr.setRequestHeader('X-CSRF-TOKEN', window.ljs.cfg('token'));
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.responseType = 'arraybuffer';
            if (_progress_event && _progress_event[0])
                xhr.upload.addEventListener('progress', (i) => _progress_event[0](i, xhr), false);
            xhr.send(query);
            xhr.addEventListener("load", (e: any) => {
                let target = e.target;
                window.ljs._onload_header(target.getAllResponseHeaders());
                if (target.status >= 200 && target.status < 300) {
                    let contentDispo = e.currentTarget.getResponseHeader('Content-Disposition');

                    if (contentDispo) {
                        let fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
                        let blob = e.currentTarget.response;
                        // @ts-ignore
                        if (window.navigator.msSaveOrOpenBlob) {
                            // @ts-ignore
                            window.navigator.msSaveBlob(blob, fileName);
                        } else {
                            let downloadLink = window.document.createElement('a');
                            let contentTypeHeader = e.currentTarget.getResponseHeader("Content-Type");
                            downloadLink.href = window.URL.createObjectURL(new Blob([blob], {type: contentTypeHeader}));
                            downloadLink.download = fileName;
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        }
                        resolve([]);
                    } else {
                        let enc = new TextDecoder();
                        // @ts-ignore
                        let data = enc.decode(target.response);
                        try { // @ts-ignore
                            data = JSON.parse(data);
                        } catch (e) {
                        }
                        if (typeof data === 'object' && '$exec' in data) {
                            // @ts-ignore
                            window.ljs.exec(data.$exec);
                            unset(data, '$exec');
                        }
                        this.applyStates(state, data);
                        resolve(data);
                    }
                } else {
                    reject({status: target.status, statusText: target.statusText});
                }
                window.ljs.switchProcess(false);
            }, false);
            xhr.addEventListener("error", (e: any) => {
                let target = e.target;
                reject({status: target.status, statusText: target.statusText});
                window.ljs.switchProcess(false);
            }, false);
        });
    }

    /**
     * Apply state requests
     * @param state
     * @param data
     */
    static applyStates(state: any, data: any) {
        Object.keys(state).map((key: string) => {
            window.state.set(key, get(data, state[key]));
        });
    }

    /**
     * Set progress event
     * @param event
     */
    progress(event: Function) {
        this._progress_event[0] = event;
        return this;
    }

    /**
     * Model state setter
     * @param name
     * @param value
     */
    state(name: string, value?: string) {
        if (!value) value = name;
        this._state[name] = value;
        return this;
    }

    /**
     * Model params setter
     * @param params
     */
    params(params: any) {
        this._params = merge(this._params, params);
        return this;
    }

    /**
     * Model param setter
     * @param name
     * @param value
     */
    param(name: string, value: any) {
        this._params[name] = value;
        return this;
    }

    /**
     * Model blob maker
     * @param name
     * @param value
     * @param options
     */
    blob(name: string, value: BlobPart[], options?: BlobPropertyBag) {
        if (!Array.isArray(value) && typeof value === 'object') value = [JSON.stringify(value)];
        if (!Array.isArray(value)) value = [value];
        this._params[name] = new Blob(value, options);
        return this;
    }

    /**
     * Add blob collection
     * @param fields
     */
    blobs(fields: object) {
        Object.keys(fields).map((key: string) => {
            this.blob(key, (fields as any)[key]);
        });
        return this;
    }

    /**
     * Set custom path
     * @param path
     * @param params
     */
    path(path: string, ...params: any) {
        let send_params = merge(Helper.query_get(), this._params);
        let route = window.ljs.cfg('jax');
        let route_param = route ? Helper.md5(route) : undefined;
        let form = new FormData();
        path = path.replace(/\.([a-zA-Z0-9\_]+)$/i, '@$1');
        form.append(`${route_param}[${path}]`, JSON.stringify(params));
        let addFormData = (data: any, parentKey?: string | null) => {
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
                if (parentKey) {
                    form.append(parentKey, value);
                }
            }
        }
        addFormData(send_params);
        return Model.request(form, this._state, this._progress_event);
    }

    /**
     * Proxy get event
     * @param target
     * @param prop
     */
    get(target: Model, prop: string) {
        let that = this;
        let is_method = false;
        if (prop === 'toJSON') return false;
        if (prop === 'apply') prop = '';
        if (prop in this && prop !== 'get') {
            return (this as any)[prop];
        }
        let path = prop ? ((this._path ? this._path + '.' : this._path) + prop) : this._path;
        let model = (new Model(path, this._params, this._state, this._progress_event));
        this._params = {};
        this._state = {};
        this._progress_event = [];
        return model;
    }

    /**
     * Proxy make target
     * @param params
     */
    _make(...params: any) {
        if (params[0] instanceof Proxy) {
            params = params[1];
        }
        return this.path(this._path, ...params);
    }
}
