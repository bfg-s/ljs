import map from "lodash/map";

export class ProServer implements ProServerInterface {

    public ljs: Ljs
    public link: string
    public disconnect_count: number
    public error_count: number
    public ws: WebSocket|null
    static events: any = {}
    static binds: any = {}
    static onconnectsend: any = []

    constructor(ljs: Ljs) {

        this.ljs = ljs;

        this.link = this.ljs.cfg("server");

        this.disconnect_count = 0;

        this.error_count = 0;

        this.ws = null;

        if (this.link && /^ws/.test(this.link)) {

            this.connect();

            this.onMessage();

            window.addEventListener('focus', () => {

                if (this.ws) {

                    this.ws.send(this.id);

                    if (this.ws.readyState === 3) {
                        this.reConnect();
                    }
                }
            });

        } else {

            if (process.env.NODE_ENV === 'development') {
                ljs._warn("ProServer not loaded!");
            }
        }
    }

    /**
     * ID getter
     */
    get id() {

        return this.ws ? this.ws.url.split("=")[1] : '';
    }

    /**
     * Make connect
     */
    connect () {

        this.ws = new WebSocket(this.link);

        this.ws.onclose = (e) => {

            if (process.env.NODE_ENV === 'development') {
                this.ljs._detail("WebSocket disconnected!");
            }

            this.disconnect_count++;
        };

        this.ws.onerror = (e) => {

            if (this.error_count > 500) {

                location.reload();
            }

            else {

                if (this.error_count < 10) {

                    this.reConnect();
                }
            }

            if (process.env.NODE_ENV === 'development') {
                this.ljs._error("WebSocket error:", e);
            }
            this.ljs._dispatch_event("ws:error", {ws: this.ws, error: e});

            this.error_count++;
        };

        this.ws.onopen = () => {

            if (process.env.NODE_ENV === 'development') {
                this.ljs._detail("WebSocket connected!");
            }
            this.ljs._dispatch_event("ws:open", this.ws);
        };

        return this;
    }

    /**
     * Disconnect connection
     */
    disconnect () {

        if (this.ws) {

            this.ws.onclose = function () {};
            this.ws.close();
        }

        this.ws = null;

        return this;
    }

    /**
     * Make event on message ws
     */
    onMessage () {

        if (this.ws) {

            this.ws.onmessage = (event) => {

                let _data: any = {};

                try {

                    _data = JSON.parse(event.data);

                    if (_data['registered']) {

                        ProServer.onconnectsend.map((eve: any, k: number) => {
                            this.ws?.send(eve);
                            delete ProServer.onconnectsend[k];
                        });
                    }

                    map(_data, (data: any, key: any) => {

                        if (key in ProServer.events) {

                            ProServer.events[key].map((closure: any, k: number) => {

                                if (closure) {

                                    let bind: any = ProServer.binds[key][k];

                                    if (bind) {

                                        closure = closure.bind(bind);
                                    }

                                    closure(data);
                                }
                            });
                        }

                        else {

                            let result = this.ljs.exec(key, data, {ws: this});
                            this.ljs._detail('Exec ws', key, data, result);
                        }
                    });
                }
                catch (e) {

                }

                if (process.env.NODE_ENV === 'development') {
                    this.ljs._detail("onMessage data:", _data);
                }
            };
        }

        return this;
    }

    /**
     * Add event
     * @param event
     * @param closure
     * @param bind
     */
    on (event: any, closure: any = null, bind: any = null) {

        if (typeof event === 'function') { bind = closure; closure = event; event = "*"; }

        if (!(event in ProServer.binds)) {

            ProServer.binds[event] = [];
        }

        if (!(event in ProServer.events)) {

            ProServer.events[event] = [];
        }

        let has = false;

        ProServer.events[event].map((hasClosure: any, key: number) => {

            has = closure === hasClosure;

            if (has) {

                ProServer.events[event][key] = closure;
                ProServer.binds[event][key] = bind;
            }
        });
        
        if (!has) {

            ProServer.events[event].push(closure);
            ProServer.binds[event].push(bind);
        }

        if (this.ws && this.id && event !== '*' && event !== 'server_time') {
            let eve = JSON.stringify({CLIENT: this.id, EMIT: event, ON: true});
            if (this.ws.readyState === 1) {
                this.ws.send(eve);
            } else {
                ProServer.onconnectsend.push(eve);
            }
        }

        return this;
    }

    /**
     * Off event
     * @param event
     * @param closure
     */
    off (event: any = null, closure: any = null) {

        if (typeof event === 'function') { closure = event; event = "*"; }
        if (event === null) { event = "*"; }

        if (event in ProServer.events) {

            if (closure) {

                ProServer.events[event].map((original: any, key: number) => {

                    if (original === closure) {

                        delete ProServer.events[event][key];
                        delete ProServer.binds[event][key];
                    }
                });

                if (!Object.values(ProServer.events[event]).length) {

                    delete ProServer.events[event];
                    delete ProServer.binds[event];

                    if (this.ws && this.id && event !== '*' && event !== 'server_time') {
                        this.ws.send(JSON.stringify({CLIENT: this.id, EMIT: event, OFF: true}));
                    }
                }
            }


            else {

                delete ProServer.events[event];
                delete ProServer.binds[event];

                if (this.ws && this.id && event !== '*' && event !== 'server_time') {
                    this.ws.send(JSON.stringify({CLIENT: this.id, EMIT: event, OFF: true}));
                }
            }
        }

        return this;
    }

    /**
     * Run reconnect procession
     */
    reConnect() {

        if (process.env.NODE_ENV === 'development') {
            this.ljs._detail("Reconnect begin...");
        }

        $.get(window.location.href).then(() => {

            if (process.env.NODE_ENV === 'development') {
                this.ljs._detail("Reconnected!");
            }

            this.resetConnect();
        });

        return this;
    }

    /**
     * Reset connection
     */
    resetConnect() {

        this.disconnect();

        setTimeout(() => {

            this.connect();

            this.onMessage();

        }, 500);

        return this;
    }

    /**
     * Send data on executor
     * @param execute
     * @param data
     */
    send (execute: any, data: any = null) {

        if (this.ws) {

            if (!data) {

                data = null;
            }

            let _send = {ID: this.link.split("=")[1], EXECUTE: execute, DATA: data};

            this.ws.send(JSON.stringify(_send))

            if (process.env.NODE_ENV === 'development') {
                this.ljs._detail("WS Send:", _send);
            }
        }

        return this;
    }
}
