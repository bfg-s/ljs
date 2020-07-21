import map from 'lodash/map';
import filter from 'lodash/filter';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import merge from 'lodash/merge';
import setWith from 'lodash/setWith';
import {Helper} from "../../Helper";

export class JaxExec implements JaxExecInterface{

    public collect: any = {}
    public params: any = {}
    public storage: any = {}
    public onsuccess: any
    public onerror: any
    public ondone: any
    public state: any
    public get_emit: boolean = false

    constructor () {

        this.collect = {};

        this.onsuccess = null;

        this.onerror = null;

        this.ondone = null;

        this.state = null;

        this.params = {};

        this.get_emit = false;

        this.storage = {};
    }

    /**
     * Execute command
     * @param name
     */
    cmd (name: string) {

        let cmd_name = name;

        let that = this;

        return new class JaxController implements JaxExecControllerInterface{

            /**
             * Add with data
             * @param withs
             */
            with (withs: object) {

                map(withs, (i: any, k: string|number) => {

                    if (window.ljs.$state && window.ljs.$state.has(i)) {

                        that.setWith((isNumber(k) ? i.replace(/\./g, '_') : k), window.ljs.$state.get(i));
                    }

                    else if (/^\:/.test(i)) {

                        let name = i.replace(/^\:/, ''),
                            obj = document.querySelector(`[name='${name}']`),
                            val = obj ? (obj as any).value : null;

                        that.setWith((isNumber(k) ? name : k), isString(val) || isNumber(val) ? val : null);
                    }

                    else if (typeof i === 'string') {

                        let obj = document.querySelector(i),
                            val = obj ? (obj as any).value : null;

                        that.setWith((isNumber(k) ? i.replace(/[^a-zA-Z\_]/g, '') : k), isString(val) || isNumber(val) ? val : null);
                    }
                });

                return this;
            }

            /**
             * Call cmd
             * @param name
             * @param params
             */
            call (name: string, params: any = null) {

                cmd_name = `${cmd_name}@${name}`;

                if (that.collect[cmd_name] === null) { that.collect[cmd_name] = {}; }

                if (params instanceof HTMLFormElement) { params = [$(params).serializeArray()]; }

                map(params, (item, key) => {

                    if (typeof item === 'object' && !Array.isArray(item)) {

                        params[key] = filter(item, (data, segment) => {

                            if (segment === 'request') {
                                this.mergeParams(data);
                                return false;
                            }
                        });

                        if (!Object.keys(params[key]).length) {

                            delete params[key];
                        }
                    }
                });

                that.collect[cmd_name] = params;

                return this;
            }

            /**
             * Get collect segment
             * @param name
             */
            get (name: string|number) {

                return that.collect[cmd_name][name];
            }

            /**
             * Remove collect segment
             * @param name
             */
            remove (name: string|number) {

                delete that.collect[cmd_name][name];

                return this;
            }

            /**
             * Send cmd
             */
            send () {

                return that.send(cmd_name);
            }

            /**
             * Add on success event
             * @param data
             * @param val
             */
            onSuccess (data: any, val:any = null) {

                that.onSuccess(data, val);

                return this;
            }

            /**
             * Add on error event
             * @param data
             * @param val
             */
            onError (data: any, val:any = null) {

                that.onError(data, val);

                return this;
            }

            /**
             * Add on done event
             * @param data
             * @param val
             */
            onDone (data: any, val:any = null) {

                that.onDone(data, val);

                return this;
            }

            /**
             * Merge collect
             * @param data
             */
            mergeParams (data: object) {

                that.mergeParams(data);

                return this;
            }

            /**
             * Merge data to storage
             * @param storage
             */
            storage (storage: any) {

                that.toStorage(storage);

                return this;
            }

            /**
             * Set result to state
             * @param path
             */
            state (path: string) {

                that.toState(path);

                return this;
            }

            /**
             * Make get query emitter
             */
            emitGet () {

                that.emitGet();

                return this;
            }
        };
    }

    /**
     * Add on success event
     * @param data
     * @param val
     */
    onSuccess (data: any, val:any = null) {

        if (typeof data === 'string') {

            data = {[data]: val};
        }

        this.onsuccess = data;

        return this;
    }

    /**
     * Add on error event
     * @param data
     * @param val
     */
    onError (data: any, val:any = null) {

        if (typeof data === 'string') {

            data = {[data]: val};
        }

        this.onerror = data;

        return this;
    }

    /**
     * Add on done event
     * @param data
     * @param val
     */
    onDone (data: any, val: any = null) {

        if (typeof data === 'string') {

            data = {[data]: val};
        }

        this.ondone = data;

        return this;
    }

    /**
     * Merge collect
     * @param object
     */
    merge (object: object) {

        if ('collect' in object) {

            map((object as any).collect, (item: any, key: any) => {

                let cmd_name = key.replace(/^([0-9\:]+)\:/, Object.keys(this.collect).length+":");

                this.collect[cmd_name] = item;
            });
        }

        return this;
    }

    /**
     * Set result to state
     * @param path
     */
    toState (path: string) {

        this.state = path;

        return this;
    }

    /**
     * Add next executor to state
     * @param name
     */
    exclude (name: string) {

        delete this.collect[name];

        return this;
    }

    /**
     * Send executors to backend
     * @param name
     */
    send (name: any = null) {

        if (this.get_emit) {

            this.params = merge(this.params, Helper.query_get());
        }

        if (!('ljs' in window)) {

            throw new Error("The artist cannot be sent until the shared library is initialized.");
        }

        if (Object.keys(this.collect).length && window.ljs.$jax) {

            let result: any|Promise<JaxExecControllerInterface>
                = window.ljs.$jax.exec(this)
                .then((...data: any[]) => {

                this._callEvent("onsuccess", data);
                this._callEvent("ondone", data);

                let result = data[0];

                if (this.state && window.ljs.$state) {

                    window.ljs.$state.set(this.state, result);
                }

                return result;

            }).catch((...data: any[]) => {

                this._callEvent("onerror", data);
                this._callEvent("ondone", data);

                if (0 in data && 'responseJSON' in data[0]) {

                    let json = data[0].responseJSON;

                    if (typeof json === 'object' && !Array.isArray(json) && 'errors' in json && 'message' in json) {
                        let errs = Object.keys(json.errors);
                        errs.map((key) => {
                            if (!window.ljs.help.isNumber(key)) {
                                if (Array.isArray(json.errors[key])) {
                                    json.errors[key].map((mess: any) => "toast::error".exec(mess, window.ljs.help.camelize(key, true)));
                                } else if (typeof json.errors[key] === 'string') {
                                    "toast::error".exec(json.errors[key], window.ljs.help.camelize(key, true));
                                }
                            }
                        });
                        if (!errs.length) {
                            "toast::error".exec(json.message);
                        }
                    }
                }

                return data[0];
            });

            return result;
        }

        return (new Promise(() => false));
    }

    /**
     * Make get query emitter
     */
    emitGet () {

        this.get_emit = true;

        return this;
    }

    /**
     * Merge data to storage
     * @param storage
     */
    toStorage (storage: any = {}) {

        this.storage = merge(this.storage, storage);

        return this;
    }

    /**
     * Get collect executors
     */
    render () {

        return this.collect;
    }

    /**
     * Get query params
     */
    getParams () {

        return this.params;
    }

    /**
     * Get storage
     */
    getStorage () {

        return this.storage;
    }

    /**
     * Merge params
     * @param data
     */
    mergeParams (data: any) {

        this.params = merge(this.params, data);

        return this;
    }

    /**
     * Set var to params
     * @param name
     * @param val
     */
    setWith (name: string, val: any) {

        setWith(this.params, name, val);

        return this;
    }

    /**
     * Call inner event
     * @param name
     * @param params
     * @private
     */
    _callEvent (name: string, params: any) {

        if (name in this) {

            let e = (this as any)[name];

            if (typeof e === "function") {

                e(params);
            }

            else if (typeof e === "object") {

                window.ljs.exec(e, null, params);
            }
        }

        return this;
    }
}
