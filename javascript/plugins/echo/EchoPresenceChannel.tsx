import {EchoHelp} from "./EchoHelp";
import {EchoChannel} from "./EchoChannel";

export class EchoPresenceChannel extends EchoChannel implements LjsPresenceChannel {

    /**
     * EchoPresenceChannel constructor
     * @param connector
     * @param options
     */
    constructor(connector: any, options: any) {
        super(connector, options);
    }

    /**
     * Register a callback to be called anytime the member list changes.
     * @param callback
     */
    here(callback: Function | string | null = null) {
        this.connector.here(EchoHelp.cb_formatter(this.options, callback, this.connector));
        return this;
    }

    /**
     * Listen for someone joining the channel.
     * @param callback
     */
    joining(callback: Function | string | null = null) {
        this.connector.joining(EchoHelp.cb_formatter(this.options, callback, this.connector));
        return this;
    }

    /**
     * Listen for someone leaving the channel.
     * @param callback
     */
    leaving(callback: Function | string | null = null) {
        this.connector.leaving(EchoHelp.cb_formatter(this.options, callback, this.connector));
        return this;
    }

    /**
     * Compo presence
     * @param here
     * @param joining
     * @param leaving
     */
    presence(here: Function | string | null = null, joining: Function | string | null = null, leaving: Function | string | null = null) {
        if (here) {
            this.here(here);
        }
        if (joining) {
            this.joining(joining);
        }
        if (leaving) {
            this.leaving(leaving);
        }
        return this;
    }
}
