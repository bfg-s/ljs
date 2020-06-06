import {EchoChannel} from "./EchoChannel";
import {EchoPresenceChannel} from "./EchoPresenceChannel";

export class EchoWrapper implements LjsEcho {

    /**
     * The echo connector.
     */
    connector: any;

    /**
     * The Wrapper options.
     */
    options: any;

    /**
     * All created chanels
     */
    channels: any;

    /**
     * Wrapper constructor
     * @param options
     */
    constructor(options: any = {}) {
        this.connector = window.ljs.echo;
        this.options = options;
        this.channels = [];
    }

    /**
     * Get a channel instance by name.
     * @param channel
     */
    channel(channel: string) {
        this.options.channel = channel;
        this.channels.push(channel);
        return new EchoChannel(this.connector.channel(channel), this.options);
    }

    /**
     * Get a presence channel instance by name.
     * @param channel
     */
    join(channel: string) {
        this.options.channel = channel;
        this.channels.push(channel);
        return new EchoPresenceChannel(this.connector.join(channel), this.options);
    }

    /**
     * Listen for an event on a channel instance.
     * @param channel
     * @param event
     * @param callback
     */
    listen(channel: string, event: string, callback: Function|string) {
        return this.channel(channel).listen(event, callback)
    }

    /**
     * Get a private channel instance by name.
     * @param channel
     */
    private(channel: string) {
        this.options.channel = channel;
        this.channels.push(channel);
        return new EchoChannel(this.connector.private(channel), this.options);
    }

    /**
     * Get a private encrypted channel instance by name.
     * @param channel
     */
    encryptedPrivate(channel: string) {
        this.options.channel = channel;
        this.channels.push(channel);
        return new EchoChannel(this.connector.encryptedPrivate(channel), this.options);
    }

    /**
     * Leave the given channel, as well as its private and presence variants.
     * @param channel
     */
    leave(channel: string) {
        this.options.channel = channel;
        this.connector.leave(channel);
        return this;
    }

    /**
     * Leave the given channel.
     * @param channel
     */
    leaveChannel(channel: string) {
        this.options.channel = channel;
        this.connector.leaveChannel(channel);
        return this;
    }

    /**
     * Leave tall registered channels.
     */
    leaveRegistered() {
        this.channels.map((channel: string) => this.leave(channel));
        return this;
    }

    /**
     * Disconnect from the Echo server.
     */
    disconnect() {
        this.connector.disconnect();
    }

    /**
     * Get the Socket ID for the connection.
     */
    socketId() {
        return this.connector.socketId();
    }
}