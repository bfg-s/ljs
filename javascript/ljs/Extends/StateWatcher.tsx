export class StateWatcher implements StateWatcherInterface {

    public path: any = null;
    public storage: any = {};

    constructor() {

        this.path = null;
        this.storage = {};
    }

    /**
     * Data getter
     * @returns {*}
     */
    get data () {

        return this.storage.data ? this.storage.data : {};
    }

    /**
     * Target getter
     * @returns {*}
     */
    get target () {

        return this.storage.target ? this.storage.target : null;
    }

    /**
     * Storage setter
     * @param storage
     */
    setStorage (storage: any) {

        this.storage = storage;

        return this;
    }

    /**
     * Call inner events
     * @param $event
     * @param $name
     * @param $data
     */
    call ($event: string, $name: string, $data: any) {

        let old_name = $name;

        let stop = false;

        if (this.path && typeof this.path === 'string') {

            $name = $name.replace(`${this.path}.`, '');
            
            stop = $name === old_name;
        }

        if ($name) {

            $name = $name.replace(/\./g, '_');
        }

        if (!stop && $name) {

            let event_with_name = `${$event}_${$name}`;

            if ((this as any)[event_with_name] !== undefined) {

                (this as any)[event_with_name](...$data);
            }

            if ((this as any)[$name] !== undefined) {

                (this as any)[$name](...$data);
            }

            if ((this as any)[$event] !== undefined) {

                (this as any)[$event](...$data);
            }

            if ((this as any)['*']) {

                (this as any)['*'](...$data);
            }
        }

        return this;
    }
}