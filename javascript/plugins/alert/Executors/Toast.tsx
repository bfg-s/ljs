import map from 'lodash/map';
import {ExecutorParent} from "../../../ljs/Extends/ExecutorParent";

export class Toast extends ExecutorParent {

    /**
     * Public call
     * @param $name
     * @param message
     * @param title
     * @param options
     * @private
     */
    __call ($name: string, [message, title = null, options = {}]: any[]) {

        return Toast._send(message, title, options, $name);
    }

    /**
     * Static call
     * @param $name
     * @param message
     * @param title
     * @param options
     * @private
     */
    static __call ($name: string, [message, title = null, options = {}]: any) {

        return Toast._send(message, title, options, $name);
    }

    /**
     * Executor invoke
     *
     * @param message
     * @param title
     * @param options
     * @param type
     * @private
     */
    __invoke (message: any, title: any = null, options: any = {}, type: string = "info") {

        Toast._send(message, title, options, type);
    }

    /**
     * Private Toast sender
     *
     * @param message
     * @param title
     * @param options
     * @param type
     * @private
     */
    static _send (message: any, title: any = null, options: any = {}, type: string = "info") {

        if (typeof message === 'string') {

            (window.ljs.toast as any)[type](message, title, options);

            window.ljs._dispatch_event("ljs:alert_system", {type: type, text: message, title: title, options: options});

        } else if (typeof message === 'object') {

            if (message["title"] !== undefined && message["text"] !== undefined) {

                let key = type;

                if (message["type"] !== undefined && (window.ljs.toast as any)[message["type"]] !== undefined) {

                    key = message["type"];
                }

                window.ljs._dispatch_event("ljs:alert_system", {type: key, text: message["text"], title: message["title"], options: message["options"] !== undefined ? message["options"] : {}});

                (window.ljs.toast as any)[key](message["text"], message["title"], message["options"] !== undefined ? message["options"] : {});
            }

            else {

                map(message, (item, key) => {

                    if ((window.ljs.toast as any)[key] === undefined) {

                        key = type;
                    }

                    if (typeof item === 'string') {

                        (window.ljs.toast as any)[key](item);

                        window.ljs._dispatch_event("ljs:alert_system", {type: key, text: item, title: null, options: {} });
                    }

                    if (typeof item === 'object') {

                        (window.ljs.toast as any)[key](...item);

                        window.ljs._dispatch_event("ljs:alert_system", {type: key, text: item[0], title: item[1], options: item[2]!==undefined ? item[2] : {} });
                    }
                });
            }
        }
    }

    /**
     * Registration class name
     * @private
     */
    static __name () {

        return "toastr";
    }

    /**
     * Alert systems aliases
     */
    static __aliases () {

        return ["toast"] as any;
    }
}
