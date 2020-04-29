import merge from 'lodash/merge';
import {HTMLReady} from "../../../ljs/data/HTMLReady"

export class Nav {

    public ljs: Ljs
    public cancelContext: boolean

    constructor (ljs: Ljs) {

        this.ljs = ljs;

        this.cancelContext = false;

        if (ljs.cfg("pjax-container")) {

            this._configure()
                ._set_events();

        } else {

            if (process.env.NODE_ENV === 'development') {
                ljs._warn("Nav not loaded!");
            }
        }
    }

    goTo(path: string = "/") {

        if (this.ljs.cfg("pjax-container")) {

            ($ as any).pjax({url: path, container: this.ljs.cfg("pjax-container")});
        }

        else {

            window.location = (path as any);
        }
    }

    reload() {

        this.goTo(window.location.href);
    }

    change_url (url: any, title: any = null, data: any = null) {

        if (typeof url === 'object') {

            url = `${window.location.origin}${window.location.pathname}?${decodeURI(jQuery.param(url))}`;
        }

        if (typeof title === 'object') {

            let params = decodeURI(jQuery.param(title));

            if (params) {

                url = `${url}?${params}`;
            }
        }

        let dataState;

        if (data) {

            dataState = merge(data, window.$state.all())
        }

        else {

            dataState = window.$state.all();
        }

        return window.history.pushState(dataState, title, url);
    }

    _configure () {

        ($ as any).pjax.defaults.timeout = 5000;

        ($ as any).pjax.defaults.maxCacheLength = 0;

        return this;
    }

    _set_events () {

        if (!('$' in window)) {

            return ;
        }

        ($(document) as any).pjax('a:not([target]):not([href^="#"]):not([data-href])', {

            container: window.ljs.cfg("pjax-container")
        });

        $(document).on('submit', 'form:not([target]):not([tabindex])', (event: any) => {

            ($ as any).pjax.submit(event, this.ljs.cfg("pjax-container"));
        });

        $(document).on('pjax:beforeSend', (event: any, xhr: any) => {

            xhr.setRequestHeader('X-CSRF-TOKEN', this.ljs.cfg('token'));
        });

        $(document).on('pjax:timeout', (event: any) => {

            event.preventDefault();

            if (process.env.NODE_ENV === 'development') {
                this.ljs._warn("Pjax TimeOut:", event);
            }
        });

        $(document).on("pjax:popstate", () => {

            $(document).on("pjax:end", (event) => {

                $(event.target).find("script[data-exec-on-popstate]").each(function () {

                    $.globalEval((this as any).text || this.textContent || this.innerHTML || '');
                });
            });
        });

        $(document).on('pjax:send', (xhr) => {

            this.ljs.progress.start();

            document.body.style.cursor = "progress";

            this.ljs.switchProcess(true);

            this.ljs._dispatch_event("ljs:nav:send", {nav: this, xhr});
        });

        $(document).on('pjax:beforeReplace', (a,b,c,d) => {

            if (!this.cancelContext && this.ljs.$vue) {

                this.ljs.$vue.destroyGroup(this.ljs.$vue.group());
            }

            d.cancelContext(this.cancelContext);
        });

        $(document).on('pjax:complete', (xhr, req, status, q, w, r) => {

            this.ljs.exec('var::clear');

            document.body.style.cursor = "auto";

            this.ljs.switchProcess(false);

            this.ljs._onload_header(req.getAllResponseHeaders());

            if (status !== 'error' && !document.querySelector(this.ljs.cfg("pjax-container"))) {

                this.cancelContext = true;

                window.location.reload();

                return ;
            }

            try {

                this.ljs.executor.doc.counters = {};

            }catch (e) {}

            let obj = document.querySelector(this.ljs.cfg("pjax-container"));

            if (obj) {

                new HTMLReady(obj);
            }

            this.ljs.progress.done();

            this.ljs._dispatch_event("ljs:nav:complete", {nav: this, req, xhr, container: obj});
        });

        $(document).on('pjax:error', (xhr, textStatus, error, options) => {

            document.body.style.cursor = "auto";

            this.ljs.progress.done();

            this.ljs.switchProcess(false);

            this.ljs._dispatch_event("ljs:nav:error", {nav: this, xhr, textStatus, error, options});
        });

        return this;
    }
}