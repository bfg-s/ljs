import {ExecutorParent} from "../Extends/ExecutorParent";
import isObject from 'lodash/isObject';
import map from 'lodash/map';
import isNaN from 'lodash/isNaN';

export class Timer extends ExecutorParent {

    public registered_intervals: any
    public registered_onetime: any

    /**
     * Constructor
     *
     * @param ljs
     */
    constructor (ljs: Ljs) {

        super(ljs);

        this.registered_intervals = {};
        this.registered_onetime = {};
    }

    /**
     * Clear any registry interval
     *
     * @param name
     */
    clear (name: string|number) {

        if (this.registered_intervals[name] !== undefined) {

            clearInterval(this.registered_intervals[name]);
        }
    }

    /**
     * Set Interval
     *
     * @param name
     * @param data
     * @param ms
     */
    interval (name: string|number, data: any, ms: number = 1000) {

        if (this.registered_intervals[name] !== undefined) {

            clearInterval(this.registered_intervals[name]);
        }

        this.registered_intervals[name] = setInterval(() => {

            this._exec_data(data);
        }, ms);
    }

    /**
     * Single executor "onetime"
     * @param $name
     * @param $execute
     * @param $ms
     */
    onetime ($name: string|number, $execute: any, $ms: number = 100) {

        if (this.registered_onetime[$name]) {

            clearTimeout(this.registered_onetime[$name]);
        }

        this.registered_onetime[$name] = setTimeout(() => {

            if (typeof $execute === 'function') {

                $execute();
            }

            else {


                window.ljs.exec($execute, null, this.storage);
            }

            delete this.registered_onetime[$name];

        }, $ms);
    }

    /**
     * Temp timer interval
     * @param exec
     * @param livedMs
     * @param interval
     */
    temp (exec: any, livedMs = 1000, interval = 1000) {

        if (interval < 0) {

            interval = Math.abs(interval);
        }

        if (livedMs) {

            let step = 0;

            let tmpTime = setInterval(() => {

                window.ljs.exec(exec, [++step], this.storage);

            }, Number(interval));

            setTimeout(() => clearInterval(tmpTime), livedMs);

            return tmpTime;
        }

        return false;
    }

    /**
     * Set Timeout v2
     *
     * @param data
     */
    out (data: any) {

        if (isObject(data)) {

            map(data, (i,k) => {

                let ms = Number(k);

                if (isNaN(ms)) {

                    ms = 1000;
                }

                setTimeout(() => {

                    this._exec_data(i);

                }, ms);
            });
        }
    }

    /**
     * Local executor
     *
     * @param data
     * @private
     */
    _exec_data (data: any) {

        if (typeof data === 'string' || typeof data === 'object') {

            window.ljs.exec(data, null, this.storage);

        } else if (typeof data === 'function') {

            data();
        }
    }

    /**
     * Class call name
     *
     * @returns {string}
     * @private
     */
    static __name () {

        return "timer"
    }
}
