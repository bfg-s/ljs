export class EchoHelp {

    /**
     * Listener name formatter
     * @param config
     * @param listener
     */
    static format(config: any, listener: string) {
        if (listener.charAt(0) !== '.') {
            if (config.namespace) {
                listener = `${config.namespace}.${listener}`;
            }
        } else {
            listener = listener.substr(1);
        }
        return window.ljs.help.camelize(listener, true);
    }

    /**
     * Format callback function
     * @param config
     * @param cb
     * @param connector
     */
    static cb_formatter(config: any, cb: any, connector: any) {
        if (config.bind) {
            if (!cb && config.event) {
                cb = config.event.replace(/[^a-zA-Z]/g, '_');
            }
            if (typeof cb === 'string' && config.bind[cb]) {
                return (params: any) => {
                    config.bind[cb](params, connector, config);
                }
            }
        }

        return (params: any) => {
            cb(params, connector, config);
        };
    }
}
