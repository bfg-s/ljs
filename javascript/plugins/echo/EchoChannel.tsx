import {EchoHelp} from "./EchoHelp";

export class EchoChannel implements LjsChannel {

    /**
     * The Echo options.
     */
    options: any;

    /**
     * The echo connector.
     */
    connector: LjsChannel|any;

    /**
     * Channel constructor
     * @param connector
     * @param options
     */
    constructor(connector: any, options: any) {
        this.options = options;
        this.connector = connector;
    }

    /**
     * Listen for an event on the channel instance.
     * @param event
     * @param callback
     */
    listen(event: string, callback: Function|string|null = null) {
        this.options.event = event;
        this.connector.listen(EchoHelp.format(this.options, event), EchoHelp.cb_formatter(this.options, callback, this.connector));
        return this;
    }

    /**
     * Listen for a whisper event on the channel instance.
     * @param event
     * @param callback
     */
    listenForWhisper(event: string, callback: Function|string|null = null) {
        this.options.event = event;
        this.connector.listenForWhisper(event, EchoHelp.cb_formatter(this.options, callback, this.connector));
        return this;
    }

    /**
     * Listen for an event on the channel instance.
     * @param callback
     */
    notification(callback: Function|string|null = null) {
        this.connector.notification(EchoHelp.cb_formatter(this.options, callback, this.connector));
        return this;
    }

    /**
     * Stop listening to an event on the channel instance.
     * @param event
     */
    stopListening(event: string) {
        this.options.event = event;
        this.connector.stopListening(EchoHelp.format(this.options, event));
        return this;
    }

    /**
     * Stop listening for a whispser event on the channel instance.
     * @param event
     */
    stopListeningForWhisper(event: string) {
        this.options.event = event;
        this.connector.stopListeningForWhisper(EchoHelp.format(this.options, event));
        return this;
    }

    /**
     * To broadcast client events
     * @param event
     * @param data
     */
    whisper (event: string, data: any) {
        this.connector.whisper(event, data);
        return this;
    }
}