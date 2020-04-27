import {ExecutorParent} from "../Extends/ExecutorParent";
import {Helper} from "../../Helper";
import map from 'lodash/map';

export class Doc extends ExecutorParent {

    public counters: any

    constructor (ljs: Ljs) {

        super(ljs);

        this.counters = {};
    }

    /**
     * Include many scripts
     */
    scripts () {

        return map(arguments, (url) => this.script(url));
    }

    /**
     * Include script
     * @param script_url
     */
    script (script_url: string) {

        let el: any = document.createElement("SCRIPT");

        el.src = script_url;

        document.head.appendChild(el);

        return el;
    }

    /**
     * Set document title
     *
     * @param value
     */
    title (value: string) {

        document.title = value;
    }

    /**
     * Dispatch custom event
     *
     * @param $event
     */
    dispatch_event ($event: string) {

        return window.ljs._dispatch_event($event, window.ljs);
    }

    /**
     * Global redirect
     * @param url
     */
    redirect (url: any) {

        if (url) {

            window.location = url;
        }
    }

    /**
     * Set new location
     * @param location_path
     * @param params
     */
    location (location_path: any, params: any = null) {

        if (location_path instanceof HTMLElement) {

            params = {[(location_path as any).name]: (location_path as any).value};
            location_path = location.origin + location.pathname;
        }

        if (params instanceof HTMLElement) {

            params = {[(location_path as any).name]: (location_path as any).value};
        }


        if (typeof location_path === 'object') {

            params = location_path;
            location_path = location.origin + location.pathname;
        }

        if (location_path === '') { location_path = location.origin + location.pathname; }
        if (!location_path) { location_path = location.origin + location.pathname; }


        if (typeof params !== 'string' && params && location_path) {

            if (!/\?/.test(location_path)) { location_path += '?'; }
            else { location_path += '&'; }

            location_path += Helper.http_build_query(params);
        }

        if (typeof params === 'string') {

            if (!/\?/.test(location_path)) { location_path += '?'; }
            else { location_path += '&'; }

            location_path += params;
        }

        if (location_path) {

            if (window.ljs.$nav) {

                window.ljs.$nav.goTo(location_path);
            }

            else {

                location = location_path;
            }
        }
    }

    /**
     * location with query
     * @param params
     */
    query (params: any = '') {

        return this.location('', params);
    }

    /**
     * Reload page
     */
    reload () {

        if (window.ljs.$nav) {

            return window.ljs.$nav.reload();
        }

        else {

            return location.reload();
        }
    }

    /**
     * History back
     */
    back () {

        window.history.back();
    }

    /**
     * Scroll to element
     * @param $element
     * @param $ms
     */
    scroll_to ($element: any = 'body', $ms: number = 1000) {

        let elem = $($element).offset();

        return $('html, body').animate({
            scrollTop: elem ? elem.top : 0
        }, $ms);
    }

    /**
     * Copy data to bp
     * @param $data
     * @returns {string}
     */
    pbcopy($data: string = "") {

        if (window.$state.has($data)) $data = window.$state.get($data);
        const el = document.createElement('textarea');
        el.value = $data;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        document.execCommand("copy");
        return $data;
    }

    /**
     * Jax request
     * @param data
     */
    jax (data: any) {

        if (typeof data === 'object') {

            map(data, (actions, executor) => {

                let onSuccess = null;

                let onError = null;

                let onDone = null;

                let params = null;

                let withParams = {};

                let jax = window.ljs.$jax.cmd(executor);

                if (typeof actions === 'string') {

                    jax.call(actions);
                }

                else if (typeof actions === 'object') {

                    if (actions.onSuccessData !== undefined && typeof actions.onSuccessData === 'object') {

                        onSuccess = actions.onSuccessData;

                        delete actions.onSuccessData;
                    }

                    if (actions.onErrorData !== undefined && typeof actions.onErrorData === 'object') {

                        onError = actions.onErrorData;

                        delete actions.onErrorData;
                    }

                    if (actions.onDoneData !== undefined && typeof actions.onDoneData === 'object') {

                        onDone = actions.onDoneData;

                        delete actions.onDoneData;
                    }

                    if (actions.params !== undefined && typeof actions.params === 'object') {

                        params = actions.params;

                        delete actions.params;
                    }

                    if (actions.with !== undefined && typeof actions.with === 'object') {

                        if (process.env.NODE_ENV === 'development') {
                            window.ljs._detail("Jax with JS params from object:", this.storage);
                        }

                        jax.with(actions.with);

                        delete actions.with;
                    }

                    if (actions.counter !== undefined && typeof actions.counter === 'object') {

                        if (this.counters[executor] === undefined) {this.counters[executor] = {};}

                        map(actions.counter, (i, name) => {

                            if (this.counters[executor][name] === undefined) {

                                this.counters[executor][name] = i;
                            }

                            else {

                                this.counters[executor][name] += 1;
                            }
                        });

                        delete actions.counter;
                    }

                    if (actions.withGet !== undefined) {

                        if (actions.withGet) {

                            jax.emitGet();
                        }

                        delete actions.withGet;
                    }

                    map(actions, (params, action) => {

                        jax.call(action, params);
                    });
                }

                if (this.counters[executor] !== undefined) {

                    jax.mergeParams(this.counters[executor]);
                }

                if (params) {

                    jax.mergeParams(params);
                }

                jax.mergeParams(withParams);

                if (onSuccess) {

                    jax.onSuccess(onSuccess);
                }

                if (onError) {

                    jax.onError(onError);
                }

                if (onDone) {

                    jax.onDone(onDone);
                }

                jax.send();
            });

        }

    }

    static __name () {

        return "doc";
    }
}
