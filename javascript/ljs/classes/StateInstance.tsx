import {Helper} from "../../Helper";
import map from 'lodash/map';
import get from 'lodash/get';
import setWith from 'lodash/setWith';
import unset from 'lodash/unset';
import has from 'lodash/has';

export class StateInstance implements StateInterface{

    static state: any = {}
    static binds: any = {}
    static events: any = {}
    static storage: any = {}
    static watchers: any = []

    constructor($storage: LStorageInterface) {

        StateInstance.state = {};
        StateInstance.binds = {};
        StateInstance.events = {};
        StateInstance.watchers = [];
        StateInstance.storage = {};
        map($storage.getAll("state"), (val: any, path: string) => {
            setWith(StateInstance.state, path, val);
        });
    }

    /**
     * Get state
     */
    all () {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else  state = window.ljs.$state;

        map(
            StateInstance.state,
            (item, key) => state._callEvent('get', key, item, item)
        );

        if (!window.ljs.isLocal) return {};

        return StateInstance.state;
    }

    /**
     * Get state
     * @param path
     * @param defaults
     */
    get (path: string, defaults: any = undefined) {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else  state = window.ljs.$state;

        path = state._correctPath(path);

        let old = get(StateInstance.state, path, defaults);

        if (typeof old === 'function') {

            state._callEvent('call', path, old, undefined);
        }

        state._callEvent('get', path, old, old);

        return old;
    }

    /**
     * Set state
     * @param path
     * @param value
     */
    set (path: string, value: any) {

        let state = window.ljs.$state;

        if (path === '__now_method') {

            return state;
        }

        if (Helper.isObject(value)) {

            Object.keys(value).map((key: string) => {

                state.set(`${path}.${key}`, value[key]);
            });

            return state;
        }

        path = state._correctPath(path);

        if (!(path in state)) {

            let old = get(StateInstance.state, path);

            setWith(StateInstance.state, path, value);

            state._callEvent('set', path, value, old);

            if (old === undefined) {

                state._callEvent('create', path, value, old);
                state._callEvent('changed', path, value, old);
            }

            else if (old !== value) {

                state._callEvent('change', path, value, old);
                state._callEvent('changed', path, value, old);
            }
        }

        else {

            if (process.env.NODE_ENV === 'development') {
                window.ljs._error(`Error name [${path}] is reserved!`);
            }
        }

        return state;
    }

    /**
     * Delete state
     * @param path
     */
    delete (path: string) {

        let state: StateInstance;
        if (!window.ljs.$state) return false;
        else  state = window.ljs.$state;

        path = state._correctPath(path);

        if (!state.has(path)) {

            return false;
        }

        let old = get(StateInstance.state, path);

        state._callEvent('remove', path, old, undefined);
        state._callEvent('changed', path, old, undefined);

        unset(StateInstance.state, path);

        return true;
    }

    /**
     * Delete many keys
     * @param paths
     */
    deleted (paths: any = []) {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else  state = window.ljs.$state;

        map(paths, (k) => {

            state.delete(k);
        });

        return state;
    }

    /**
     * Has data on state
     * @param path
     */
    has (path: string) {

        let state: StateInstance;
        if (!window.ljs.$state) return false;
        else  state = window.ljs.$state;


        path = state._correctPath(path);

        return has(StateInstance.state, path);
    }

    /**
     * Save selected path
     * @param path
     */
    save (path: string) {

        let state: StateInstance;
        if (!window.ljs.$state) return false;
        else  state = window.ljs.$state as StateInstance;

        if (path && this.has(path)) {

            let data: any = get(StateInstance.state, path);

            window.ljs.$storage.put(path, data, "state");

            return true;
        }

        return false;
    }

    /**
     * Make storage for event
     * @param path
     * @param storage
     */
    make_storage (path: string, storage: any = {}) {

        StateInstance.storage[path] = storage;

        return window.ljs.$state;
    }

    /**
     * Merge state
     * @param set_state
     */
    merge (set_state: object) {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else  state = window.ljs.$state;

        let dotes = Helper.dot(set_state);

        map(dotes, (i, k) => {

            state.set(k, i);
        });

        return state;
    }

    /**
     * Remove state
     */
    delete_all () {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else  state = window.ljs.$state;

        let dotes = Helper.dot(StateInstance.state);

        map(dotes, (i, k) => {

            state.delete(k);
        });

        return state;
    }

    /**
     * Clear all data state
     * @param defaults
     */
    clear_all (defaults: any = {}) {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else  state = window.ljs.$state;

        let dotes = Helper.dot(StateInstance.state);

        map(dotes, (i, k) => {

            if (k in defaults) {

                state.set(k, defaults[k]);
            }

            else if (typeof i === 'boolean') {

                state.set(k, false);
            }

            else if (typeof i === 'string') {

                state.set(k, "");
            }

            else if (typeof i === 'object') {

                state.set(k, []);
            }

            else if (typeof i === 'number') {

                state.set(k, 0);
            }
        });

        return state;
    }

    /**
     * Event methods
     */

    watcher (watchClass: any) {

        StateInstance.watchers.push(
            new watchClass()
        );

        return this;
    }

    /**
     * Event executing
     * @param event_name
     * @param state_name
     * @param attrs
     * @private
     */
    _callEvent(event_name: string, state_name: string, ...attrs: any[]) {

        if (state_name.indexOf('.') >= 0) {

            let path: any = null;

            state_name.split('.').map(($new_name) => {

                if (!path) { path = $new_name; }
                else { path = `${path}.${$new_name}`; }

                if (path !== state_name) {

                    let attr = [];
                    attr.push(get(StateInstance.state, path));
                    attr.push(attrs[0]);
                    attr.push(attrs[1]);
                    attr.push(state_name.replace(`${path}.`, ''));
                    attrs.map((i, k) => { if (k > 1) { attr.push(i); }});

                    this._onceCallEvent(event_name, path, attr);
                }
            });
        }

        this._onceCallEvent(event_name, state_name, attrs);
    }

    /**
     * Single event call
     * @param event_name
     * @param state_name
     * @param attrs
     * @private
     */
    _onceCallEvent (event_name: string, state_name: string, attrs: any) {

        let storage = StateInstance.storage[state_name] !== undefined ? StateInstance.storage[state_name] : {},
            inner_params = [...attrs, state_name, event_name, storage];

        StateInstance.watchers.map((watcher: StateWatcherInterface) => watcher.call(event_name, state_name, inner_params).setStorage(storage));

        let doc_data = {
            value: attrs[0],
            old_value: attrs[1] !== undefined ? attrs[1] : undefined,
            state_name, event_name, storage};

        window.ljs._dispatch_event(`state:${event_name}:${state_name}`, doc_data)
            ._dispatch_event(`state:${event_name}`, doc_data)
            ._dispatch_event(`state:`, doc_data);

        let arr_data: any = Object.values(doc_data);

        this._dispatch_event(`${event_name}:${state_name}`, arr_data)
            ._dispatch_event(`${event_name}`, arr_data)
            ._dispatch_event('*', arr_data);
    }

    /**
     * Dispatch inner event
     * @param event_name
     * @param data
     * @private
     */
    _dispatch_event(event_name: string, data: [] = []) {

        if (event_name in StateInstance.events) {

            StateInstance.events[event_name].map((closure: () => void, key: number) => {

                let bind: any = StateInstance.binds[event_name][key];

                if (bind) {

                    closure = closure.bind(bind);
                }

                closure(...data);
            });
        }

        return this;
    }

    /**
     * Set event
     * @param event
     * @param closure
     * @param bind
     */
    on (event: any, closure: any = null, bind: any = null) {

        if (typeof event === 'function') { bind = closure; closure = event; event = "*"; }

        if (typeof closure !== 'function') { return window.ljs.$state; }

        let push: boolean = true;

        if (!(event in StateInstance.binds)) {

            StateInstance.binds[event] = [];
        }

        if (!(event in StateInstance.events)) {

            StateInstance.events[event] = [];
        }

        else {

            StateInstance.events[event].map((cl: () => void, key: number) => {

                if (cl === closure) {

                    StateInstance.events[event][key] = closure;
                    StateInstance.binds[event][key] = bind;

                    push = false
                }
            });
        }

        if (push) {

            StateInstance.events[event].push(closure);
            StateInstance.binds[event].push(bind);
        }

        return window.ljs.$state;
    }

    /**
     * Remove event
     * @param event
     * @param closure
     */
    off (event: any = null, closure: any = null) {

        if (typeof event === 'function') { closure = event; event = "*"; }
        if (event === null) { event = "*"; }

        if (event in StateInstance.events) {

            if (closure) {

                StateInstance.events[event].map((cl: any, key: number) => {

                    if (cl === closure) {

                        delete StateInstance.events[event][key];
                        delete StateInstance.binds[event][key];
                    }
                });

                if (!Object.values(StateInstance.events[event]).length) {

                    delete StateInstance.events[event];
                    delete StateInstance.binds[event];
                }
            }

            else {

                delete StateInstance.events[event];
                delete StateInstance.binds[event];
            }
        }

        return window.ljs.$state;
    }

    /**
     * Correct path
     * @param path
     * @returns {string}
     * @private
     */
    _correctPath (path: string) {

        return String(path).replace(/\[/g, '.').replace(/\]/g, '').replace(/[\.]+$/g, '');
    }
}