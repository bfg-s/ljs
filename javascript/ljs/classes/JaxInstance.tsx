import map from 'lodash/map';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';
import {Helper} from "../../Helper";

export class JaxInstance implements JaxInterface {

    public ljs: Ljs

    /**
     * JAX Constructor
     * @param ljs
     */
    constructor(ljs: Ljs) {

        this.ljs = ljs;
    }

    /**
     * Method post
     * @param path
     * @param params
     * @param storage
     */
    post(path: string = "/", params: any = {}, storage: any = {}) {

        return this._sendAjax("post", path, params, storage);
    }

    /**
     * Method get
     * @param path
     * @param params
     * @param storage
     */
    get(path: string = "/", params: any = {}, storage: any = {}) {

        return this._sendAjax("get", path, params, storage);
    }

    /**
     * Method head
     * @param path
     * @param params
     * @param storage
     */
    head(path: string = "/", params: any = {}, storage: any = {}) {

        return this._sendAjax("head", path, params, storage);
    }

    /**
     * Method put
     * @param path
     * @param params
     * @param storage
     */
    put(path: string = "/", params: any = {}, storage: any = {}) {

        return this._sendAjax("put", path, params, storage);
    }

    /**
     * Method delete
     * @param path
     * @param params
     * @param storage
     */
    del(path: string = "/", params: any = {}, storage: any = {}) {

        return this._sendAjax("delete", path, params, storage);
    }

    /**
     * Method wrapper
     * @param method
     * @param path
     * @param params
     * @param storage
     * @private
     */
    _sendAjax(method: string, path: string = "/", params: any = {}, storage: any = {}) {

        if (typeof path === 'object') {
            storage = params;
            params = path;
            path = location.href;
        }

        let $methods: any = {"delete": "delete", "get": "get", "post": "post", "put": "put", "head": "head"};

        if ($methods[method] !== undefined) {

            window.ljs.switchProcess(true);

            if (process.env.NODE_ENV === 'development') {
                window.ljs._detail(`Method: [${method}] Jax`);
            }

            if (method === 'put') {
                method = 'post';
                params['_method'] = 'PUT';
            }
            if (method === 'head') {
                method = 'post';
                params['_method'] = 'HEAD';
            }
            if (method === 'delete') {
                method = 'post';
                params['_method'] = 'DELETE';
            }

            if (method !== 'get') {

                let isForm = params instanceof HTMLFormElement,
                    form = isForm ? new FormData(params) : new FormData();

                if (!isForm) map(params, (item, key) => {
                    form.append(
                        key,
                        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item
                    )
                });

                params = form;
            } else {

                params = Helper.http_build_query(params);
            }

            return $.ajax({
                url: path,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: params,
                type: method,
                complete: (response, textStatus) => {

                    window.ljs._onload_header(response.getAllResponseHeaders());

                    if (isObject(response.responseJSON)) {

                        let data: any = {};

                        map(response.responseJSON, (i: any, k: any) => {
                            if (/^([0-9\:]+)\:/.test(k)) data[k] = i;
                        });

                        window.ljs.exec(data, null, merge({
                            response,
                            status: textStatus,
                            method,
                            path,
                            params
                        }, storage));
                    }

                    window.ljs.switchProcess(false);
                }
            });
        }

        return false;
    }
}
