import {LJSConstructor} from "../Extends/LJSConstructor";
import {LStorage} from "./LStorage";
import {StateInstance} from "./StateInstance";
import {ProServer} from "./ProServer";
import {JaxInstance} from "./JaxInstance";
import {Helper} from "../../Helper";

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


    constructor () {

        super();

        this.help = Helper;

        this.$storage = new LStorage(this);

        this.$state = new StateInstance();

        this.instance();

        this.$ws = new ProServer(this);

        this.$jax = new JaxInstance(this);

        this.progress = require("nprogress");

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

            return this._configs[name] !== undefined ? this._configs[name] : false

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

        data = data !== false ? data : default_data;

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
}
