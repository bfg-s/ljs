import map from 'lodash/map';
import merge from 'lodash/merge';
import isString from 'lodash/isString';
import isNaN from 'lodash/isNaN';
import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';
import {ExecutorMethods} from "./ExecutorMethods";

export class LJSConstructor extends ExecutorMethods {

    static ljs: any;
    public _configs: any = {};
    public executor: any = {};
    public executor_lite: any = {};
    public isLocal: boolean = false;
    public token: string = '';

    /**
     * LJSConstructor
     */
    constructor () {

        super();

        if (LJSConstructor.ljs !== undefined) {

            throw new Error("An instance of this object already exists. Repeat call is not possible.");
        }
    }

    /**
     * Static instance object a singleton
     */
    static instance() {

        if (this.ljs === undefined) {

            this.ljs = new this();
        }

        window.ljs = this.ljs;

        return window.ljs;
    }

    /**
     * Application instance
     *
     * @private
     */
    instance () {

        document.querySelectorAll("meta[name^=lar-]").forEach((item) => {

            let name = item.getAttribute('name');
            let content = item.getAttribute('content')

            if (name) { this._configs[name] = content; }
        });

        this._get_save_configs();

        this.isLocal = this._configs["lar-env"] === "local";

        this.token = this._configs["lar-token"];

        $.ajaxSetup({headers: {'X-CSRF-TOKEN': this.token}});

        if (!this.token) {

            throw new Error("For security reasons, the application cannot run the token bet.");
        }

        this._apply_instance();
    }

    /**
     * Application starter
     * @returns {LJS}
     */
    _apply_instance () {

        this._apply_events();

        return this;
    }

    /**
     * Apply all construct events
     *
     * @returns {LJS}
     */
    _apply_events () {

        if (window.on_apply !== undefined) {

            if (typeof window.on_apply === "function") {

                window.on_apply(this);

            } else if (typeof window.on_apply === "object") {

                map(window.on_apply, (item) => {

                    if (typeof item === "function") {

                        item(this);
                    }
                });
            }
        }

        if (this.isLocal && (this as any).cfg("console_clear")) {

            console.clear();
        }

        return this;
    }

    /**
     * Getter save configs
     *
     * @private
     */
    _get_save_configs () {

        if ((this as any).$storage.hasGroup("config")) {

            map((this as any).$storage.getAll("config"), (item, key) => {

                if (!/^lar\-/.test(key)) {

                    key = "lar-" + key;
                }

                this._configs[key] = item;
            });
        }
    }

    /**
     * System header getter
     * @param headers
     * @private
     */
    _onload_header (headers: string) {

        let a_headers = headers.split('\n');

        map(a_headers, (item: string) => {

            let items: any[] = item.split(": ");

            if (items[1]) {

                if (/^lar\-/.test(items[0])) {

                    items[1] = String(items[1]).replace("\r", "");

                    if (/^[\{\[].*[\]\}]$/g.test(items[1])) { try { items[1] = JSON.parse(items[1]); } catch (e) {} }
                    else if (!isNaN(Number(items[1]))) { items[1] = Number(items[1]); }
                    else if (items[1] === 'true') { items[1] = true; }
                    else if (items[1] === 'false') { items[1] = false; }
                    else if (items[1] === 'null') { items[1] = null; }

                    if (this._configs[items[0]] !== undefined) {

                        if (typeof this._configs[items[0]] === "object") {

                            this._configs[items[0]] = merge(this._configs[items[0]], items[1]);
                        }

                        else {

                            this._configs[items[0]] = items[1];
                        }
                    }

                    else {

                        this._configs[items[0]] = items[1];
                    }
                }
            }
        });
    }

    /**
     * System local switcher
     *
     * @private
     */
    _local () {

        this.isLocal = !this.isLocal;

        return (this as any).cfg("env",  this.isLocal ? "local" : "production")
    }

    /**
     * Dispatch global JS event
     * @param name
     * @param detail
     * @returns {LJSConstructor}
     * @private
     */
    _dispatch_event (name: string, detail: any = this) {

        document.dispatchEvent(new CustomEvent(name, {detail}));

        return this;
    }

    /**
     * System log
     *
     * @param data
     * @param type
     * @private
     */
    _log (data: any, type: string = "log") {

        if (this.isLocal) {

            let time = `[${(new Date()).toLocaleTimeString('en-US', { hour12: false })}]:`;

            if (data instanceof Array) {

                (console as any)[type](time, ...data);

            } else {

                (console as any)[type](time, data);
            }
        }
    }

    /**
     * System error info log
     *
     * @private
     */
    _error (...args: any[]) {

        this._log([...args], "error");
    }

    /**
     * System info log
     *
     * @private
     */
    _info (...args: any[]) {

        [...args].map(item => this._log(item, "info"));
    }

    /**
     * System detail work in console
     *
     * @private
     */
    _detail (...args: any[]) {

        if ((this as any).cfg("apply_info")) this._log([...args], "info");
    }

    /**
     * System warning info log
     *
     * @private
     */
    _warn (...args: any[]) {

        [...args].map(item => this._log(item, "warn"));
    }

    /**
     * Make Special object
     * @param name
     * @param data
     * @private
     */
    _special_object (name: string, data: any) {

        let selector = `[data-ljs*="${name}"]`;

        let object = document.querySelector(selector);

        if (object) {

            data = atob(data);

            if (process.env.NODE_ENV === 'development') {
                this._detail("Special object:", object, data);
            }

            let call_exec = (object: any, exec: any, event_obj = {}) => {

                let params = {};

                let storage = {object, event: event_obj};

                try {

                    exec = JSON.parse(exec)

                } catch (e) {

                }

                if (process.env.NODE_ENV === 'development') {
                    this._detail("Call special:", exec, object);
                }

                this.exec(exec, null, storage);
            };

            let create_event = (object: any, event: any, exec: any) => {

                object.addEventListener(event, (event_obj: Event) => {

                    call_exec(object, exec, event_obj);
                });
            };

            if (data !== null && data !== "") {

                let cmd = data.split(/\s{0,}\|\|\s{0,}/g);

                cmd.map((item: string) => {

                    let parse = /^([a-zA-Z\-\_]+)\:(.*)/g.exec(item);

                    if (!parse) {

                        if (/^[\[|\{].*[\}|\]]$/.test(item)) {

                            call_exec(object, item);
                        }

                        else {

                            if (process.env.NODE_ENV === 'development') {
                                this._error("LJS Attribute Part error", parse, item, object);
                            }
                        }
                    }

                    else {

                        if (parse[1] !== undefined && parse[2] !== undefined) {

                            create_event(object, parse[1], parse[2]);
                        }
                    }
                });

            }

            let ljs_dataset = (object as HTMLElement).dataset.ljs;

            if (ljs_dataset && !/\|\|/g.test(ljs_dataset)) {

                object.removeAttribute("data-ljs");
            }

        }

        else {

            if (process.env.NODE_ENV === 'development') {
                this._error(`Object ${selector} not found!`, data);
            }
        }
    }

    /**
     * [For Executor] Find and execute command in the javascript entity
     *
     * @param key
     * @param item
     * @param storage_data
     * @returns {string|*|string|*}
     * @private
     */
    _find_and_execute_command (key: any, item: any, storage_data: any = {}) {

        if (!Array.isArray(item)) {

            item = [item];
        }

        /**
         * Call executor closures
         */
        if (this.executor_lite[key] !== undefined) {

            return this.executor_lite[key](...item);
        }

        /**
         * __invoke method
         */
        else if (this.executor[key] !== undefined) {

            return this._force_object(
                this._get_force_object(key, false, storage_data),
                this._get_force_object(key, true, storage_data).__individual_method(),
                item
            );
        }

        /**
         * Call one name global function
         */
        else if ((window as any)[key] !== undefined) {

            return this._force_object(window, key, item, true, storage_data);
        }

        else {

            /**
             * Public call method
             */
            if (key.indexOf("::") > 0) {

                key = key.split("::");

                let obj = this._get_force_object(key[0], false, storage_data);

                if (obj) {

                    return this._force_object(obj, key[1], item, false, storage_data);
                }

            }

            /**
             * Static call method
             */
            else if (key.indexOf(":") > 0) {

                key = key.split(":");

                let obj = this._get_force_object(key[0], true, storage_data);

                if (obj) {

                    return this._force_object(obj, key[1], item, false, storage_data);
                }

            }

            /**
             * Recursive caller and pipe executor
             */
            else if (key.indexOf(".") > 0) {

                key = key.split(".");

                let _tmp_link = null;

                let last_key = Object.keys(key).length-1;

                if (window[key[0]] !== undefined) {

                    /**
                     * Recursive call mode
                     */

                    for (let i = 0; i <= last_key; i++) {

                        let now: any = _tmp_link !== null ? _tmp_link : window;

                        if (now[key[i]] !== undefined) {

                            if (last_key === i) {

                                return this._force_object(now, key[i], item, true, storage_data);

                            } else {

                                _tmp_link = now[key[i]];
                            }

                        }
                    }

                }

                else if (this.executor[key[0]] !== undefined) {

                    /**
                     * Pipe executor call
                     */

                    let obj = this._get_force_object(key[0], false, storage_data);

                    if (obj) {

                        let static_obj = this._get_force_object(key[0], true, storage_data);

                        let __tmp_return = "__EMPTY__";

                        for (let i = 1; i <= last_key; i++) {

                            let now = static_obj[key[i]] !== undefined ? static_obj : obj;

                            __tmp_return = this._force_object(now, key[i], __tmp_return === "__EMPTY__" ? item : __tmp_return, false, storage_data);
                        }

                        return __tmp_return;
                    }
                }
            }
        }
    }

    /**
     * [For Executor] A special class call is required for executor.
     *
     * @param obj
     * @param fool_method
     * @param params
     * @param call
     * @param storage
     * @private
     */
    _force_object (obj: any, fool_method: any, params: any = null, call: boolean = false, storage: any = {}) {

        if (process.env.NODE_ENV === 'development') {
            this._detail('Forced object:', obj, "Method:", fool_method, "Params:", params, "Call:", call);
        }

        let return_data;

        let tmp = obj;

        let method = fool_method.split(".");

        let last = method.length - 1;

        let called = false;

        for (let i = 0; i < last; i++) {

            let item = method[i];

            if (tmp[item] !== undefined) {

                tmp = tmp[item];

            }

            else if (tmp && tmp['__call'] !== undefined) {

                tmp.__now_method = '__call';

                return_data = tmp['__call'](fool_method, params);

                tmp = false;

                called = true;
            }

            else {

                if (process.env.NODE_ENV === 'development') {
                    this._error(`No method found by name [${item}]. In:`, obj);
                }

                tmp = false;
            }
        }

        method = method[last];


        if (tmp && tmp[method] !== undefined) {

            tmp.__now_method = method;

            if (typeof tmp[method] === 'function') {

                let ps = /.*\((.*)\)$/g.exec(method);

                if (ps && ps[1] !== undefined && ps[1]) {

                    let adds = ps[1];
                    method = method.replace(`(${adds})`, '');

                    adds.split('||').map((i) => {

                        if (!Array.isArray(params)) { params = [params]; }
                        if (params.length === 1 && !params[0]) { params = []; }

                        params.push(i.trim().parse(storage));
                    });
                }

                if (Array.isArray(params)) {

                    return_data = tmp[method](...params);
                }

                else {

                    return_data = tmp[method](params);
                }
            }

            else {

                return_data = tmp[method];

            }
        }

        else if (tmp && tmp['__call'] !== undefined) {

            tmp.__now_method = '__call';

            return_data = tmp['__call'](fool_method, params);
        }

        else if (called) {

            return return_data;
        }

        else {

            if (process.env.NODE_ENV === 'development') {
                this._error(`No method call by name [${method}]. In:`, tmp);
            }
        }

        return return_data;
    }

    /**
     * [For Executor] Get a forced object for further work with him, used by the executor.
     *
     * @param name
     * @param return_static
     * @param storage
     * @returns {boolean|*}
     * @private
     */
    _get_force_object (name: any, return_static: any, storage: any = {}) {

        let obj = this.executor[name];

        if (obj === undefined) {

            return false;
        }

        if (obj.constructor !== undefined) {

            obj = obj.constructor;
        }

        obj.storage = merge(obj.storage !== undefined ? obj.storage : {}, storage);

        if (return_static) {

            return obj;
        }

        return this.executor[name];
    }

    /**
     * inner checker
     * @param data
     * @param storage_data
     * @returns {{}}
     * @private
     */
    _checkSend(data: any, storage_data: any) {

        if (isString(data)) {

            data = data.parse(storage_data);

            try { data = JSON.parse(data); } catch (e) {}
        }

        else if (Array.isArray(data)) {

            data = data.parse(storage_data);
        }

        else if (isObject(data)) {

            data = mapValues(data, item => this.parse(item, storage_data));
        }

        return data;
    }

    /**
     * JQuery executor extender
     * @param obj
     * @param name
     * @private
     */
    _jqueryed (obj: any, name: string) {

        if ((window as any).jQuery !== undefined) {

            let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((i) => {
                return i !== 'constructor' && i !== obj.constructor.__individual_method();
            });

            let extend = {},
                it = this;

            methods.map((method: string) => {

                // @ts-ignore
                extend[`${name}_${method}`] = function (...$params: any[]) {

                    // @ts-ignore
                    return this.each(function (i, obj) {

                        it.exec(`${name}::${method}`, $params, {object: obj});
                    });
                };
            });

            jQuery.fn.extend(extend);
        }

        else {

            if (process.env.NODE_ENV === 'development') {
                this._error("Required jquery for:", obj);
            }
        }
    }

    /**
     * Get url query param
     * @param name
     * @private
     */
    _query (name: string) {

        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
}