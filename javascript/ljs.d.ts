
declare interface Model {
    withoutGlobalScope ($scope: string): Model //Remove a registered global scope.
    withoutGlobalScopes ($scopes: string[]): Model //Remove all or passed registered global scopes.

    whereKey ($id: string): Model //Add a where clause on the primary key to the query.
    whereKeyNot ($id: string): Model //Add a where clause on the primary key to the query.
    where ($column: string, $operator?: string, $value?: any, $boolean?: string): Model //Add a basic where clause to the query.
    firstWhere ($column: string, $operator?: string, $value?: any, $boolean?: string): Model //Add a basic where clause to the query, and return the first result.
    orWhere ($column: string, $operator?: string, $value?: any): Model //Add an "or where" clause to the query.
    latest ($column?: string): Model //Add an "order by" clause for a timestamp to the query.
    oldest ($column?: string): Model //Add an "order by" clause for a timestamp to the query.
    find($id?: number|string, $columns?: string[]): Model //Find a model by its primary key.
    findMany($ids?: number|string, $columns?: string[]): Model //Find multiple models by their primary keys.
    findOrFail($id?: number|string, $columns?: string[]): Model //Find a model by its primary key or throw an exception.
    findOrNew($id?: number|string, $columns?: string[]): Model //Find a model by its primary key or return fresh model instance.

}

declare interface Window {
    Executor: ExecutorParentInterface,
    StateWatcher: StateWatcherInterface,
    Model: any,
    User: any,
    jax: any,
    state: any|StateMagic,
    ljs: Ljs,
    on_apply: any|object
    $state: StateInterface
    $ws: ProServerInterface
    $jax: JaxInterface
    $nav: any
    EchoWrapper: LjsEcho|any
    JaxWrapper: any
}

declare interface Ljs {
    _configs: any
    executor: any
    executor_lite: any
    isLocal: boolean
    process: boolean
    token: string
    $state: StateInterface
    $jax: JaxInterface
    $ws: ProServerInterface
    $storage: LStorageInterface
    $nav: any
    $vue: any
    help: any|Helper
    vue: any
    swal: any
    toast: Toastr
    progress: NProgress
    echo: Echo|null
    method: any
    exec (data: any, params?: any, storage_data?: any): any
    parse (str: string, storage?: any): any
    call (command: string, storage?: any): any
    removeExec (event_name: string): Ljs
    toExec (name: string, closure: any): Ljs
    regExec (object: any): Ljs
    switchProcess (data?: any): Ljs
    isProcess (): boolean
    jax (name: string): any
    extend (name: string, extendClass: any): Ljs
    stateWatcher (watchClass: any): Ljs
    cfg (name: string, value?: any): any
    config (name: string, default_data?: any): any
    setCfg (name: string, value: any, save?: boolean): Ljs
    applyInfo (): boolean
    applyCleared (): boolean
    element ($selector: any): {on (events: string, selector: any, data?: any, handler?: any): any}
    on (events: string, selector: any, data?: any, handler?: any): any
    onetime (action: any, ms?: number): any
    instance (): void
    _apply_instance (): Ljs
    _apply_events (): Ljs
    _get_save_configs (): void
    _onload_header (headers: string): void
    _local (): string
    _dispatch_event (name: string, detail?: any): Ljs
    _log (data: any, type?: string): void
    _error (...args: any[]): void
    _info (...args: any[]): void
    _detail (...args: any[]): void
    _warn (...args: any[]): void
    _special_object (name: string, data: any): void
    _find_and_execute_command (key: any, item: any, storage_data: any): any
    _force_object (obj: any, fool_method: any, params: any, call: boolean, storage: any): any
    _get_force_object (name: any, return_static: any, storage: any): any
    _checkSend(data: any, storage_data: any): any
    _jqueryed (obj: any, name: string): any
    _query (name: string): any
}

declare interface Helper {
    before_load(applyScript: () => void): Helper
    document_load(readyScript: () => void): Helper
    ready_script(readyFn: () => void): Helper
    isArrayOrObject(val: any): boolean
    isObject(val: any): boolean
    isEmptyObject(val: any): boolean
    dot(obj: any, tgt?: any, path?: any, useBrackets?: boolean, keepArray?: boolean, separator?: string): any
    http_build_query(obj: any, num_prefix?: number|null, temp_key?: string|null): any
    query_get(name?: string|null): any
    string_is(pattern: string, text: string): boolean
}

declare interface StateWatcherInterface {
    path: any
    storage: any
    data: any
    currentTarget?: HTMLElement|any|null
    target?: HTMLElement|any|null
    trace?: object|undefined
    event?: Event|null
    jq?: any
    setStorage (storage: any): StateWatcherInterface|any
    call ($event: string, $name: string, $data: any): StateWatcherInterface|any
}

declare interface ExecutorParentInterface {
    ljs: any
    name: string
    __now_method: any
    now_method: any
    target: HTMLElement|any|null
    preventDefault (): boolean
    data ($name: string, $default: any): any
}

declare interface StateInterface {
    all (): any
    get (path: string, defaults?: any): any
    set (path: string, value: any): any|StateInterface
    delete (path: string): boolean
    deleted (paths: any): any|StateInterface
    has (path: string): boolean
    make_storage (path: string, storage: any): any|StateInterface
    merge (set_state: object): any|StateInterface
    save (path: string): boolean
    delete_all (): any|StateInterface
    clear_all (defaults?: any): any|StateInterface
    watcher (watchClass: StateWatcherInterface): any|StateInterface
    on (event: any, closure?: any, bind?: any): any|StateInterface
    off (event?: any, closure?: any): any|StateInterface
    _callEvent(event_name: string, state_name: string, ...attrs: any[]): void
    _onceCallEvent (event_name: string, state_name: string, attrs: any): void
    _dispatch_event(event_name: string, data: any): StateInterface
    _correctPath (path: string): string
}

declare interface StateMagic extends StateInterface{
    '*': any
}

declare interface String {
    parse(store : object) : string;
    exec(...params : any[]) : string;
    so(...params : any[]) : string;
    call(store : object) : string;
    to(command : any, params : any[]) : string;
}

declare interface Array<T> {
    parse(store : object) : object;
    exec(...params : any[]) : object;
    call(store : object) : object;
    tom(command : any) : object;
    to(command : any, params : any[]) : object;
}

declare interface JaxInterface {
    ljs: Ljs
    jax_executor: JaxExecInterface
    post (path: string, params?: any, storage?: any): any|Promise<JaxInterface>
    get (path: string, params?: any, storage?: any): any|Promise<JaxInterface>
    head (path: string, params?: any, storage?: any): any|Promise<JaxInterface>
    put (path: string, params?: any, storage?: any): any|Promise<JaxInterface>
    del (path: string, params?: any, storage?: any): any|Promise<JaxInterface>
    exec (data: JaxExecInterface): any|Promise<JaxExecControllerInterface>
    cmd (name: string): JaxExecControllerInterface
    _sendAjax(method: string, path: string, params: any, storage: any): any|Promise<JaxInterface>
}

declare interface JaxExecInterface {
    collect: any
    params: any
    storage: any
    onsuccess: any
    onerror: any
    ondone: any
    state: any
    get_emit: boolean
    cmd (name: string): JaxExecControllerInterface
    onSuccess (data: any, val?:any): JaxExecInterface
    onError (data: any, val?:any): JaxExecInterface
    onDone (data: any, val?: any): JaxExecInterface
    merge (object: object): JaxExecInterface
    toState (path: string): JaxExecInterface
    exclude (name: string): JaxExecInterface
    send (name?: any): any|Promise<JaxExecInterface>
    emitGet (): JaxExecInterface
    toStorage (storage: any): JaxExecInterface
    render (): any
    getParams (): any
    getStorage (): any
    mergeParams (data: any): JaxExecInterface
    setWith (name: string, val: any): JaxExecInterface
    _callEvent (name: string, params: any): JaxExecInterface
}

declare interface JaxExecControllerInterface {
    with (withs: object): JaxExecControllerInterface
    call (name: string, params?: any): JaxExecControllerInterface
    get (name: string|number): any
    remove (name: string|number): JaxExecControllerInterface
    send (): any|Promise<JaxExecControllerInterface>
    onSuccess (data: any, val?:any): JaxExecControllerInterface
    onError (data: any, val?:any): JaxExecControllerInterface
    onDone (data: any, val?:any): JaxExecControllerInterface
    mergeParams (data: object): JaxExecControllerInterface
    storage (storage: any): JaxExecControllerInterface
    state (path: string): JaxExecControllerInterface
    emitGet (): JaxExecControllerInterface
}

declare interface ProServerInterface {
    ljs: Ljs
    link: string
    disconnect_count: number
    error_count: number
    ws: WebSocket|null
    id: string
    connect (): ProServerInterface
    disconnect (): ProServerInterface
    onMessage (): ProServerInterface
    reConnect(): ProServerInterface
    resetConnect(): ProServerInterface
    send (execute: any, data: any): ProServerInterface
    on (event: any, closure?: any, bind?: any): ProServerInterface
    off (event?: any, closure?: any): ProServerInterface
}

declare interface LStorageInterface {
    ljs: Ljs
    _get (name: string, defaultData?: any): any
    hasGroup (group: string): boolean
    has (name: string, group?: string|null): boolean
    getAll (group?: string|null): any
    put (name: string|object, value?: any, group?: string|null): any|LStorageInterface
    getWithDefault (name: string, defaultData?: any): any
    get (name: string|object, group?: string|null): any
    remove (name: string|object, group?: string|null): any|LStorageInterface
    _set_group (group: string): any|LStorageInterface
    _get_state (): any|LStorageInterface
    _save_state (): any|LStorageInterface
}

interface NProgressOptions {
    minimum: number;
    template: string;
    easing: string;
    speed: number;
    trickle: boolean;
    trickleSpeed: number;
    showSpinner: boolean;
    parent: string;
    positionUsing: string;
    barSelector: string;
    spinnerSelector: string;
}

interface NProgress {
    version: string;
    settings: NProgressOptions;
    status: number | null;

    configure(options: Partial<NProgressOptions>): NProgress;
    set(number: number): NProgress;
    isStarted(): boolean;
    start(): NProgress;
    done(force?: boolean): NProgress;
    inc(amount?: number): NProgress;
    trickle(): NProgress;

    /* Internal */

    render(fromStart?: boolean): HTMLDivElement;
    remove(): void;
    isRendered(): boolean;
    getPositioningCSS(): 'translate3d' | 'translate' | 'margin';
}

interface ToastrOptions {
    /**
     * Optionally override the animation easing to show or hide the toasts.
     * swing and linear are built into jQuery.
     * @default swing
     */
    showEasing?: string;
    /**
     * Optionally override the animation easing to show or hide the toasts.
     * swing and linear are built into jQuery.
     * @default swing
     */
    hideEasing?: string;
    /**
     * Use the jQuery show method of your choice.
     * The methods fadeIn/fadeOut, slideDown/slideUp, and show/hide are built into jQuery.
     * @default fadeIn
     */
    showMethod?: string;
    /**
     * Use the jQuery hide method of your choice.
     * The methods fadeIn/fadeOut, slideDown/slideUp, and show/hide are built into jQuery.
     * @default fadeOut
     */
    hideMethod?: string;
    /**
     * Should a close button be shown?
     * @default undefined
     */
    closeButton?: boolean;
    /**
     * CSS class the close button will be given.
     * @default toast-close-button
     */
    closeClass?: string;
    /**
     * Time in milliseconds the toast should take to hide, when the close button is clicked.
     * Falls back to hide configuration.
     * @default false
     */
    closeDuration?: number;
    /**
     * The animation easing while hiding the toast, when the close button is clicked.
     * Falls back to hide configuration.
     * swing and linear are built into jQuery.
     * @default false
     */
    closeEasing?: string;
    /**
     * Use the jQuery show/hide method of your choice, when the close button is clicked.
     * Falls back to hide configuration.
     * The methods fadeIn/fadeOut, slideDown/slideUp, and show/hide are built into jQuery.
     * @default false
     */
    closeMethod?: string;
    /**
     * Set to false so that the toast hides event if hovered.
     * @default true
     */
    closeOnHover?: boolean;
    /**
     * Html for the close button.
     */
    closeHtml?: string;
    /**
     * onCloseClick function callback, fired when the close button is clicked.
     * Closing cannot be prevented by ev.stopPropagation() etc.
     * @default undefined
     */
    onCloseClick?: (ev: JQueryMouseEventObject) => void;
    /**
     * Should clicking on toast dismiss it?
     * @default true
     */
    tapToDismiss?: boolean;
    /**
     * CSS class the toast element will be given.
     * @default toast
     */
    toastClass?: string;
    /**
     * Id toast container will be given.
     * @default toast-container
     */
    containerId?: string;
    /**
     * Should debug details be outputted to the console?
     * @default false
     */
    debug?: boolean;
    /**
     * Time in milliseconds the toast should take to show.
     * @default 300
     */
    showDuration?: number;
    /**
     * onShown function callback.
     * @default undefined
     */
    onShown?: () => void;
    /**
     * Time in milliseconds the toast should take to hide.
     * @default 1000
     */
    hideDuration?: number;
    /**
     * onHidden function callback.
     * @default undefined
     */
    onHidden?: () => void;
    /**
     * Time in milliseconds the toast should be displayed after leaving mouse over.
     * Set timeOut and extendedTimeOut to 0 to make it sticky.
     * @default 1000
     */
    extendedTimeOut?: number;
    /**
     * If specified, you must provide all classes.
     */
    iconClasses?: {
        /**
         * Icon to use on error toasts.
         * @default toast-error
         */
        error: string;
        /**
         * Icon to use on info toasts.
         * @default toast-info
         */
        info: string;
        /**
         * Icon to use on success toasts.
         * @default toast-success
         */
        success: string;
        /**
         * Icon to use on warning toasts.
         * @default toast-warning
         */
        warning: string;
    };
    /**
     * Icon to use for toast.
     * @default toast-info
     */
    iconClass?: string;
    /**
     * Where toast should be displayed.
     * The default stylesheet covers:
     * toast-top-left, toast-top-center, toast-top-right, toast-top-full-width,
     * toast-bottom-left, toast-bottom-center, toast-bottom-right, toast-bottom-full-width
     * @default toast-top-right
     */
    positionClass?: string;
    /**
     * Time in milliseconds that the toast should be displayed.
     * Set timeOut and extendedTimeOut to 0 to make it sticky.
     * @default 5000
     */
    timeOut?: number;
    /**
     * CSS class the title element will be given.
     * @default toast-title
     */
    titleClass?: string;
    /**
     * CSS class the message element will be given.
     * @default toast-message
     */
    messageClass?: string;
    /**
     * Set newest toast to appear on top.
     * @default true
     */
    newestOnTop?: boolean;
    /**
     * The element to put the toastr container
     * @default body
     */
    target?: string;
    /**
     * Rather than having identical toasts stack, set the preventDuplicates property to true.
     * Duplicates are matched to the previous toast based on their message content.
     * @default false
     */
    preventDuplicates?: boolean;
    /**
     * Visually indicates how long before a toast expires.
     * @default false
     */
    progressBar?: boolean;
    /**
     * CSS class the progressbar element will be given.
     * @default toast-progress
     */
    progressClass?: string;
    /**
     * Function to execute on toast click. Closing cannot be prevented by ev.stopPropagation() etc.
     * @default undefined
     */
    onclick?: (ev: JQueryMouseEventObject) => void;
    /**
     * Should the title and message text be escaped?
     * @default false
     */
    escapeHtml?: boolean;
    /**
     * Flip the toastr to be displayed properly for right-to-left languages.
     * @default false
     */
    rtl?: boolean;
}

interface ToastrDisplayMethod {
    /**
     * Create a toast
     *
     * @param message Message to display in toast
     * @param title Title to display on toast
     * @param overrides Option values for toast
     */
    (message: string, title?: string, overrides?: ToastrOptions): JQuery;
}

type ToastType = 'error'|'info'|'success'|'warning';

interface ToastMap {
    /**
     * The toast type.
     */
    type: ToastType;
    /**
     * The toast message.
     */
    message: string;
    /**
     * The toast icon class.
     */
    iconClass: string;
    /**
     * The toast title.
     */
    title?: string;
    /**
     * Any override options specified when the toast was created.
     */
    optionsOverride?: ToastrOptions;
}

interface ToastrResponse {
    /**
     * The internal toast id.
     */
    toastId: number;
    /**
     * The current state of the toast.
     */
    state: 'visible'|'hidden';
    /**
     * The datetime the toast was opened.
     */
    startTime: Date;
    /**
     * The datetime the toast was closed, if the state is hidden.
     */
    endTime?: Date;
    /**
     * The toastr options.
     */
    options: ToastrOptions;
    /**
     * The event's toast details.
     */
    map: ToastMap;
}

interface Toastr {
    clear: { (toast?: JQuery, clearOptions?: {force: boolean}): void; };
    remove: {
        /**
         * Removes all toasts (without animation)
         */
        (): void;
        /**
         * Removes specific toast (without animation)
         *
         * @param toast Toast to remove
         */
        (toast: JQuery): void;
    };
    /**
     * Create an error toast
     */
    error: ToastrDisplayMethod;
    /**
     * Create an info toast
     */
    info: ToastrDisplayMethod;
    /**
     * The toatsr options object
     */
    options: ToastrOptions;
    /**
     * Create a success toast
     */
    success: ToastrDisplayMethod;
    /**
     * Create a warning toast
     */
    warning: ToastrDisplayMethod;
    /**
     * Get toastr version
     */
    version: string;
    /**
     * Get or create a container.
     */
    getContainer: {
        /**
         * Get the container by options.containerId.
         *
         * @param options Option values for the container
         */
        (options?: ToastrOptions): JQuery,
        /**
         * Get the container by options.containerId.
         * If it doesn't exist, it will be created according to options.
         *
         * @param options Option values for the container
         * @param create Use true to create a container, if it doesn't exist
         */
        (options: ToastrOptions, create: boolean): JQuery,
    };
    /**
     * Register a callback to be called when a toast gets created or hidden.
     *
     * @param callback The function which will be passed the event details.
     */
    subscribe: (callback: (response: ToastrResponse) => void) => void;
}

interface LjsChannel {
    
    /**
     * The Echo options.
     */
    options: any;

    /**
     * The echo connector.
     */
    connector: any;
    
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: Function|string|null): LjsChannel|any;
    
    /**
     * Listen for a whisper event on the channel instance.
     */
    listenForWhisper(event: string, callback: Function|string|null): LjsChannel|any;
    
    /**
     * Listen for an event on the channel instance.
     */
    notification(callback: Function|string|null): LjsChannel|any;
    
    /**
     * Stop listening to an event on the channel instance.
     */
    stopListening(event: string): LjsChannel|any;
    
    /**
     * Stop listening for a whispser event on the channel instance.
     */
    stopListeningForWhisper(event: string): LjsChannel|any;

    /**
     * To broadcast client events
     */
    whisper(event: string, data: any): LjsChannel|any;
}

interface LjsPresenceChannel {

    /**
     * The Echo options.
     */
    options: any;

    /**
     * The echo connector.
     */
    connector: any;

    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function|string|null): LjsPresenceChannel|any;

    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function|string|null): LjsPresenceChannel|any;

    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function|string|null): LjsPresenceChannel|any;

    /**
     * Compo presence
     * @param here
     * @param joining
     * @param leaving
     */
    presence(here: Function|string|null, joining: Function|string|null, leaving: Function|string|null): LjsPresenceChannel|any;
}

interface LjsEcho {
    
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
     * Get a channel instance by name.
     */
    channel(channel: string): LjsChannel|any;
    
    /**
     * Disconnect from the Echo server.
     */
    disconnect(): void;
    
    /**
     * Get a presence channel instance by name.
     */
    join(channel: string): LjsPresenceChannel|any;
    
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(channel: string): LjsEcho|any;
    
    /**
     * Leave the given channel.
     */
    leaveChannel(channel: string): LjsEcho|any;

    /**
     * Leave tall registered channels.
     */
    leaveRegistered(): LjsEcho|any;
    
    /**
     * Listen for an event on a channel instance.
     */
    listen(channel: string, event: string, callback?: Function|string|null): LjsChannel|any;
    
    /**
     * Get a private channel instance by name.
     */
    private(channel: string): LjsChannel|any;
    
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivate(channel: string): LjsChannel|any;
    
    /**
     * Get the Socket ID for the connection.
     */
    socketId(): string;
}

interface Channel {

    /**
     * The Echo options.
     */
    options: any;

    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: Function): Channel;

    /**
     * Listen for a whisper event on the channel instance.
     */
    listenForWhisper(event: string, callback: Function): Channel;

    /**
     * Listen for an event on the channel instance.
     */
    notification(callback: Function): Channel;

    /**
     * Stop listening to an event on the channel instance.
     */
    stopListening(event: string): Channel;

    /**
     * Stop listening for a whispser event on the channel instance.
     */
    stopListeningForWhisper(event: string): Channel;
}

interface PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function): PresenceChannel;

    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function): PresenceChannel;

    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): PresenceChannel;
}

interface Echo {

    /**
     * The echo connector.
     */
    connector: any;

    /**
     * The Wrapper options.
     */
    options: any;

    /**
     * Get a channel instance by name.
     */
    channel(channel: string): Channel;

    /**
     * Create a new connection.
     */
    connect(): void;

    /**
     * Disconnect from the Echo server.
     */
    disconnect(): void;

    /**
     * Get a presence channel instance by name.
     */
    join(channel: string): PresenceChannel;

    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(channel: string): void;

    /**
     * Leave the given channel.
     */
    leaveChannel(channel: string): void;

    /**
     * Listen for an event on a channel instance.
     */
    listen(channel: string, event: string, callback: Function): Channel;

    /**
     * Get a private channel instance by name.
     */
    private(channel: string): Channel;

    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivate(channel: string): Channel;

    /**
     * Get the Socket ID for the connection.
     */
    socketId(): string;

    /**
     * Register 3rd party request interceptiors. These are used to automatically
     * send a connections socket id to a Laravel app with a X-Socket-Id header.
     */
    registerInterceptors(): void;

    /**
     * Register a Vue HTTP interceptor to add the X-Socket-ID header.
     */
    registerVueRequestInterceptor(): void;

    /**
     * Register an Axios HTTP interceptor to add the X-Socket-ID header.
     */
    registerAxiosRequestInterceptor(): any;

    /**
     * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
     */
    registerjQueryAjaxSetup(): void;
}