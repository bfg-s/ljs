import {LJSConstructor} from "../Extends/LJSConstructor";
import {LStorage} from "./LStorage";
import {StateInstance} from "./StateInstance";
import {ProServer} from "./ProServer";
import {JaxInstance} from "./JaxInstance";
import {Helper} from "../../Helper";
import merge from "lodash/merge";

export class LJS extends LJSConstructor implements Ljs {

    public process: boolean = false;
    public $state: StateInterface
    public $jax: JaxInterface
    public $ws: ProServerInterface
    public $storage: LStorageInterface
    public progress: NProgress
    public toast: Toastr|any
    public $nav: any
    public $vue: any
    public help: any
    public vue: any
    public swal: any
    public method: any
    public echo: Echo|null

    static $route_collection: any = {};


    constructor () {

        super();

        this.help = Helper;

        this.$storage = new LStorage(this);

        this.$state = new StateInstance(this.$storage);

        this.instance();

        this.$ws = new ProServer(this);

        this.$jax = new JaxInstance(this);

        this.progress = require("nprogress");

        this.echo = null;

        window.$state = this.$state;

        window.$ws = this.$ws;

        window.$jax = this.$jax;
    }

    /**
     * Switch process
     * @param data
     */
    switchProcess (data:any = null) {

        this.process = data !== null ? !!data : !this.process;

        return this;
    }

    /**
     * Is process status
     */
    isProcess () {

        return this.process;
    }

    /**
     * jax alias
     * @param name
     */
    jax (name: string) {

        return (this as any).$jax.cmd(name);
    }

    /**
     * Extend ljs
     * @param name
     * @param extendClass
     */
    extend (name: string, extendClass: any) {

        (this as any)[name] = new extendClass(this);

        return this;
    }

    /**
     * Register state watcher
     * @param watchClass
     */
    stateWatcher (watchClass: StateWatcherInterface) {

        if (!('call' in watchClass)) {

            if (process.env.NODE_ENV === 'development') {
                this._error('Must be a callable StateWatcher class!');
            }

            return this;
        }

        (this as any).$state.watcher(watchClass);

        return this;
    }

    /**
     * Application config accessor
     * @param name
     * @param value
     */
    cfg (name: string, value: any = null) {

        name = "lar-" + name;

        if (value === null) {

            return this._configs[name] !== undefined ? this._configs[name] : undefined

        } else {

            this._configs[name] = value;

            return value;
        }
    }

    /**
     * Get config value
     * @param name
     * @param default_data
     */
    config (name: string, default_data: any = null) {

        let data = this.cfg(name);

        data = data !== undefined ? data : default_data;

        data = data === "true" ? true : data;

        data = data === "false" ? false : data;

        return data;
    }

    /**
     * Application config setter with save
     * @param name
     * @param value
     * @param save
     */
    setCfg (name: string, value: any, save: boolean = true) {

        this.cfg(name, value);

        if (save) {

            (this as any).$storage.put(name, value, "config");
        }

        return this;
    }

    /**
     * Apply info for show details
     */
    applyInfo () {

        this.setCfg("apply_info", !this.cfg("apply_info"));

        return this.cfg("apply_info");
    }

    /**
     * Apply clear console on load
     */
    applyCleared () {

        this.setCfg("console_clear", !this.cfg("console_clear"));

        return this.cfg("console_clear");
    }

    /**
     * Make event on element
     * @param $selector
     */
    element ($selector: any) {

        return {
            on: (events: string, selector: any, data: any = undefined, handler: any = undefined) => $($selector).on(events, selector, data, handler)
        }
    }

    /**
     * Event maker
     * @param events
     * @param selector
     * @param data
     * @param handler
     */
    on (events: string, selector: any, data: any = undefined, handler: any = undefined) {

        return $(document).on(events, selector, data, handler);
    }

    /**
     * OneTime execute action
     * @param action
     * @param ms
     */
    onetime (action: any, ms: number = 100) {
        return "timer::onetime".exec(`ljs:${ms}:inner`, action, ms);
    }

    /**
     * Replenish route collection
     * @param $collection
     */
    routeCollection ($collection: any) {

        let host = window.location.host;

        if (host in $collection) {

            LJS.$route_collection = merge(LJS.$route_collection, $collection);
        }

        else {

            LJS.$route_collection[host] = merge(
                (host in LJS.$route_collection ? LJS.$route_collection[host] : {}),
                $collection
            );
        }
    }

    /**
     * Get route methods
     * @param $name
     */
    routeMethods ($name: string) {

        let host = window.location.host,
            protocol = window.location.protocol,
            collect = host in LJS.$route_collection ? LJS.$route_collection[host] : {};

        if (!($name in collect)) {

            return ['GET'];
        }

        return collect[$name].methods;
    }

    /**
     * Build and get route
     * @param $name
     * @param $params
     */
    route ($name: string, $params: any = {}) {

        let host = window.location.host,
            protocol = window.location.protocol,
            collect = host in LJS.$route_collection ? LJS.$route_collection[host] : {},
            re = /\{([a-zA-Z0-9\.\_\-]+)([\?]?)\}/g;

        if (!($name in collect)) {

            throw new Error(`Undefined route name [${$name}]`);
        }

        let route = collect[$name],
            result: any = {},
            results: any = [],
            uri: string = route.uri;

        while ((result = re.exec(uri)) !== null) {
            results.push(result);
        }

        results.map((result: any) => {
            if (!(result[1] in $params)) {
                if (result[2] !== '?') {
                    throw new Error(`Don't find required route param [${result[1]}]`);
                } else {
                    uri = uri.replace(result[0], '');
                }
            } else {
                uri = uri.replace(result[0], $params[result[1]]);
                delete $params[result[1]];
            }
        });

        let queries = this.help.http_build_query($params);

        return `${protocol}//${host}/${uri.replace(/\/\//g, '/').replace(/\/$/, '')}${queries ? `?${queries}`:''}`;
    }
}
