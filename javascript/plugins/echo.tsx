import {Helper} from "../Helper";
import Echo from 'laravel-echo';

Helper.before_load((ljs: Ljs) => {

    /**
     * New echo
     */
    ljs.echo = new Echo({
        broadcaster: 'pusher',
        client: require('pusher-js'),
        key: ljs.config('pusher_app_key', null),  //process.env.MIX_PUSHER_APP_KEY,
        cluster: ljs.config('pusher_app_cluster', null), //process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true
    });
});