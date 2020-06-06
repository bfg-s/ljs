import {Helper} from "../../Helper";
import Echo from 'laravel-echo';
import {EchoWrapper} from "./EchoWrapper";

window.EchoWrapper = EchoWrapper;

Helper.before_load((ljs: Ljs) => {

    let ssl: boolean = (location.protocol === 'https:');

    /**
     * New echo
     */
    ljs.echo = new Echo({
        broadcaster: 'pusher',
        client: require('pusher-js').default,
        key: ljs.config('ws_app_key', null),
        cluster: ljs.config('ws_app_cluster', null),
        wsHost: ljs.config('ws_host', null),
        wsPort: ljs.config('ws_port', 6001),
        wssPort: ljs.config('ws_port', 6001),
        forceTLS: ssl,
        csrfToken: ljs.token,
        disableStats: true,
        encrypted: true,
        enabledTransports: ['ws','wss'],
        disabledTransports: ['sockjs', 'xhr_polling', 'xhr_streaming'],
        namespace: ljs.config('ws_namespace', '')
    });
});