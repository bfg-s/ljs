import {LJS} from "./classes/LJS";
import {StateExec} from "./Executors/StateExec"
import {Script} from "./Executors/Script"
import {Tpl} from "./Executors/Tpl";
import {Timer} from "./Executors/Timer";
import {Doc} from "./Executors/Doc";
import {Helper} from "../Helper";
import isString from 'lodash/isString';
import get from 'lodash/get';

/**
 * Build core
 */
export class Core extends Helper{

    static loaded: boolean = false;

    /**
     * Make window global classes
     */
    static globalBootstrap () {

        window.Executor = require('./Extends/ExecutorParent')['ExecutorParent'];
        window.StateWatcher = require('./Extends/StateWatcher')['StateWatcher'];
        window.JaxModel = require('./classes/Model')['Model'];
        window.jax = new (window.JaxModel as any);
        window.state = new (require('./classes/State')['State']);

        window.__ = Core.lang;
        window.switchLocale = Core.switchLocale;

        return this;
    }

    /**
     * Lag getter
     * @param $path
     * @param $params
     */
    static lang ($path: string, $params: any = {}) {

        let result = get(window.locales, $path);

        if (result && typeof result === 'string') {
            Object.keys($params).map((key) => {
                result = result.replace(new RegExp(`\:${key}`, 'g'), $params[key])
            });
        }

        return result === undefined ? $path : result;
    }

    static switchLocale (locale: string) {

        let locales = window.locales ? Object.keys(window.locales) : []

        locales.map((group) => {
            $.getScript( `/locales/${locale}/${group}.js`);
        });

        window.ljs._dispatch_event('locale:switched', locale);
    }

    /**
     * Make JavaScript prototypes
     */
    static jsPrototypes () {

        String.prototype.parse = function (store:any = {}) {

            return window.ljs.parse(this.toString(), store);
        };
        String.prototype.exec = function (...params: (any[])[]) {

            return window.ljs.exec(this.toString(), params);
        };
        String.prototype.so = function (...params: (any[])[]) {

            return window.ljs.exec(this.toString(), params);
        };
        String.prototype.call = function (store: any = {}) {

            return window.ljs.call(this.toString(), store);
        };
        String.prototype.to = function (command: string, ...params: (any[])[]) {

            return window.ljs.exec(command, [this.toString(), ...params]);
        };
        Array.prototype.parse = function (store: any = {}) {

            return this.map(item => window.ljs.parse(item, store));
        };
        Array.prototype.exec = function (...params: (any[])[]) {

            return this.map(item => window.ljs.exec(item, params));
        };
        Array.prototype.call = function (store: any = {}) {

            return this.map(item => isString(item) ? window.ljs.call(item, store) : item);
        };
        Array.prototype.tom = function (command: string) {

            return this.map(item => window.ljs.exec(command, item));
        };
        Array.prototype.to = function (command: string, ...params: (any[])[]) {

            return window.ljs.exec(command, [...this, ...params]);
        };

        return this;
    }

    /**
     * Make ljs instance
     */
    static makeInstance () {

        if (!this.loaded) {

            LJS.instance()
                .regExec(StateExec)
                .regExec(Timer)
                .regExec(Doc)
                .regExec(Tpl)
                .regExec(Script);
        }

        return this;
    }
    
    /**
     * Set state loaded ljs
     */
    static loadedLjs () {

        if (!this.loaded) {

            window.ljs._dispatch_event("ljs:before_load")
                ._dispatch_event("ljs:load");

            this.loaded = true;
        }

        return this;
    }
}