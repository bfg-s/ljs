import {ExecutorParent} from "../Extends/ExecutorParent";
import {Helper} from "../../Helper";
import map from 'lodash/map';
import * as clipboard from "clipboard-polyfill/text";
import {Clipboard} from "../Extends/Clipboard";

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

        if (this.target && this.target.name && !params) {
            params = {};
            params[this.target.name] = this.target.value;
        }

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
     * Copy data to clipboard
     * @param $data
     */
    pbcopy($data: string = "") {

        //Clipboard.copy($data);
        clipboard.writeText($data);
        return $data;
    }

    /**
     * Copy data to clipboard and show info
     * @param $data
     */
    informed_pbcopy ($data: string) {

        clipboard.writeText($data).then(() => {
            "toast::success".exec("Copied to clipboard");
        });

        // if (Clipboard.copy($data)) {
        //     "toast::success".exec("Copied to clipboard");
        // }

        return $data;
    }

    static __name () {

        return "doc";
    }
}
