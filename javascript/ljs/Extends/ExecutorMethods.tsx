import map from 'lodash/map';
import concat from 'lodash/concat';
import merge from 'lodash/merge';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';

export class ExecutorMethods {

    /**
     * Method for one or multiple call.
     *
     * @param data [string|Array|Object]
     * @param params
     * @param storage_data
     * @returns {null}
     */
    exec (data: any, params: any = null, storage_data: any = {}) {

        if (typeof data === "string") { let n = data; data = {}; data[n] = params; }

        let returns: any = [];

        map(data, (item: any, keys: any) => {

            if (isNumber(keys)) { keys = item; item = null; }

            let numRegExp = /^([0-9\:]+)\:/,
                $m = numRegExp.exec(keys),
                $id: any = 0;

            if ($m) { keys = keys.replace(numRegExp, ""); $id = $m[1]; }

            storage_data["response_id"] = $id;

            keys = keys.replace(/(\s\s)/g, ' ');

            let key_map = keys.split(" "),
                send_now = item,
                i = 0;

            if (!send_now) send_now = params;

            map(key_map, (key: any, index: any) => {

                switch (key) {
                    case "&&":
                        send_now = item;
                        break;
                    case "&":
                        send_now = undefined;
                        break;
                    case "#":
                        send_now = null;
                        break;
                    case "*":
                        send_now = returns[i-1];
                        break;
                    case ">>":
                        send_now = key_map[i-1].call(storage_data);
                        break;
                    case (key.match(/^[0-9]\>$/) || {}).input:
                        let int_num = parseInt(key);
                        send_now = params[int_num] !== undefined ? params[int_num] : null
                        break;
                    case ">":
                        send_now = concat(returns, (Array.isArray(item) ? item : [item]));
                        break;
                    case (key.match(/^\>\>([a-z0-9\_\-\:\.\$]+)(\((.*?)\)){0,1}$/) || {}).input:
                        this.call(key, storage_data);
                        break;
                    case (key.match(/^[0-9]\>\>$/) || {}).input:
                        let int_num2 = parseInt(key);
                        send_now = returns[int_num2] !== undefined ? returns[int_num2] : null;
                        break;
                    default:
                        if (key.trim() !== "") {
                            let sn = send_now; //(this as any)._checkSend(send_now, storage_data);
                            if (process.env.NODE_ENV === 'development') {
                                (this as any)._detail("Execute data:", key.trim(), "Params:", sn, "Storage:", storage_data);
                            }
                            returns.push((this as any)._find_and_execute_command(key.trim(), sn, merge(storage_data, {trace: returns, last: returns[i]})));
                            i++;
                        }
                }
            });
        });

        return returns.length > 0 ? (returns.length === 1 ? returns[0] : returns) : undefined;
    }

    /**
     * String parse
     *
     * @param str
     * @param storage
     * @returns {*}
     */
    parse (str: string, storage: any = {}) {

        //console.log(str, isString(str));

        if (isString(str)) {

            let arr = String(str).match(/\>\>([a-z0-9\_\-\:\.\$]+)(\((.*?)\)){0,1}/ig);

            map(arr, (command: string) => {

                let result = this.call(command, storage);

                if (command === result) result = "";

                if (str===command) {

                    str = result;
                }

                else {

                    if (isObject(result)) {

                        result = JSON.stringify(result);
                    }

                    str = str.replace(command, String(result));
                }
            });
        }

        return str;
    }

    /**
     * Call mode
     *
     * @param command
     * @param storage
     * @returns {undefined|*}
     */
    call (command: string, storage: any = {}) {

        if (isString(command) && /^[\>\>]*([a-z0-9\_\-\:\.\$]+)(\((.*?)\)){0,1}$/i.test(command)) {

            let m = /^[\>\>]*([a-z0-9\_\-\:\.\$]+)(\((.*?)\)){0,1}$/i.exec(command);

            let params: any = [];

            if (m && m[3]) {

                params = m[3].split('||').map(item => item.trim());

                params = params.parse(storage);
            }

            let result = m && m[1] ? this.exec(m[1], params, merge({
                call: true,
                command: command,
                matches: m
            }, storage)) : null;

            return result !== undefined ? result : command;
        }

        return command;
    }

    /**
     * Create lite executor
     * @param name
     * @param closure
     */
    toExec (name: string, closure: any) {

        if (typeof name === "object") {

            map(name, (item: string) => {

                (this as any).executor_lite[item] = closure
            });

        } else {

            (this as any).executor_lite[name] = closure
        }

        return this;
    }

    /**
     * Remove executor
     * @param name
     */
    removeExec(name: string) {

        if ((this as any).executor_lite[name]) {

            delete (this as any).executor_lite[name];
        }

        return this;
    }

    /**
     * Register class executor
     * @param object
     */
    regExec (object: any) {

        if (typeof object !== "function") {

            if (process.env.NODE_ENV === 'development') {
                (this as any)._error("Invalid class passed for processing.");
            }
            return this;
        }

        let name = object.__name();

        if (object.__on_create !== undefined) {

            object.__on_create(this);
        }

        (this as any).executor[name] = new object(this);

        if ((this as any).executor[name].__on_create !== undefined) {

            (this as any).executor[name].__on_create(this);
        }

        map(object.__aliases(), (item: string) => {

            (this as any).executor[item] = (this as any).executor[name];
        });

        if ((this as any).executor[name].jquery) {

            (this as any)._jqueryed((this as any).executor[name], name)
        }

        return this;
    }
}
