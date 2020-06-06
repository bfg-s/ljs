import map from 'lodash/map';
import merge from 'lodash/merge';
import set from 'lodash/set';

export class LStorage implements LStorageInterface
{
    public ljs: Ljs
    private _group: string
    private _state: any

    /**
     * Constructor
     *
     * @param ljs
     */
    constructor (ljs: Ljs) {

        this.ljs = ljs;

        this._group = "ljs-global";

        this._state = {};

        this._get_state();
    }

    /**
     * Check has group or not
     * @param group
     */
    static hasGroup (group: string) {

        return localStorage.getItem("ljs-" + group) !== null;
    }

    /**
     * Getter
     * @param name
     * @param defaultData
     * @private
     */
    _get (name: string, defaultData: any = null) {

        let item: any = localStorage.getItem("ljs-" + name);

        try { item = JSON.parse(item); } catch (e) {}

        return item ? item : defaultData;
    }

    /**
     * Has group check
     * @param group
     */
    hasGroup (group: string) {

        return LStorage.hasGroup(group);
    }

    /**
     * Check, has storage key or not
     * @param name
     * @param group
     */
    has (name: string, group: string|null = null) {

        let return_data = false;

        if (group) {

            let save_group = this._group;

            this._set_group(group);

            return_data = this._state[name] !== undefined;

            this._set_group(save_group);

        } else {

            this._get_state();

            return_data = this._state[name] !== undefined;
        }

        return return_data;
    }

    /**
     * Get all data from storage
     * @param group
     */
    getAll (group: string|null = null) {

        let return_data = {};

        if (group !== null) {

            let save_group = this._group;

            this._set_group(group);

            return_data = this._state;

            this._set_group(save_group);

        } else {

            this._get_state();

            return_data = this._state;
        }

        return return_data;
    }

    /**
     * Put data in to storage
     * @param name
     * @param value
     * @param group
     */
    put (name: string|object, value: any = null, group: string|null = null) {

        if (typeof name === 'object') {

            group = value;
        }

        if (group !== null) {

            let save_group = this._group;

            this._set_group(group);

            if (typeof name === 'object') {

                this._state = merge(this._state, name);

            } else {

                set(this._state, name, value);
            }

            this._save_state()
                ._set_group(save_group);

        } else {

            this._get_state();

            if (typeof name === 'object') {

                this._state = merge(this._state, name);

            } else {

                set(this._state, name, value);
            }

            this._save_state();
        }

        return this;
    }

    /**
     * Getter with default
     * @param name
     * @param defaultData
     */
    getWithDefault (name: string, defaultData: any = null) {

        let data = this.get(name);

        return data === undefined ? data : defaultData;
    }

    /**
     * Get data from to storage
     * @param name
     * @param group
     */
    get (name: string|object, group: string|null = null) {

        let return_data = null;

        let return_obj: any = {};

        this._get_state();

        if (group !== null) {

            let save_group = this._group;

            this._set_group(group);

            if (typeof name === 'object') {

                map(name, (item: string) => {

                    return_obj[item] = this._state[item];
                })

            } else {

                return_data = this._state[name];
            }

            this._set_group(save_group);

        } else {

            if (typeof name === 'object') {

                map(name, (item) => {

                    return_obj[item] = this._state[item];
                })

            } else {

                return_data = this._state[name];
            }
        }

        return return_data === null && !Object.keys(return_obj).length ? undefined : (return_data !== null ? return_data : return_obj);
    }

    /**
     * Remove data from to storage
     * @param name
     * @param group
     */
    remove (name: string|object, group: string|null = null) {

        if (group !== null) {

            let save_group = this._group;

            this._set_group(group);

            if (typeof name === 'object') {

                map(name, (item) => {

                    delete this._state[item];
                })

            } else {

                delete this._state[name];
            }

            this._save_state()
                ._set_group(save_group);

        } else {

            this._get_state();

            if (typeof name === 'object') {

                map(name, (item) => {

                    delete this._state[item];
                })

            } else {

                delete this._state[name];
            }

            this._save_state();
        }

        return this;
    }

    /**
     * System group setter
     * @param group
     * @private
     */
    _set_group (group: string) {

        this._group = "ljs-" + group;

        this._get_state();

        return this;
    }

    /**
     * System state getter
     * @private
     */
    _get_state () {

        let _state = localStorage.getItem(this._group);

        this._state = _state ? JSON.parse(_state) : {};

        return this;
    }

    /**
     * System state saver
     * @private
     */
    _save_state () {

        localStorage.setItem(this._group, JSON.stringify(this._state));

        return this;
    }
}
