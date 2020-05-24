import {HTMLReady} from './HTMLReady';
import {HTMLDataEvent} from './HTMLDataEvent';
import map from 'lodash/map';
import isNaN from 'lodash/isNaN';
import get from 'lodash/get';

export class HTMLRegisterEvents {

    public ljs: Ljs

    constructor(ljs: Ljs) {

        this.ljs = ljs;

        this.stateChanged()
            .makeEvents()
            .dynamicElements()
            .dataHref()
            .makePopState();
    }

    /**
     * Make pop state navigation
     */
    makePopState () {

        window.onpopstate = (event: any) => {

            if (event.state !== null) {

                window.$state.merge(event.state);
            }

            else {

                window.$state.clear_all();
            }
        };

        return this;
    }

    /**
     * Make data href click
     */
    dataHref () {

        window.ljs.on('click', '[data-href]', (event: any) => {

            if (event.target.hasAttribute('href') || event.target.closest('a[href]')) {
                if (event.target.nodeName === 'A' && event.target.getAttribute('href')) {
                    "doc::location".exec(event.target.getAttribute('href'));
                }
                return false;
            }

            let href = event.target.dataset.href;

            if (!href) href = event.currentTarget.dataset.href;

            if (href) "doc::location".exec(href);
        });

        return this;
    }

    /**
     * Watcher on dynamic elements
     */
    dynamicElements () {

        setTimeout(() => {

            let timerId: any = 0;

            document.addEventListener("DOMNodeInserted", (event: any) => {

                if (event.relatedNode && !event.relatedNode.matches('body') && !event.relatedNode.matches('html')) {

                    if (timerId) {
                        clearTimeout(timerId);
                    }

                    timerId = setTimeout(() => {

                        new HTMLReady(event.relatedNode);

                    }, 200);
                }

            }, false);

        }, 300);

        return this;
    }

    /**
     * MakeEvents on datasets
     */
    makeEvents () {

        map([
            'click', 'submit', 'dblclick', 'change', 'blur', 'focus',
            'formchange', 'forminput', 'input', 'keydown', 'keypress',
            'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover',
            'mouseup', 'mousewheel', 'hover'
        ], (event_name) => {

            let eve = event_name;

            if (eve === 'hover') eve = 'mouseover';

            window.ljs.on(eve, `[data-${event_name}]`, (event: any) => {

                new HTMLDataEvent(event_name, event);
            });

            window.ljs.on(eve, `[data-${event_name}-jax]`, (event: any) => {

                let paramsName = `${event_name}Params`,
                    paramName = `${event_name}Param`,
                    propsName = `${event_name}Props`,
                    propName = `${event_name}Prop`,
                    jaxName = `${event_name}Jax`,
                    obj = event.currentTarget,
                    data = obj.dataset,
                    storage = {object: obj, target: event.target, event, eventName: event_name},
                    params = data[paramsName]? data[paramsName] : (data[paramName] ? data[paramName] : (data.params ? data.params : (data.param ? data.param : null))),
                    props = data[propsName]? data[propsName] : (data[propName] ? data[propName] : data.props ? data.props : (data.prop ? data.prop : [])),
                    withs = data.with ? data.with : {};

                try { params = JSON.parse(params); }catch (e) { if (typeof params === "string") { params = params.split('&&').map(i => i.trim().call(storage)); } }
                try { withs = JSON.parse(withs); }catch (e) { if (typeof withs === "string") { withs = withs.split('&&').map(i => i.trim()); } }
                try { props = JSON.parse(props); }catch (e) { if (typeof props === "string") { props = props.split('&&').map(i => i.trim().call(storage)); } }

                let jax = window.jax.with(withs).storage(storage);

                if (params) { jax = jax.params(params); }

                let ja = get(
                    jax,
                    data[jaxName]
                );

                if (!Array.isArray(props)) props = [props];

                ja(...props).then();
            });

            let $methods: any = ["delete","get","post","put","head"];

            $methods.map((meth: string) => this.makeJaxMethods(eve, event_name, meth))
        });

        return this;
    }

    /**
     * Create method jax
     * @param on_eve
     * @param event_name
     * @param method
     */
    makeJaxMethods (on_eve: string, event_name: string, method: string) {

        window.ljs.on(on_eve, `[data-${event_name}-${method}]`, (event: any) => {

            let m = method[0].toUpperCase() + method.slice(1);

            let paramsName = `${event_name}Params`,
                paramName = `${event_name}Param`,
                obj = event.currentTarget,
                data = obj.dataset,
                jaxUrl = data[`${event_name}${m}`],
                storage = {object: obj, target: event.target, event, eventName: event_name, request_method: method, request_url: jaxUrl},
                params = data[paramsName]? data[paramsName] : (data[paramName] ? data[paramName] : (data.params ? data.params : (data.param ? data.param : {})));

            try { params = JSON.parse(params); }catch (e) { if (typeof params === "string") { params = {data: params}; } }

            (window.$jax as any)[method](jaxUrl, params, storage);
        });
    }

    /**
     * Register data events state change
     */
    stateChanged () {

        this.ljs.on('state:changed', ({detail: {value, state_name}}: any) => {

            document.querySelectorAll(`[data-value]`).forEach((obj: any) => {

                let val = obj.dataset.value ? eval(obj.dataset.value) : null;

                val = isNaN(val) ? '' : val;

                obj.value = val;

                if (obj.type === 'checkbox' || obj.type === 'radio') {

                    obj.checked = !!val;
                }

                obj.dispatchEvent(new Event("change"));
            });

            document.querySelectorAll(`[data-htmml]`).forEach((obj: any) => {

                let val = obj.dataset.value ? eval(obj.dataset.value) : null;

                val = isNaN(val) ? '' : val;

                obj.innerText = val;
            });
        });

        this.ljs.on('state:changed', ({detail: {value, state_name}}: any) => {

            if (window.state.has(state_name) || value) {

                document.querySelectorAll(`[data-stated='${state_name}']`).forEach((obj: any) => {

                    if (obj.value !== undefined) {

                        obj.value = value;

                        if (obj.type === 'checkbox' || obj.type === 'radio') {

                            obj.checked = !!value;
                        }

                        obj.dispatchEvent(new Event("change"));
                    }

                    else {

                        obj.innerText = value;
                    }
                });
            }
        });

        return this;
    }
}
