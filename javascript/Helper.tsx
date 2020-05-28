import {Conditions} from "./Conditions";

export class Helper extends Conditions {

    /**
     * Execute before load
     * @param applyScript
     */
    static before_load (applyScript: any) {

        if (typeof applyScript === 'function') {

            if (window.ljs !== undefined) {

                applyScript(window.ljs);
            }

            else {

                document.addEventListener("ljs:before_load", (event: any) => {

                    applyScript(event.detail);
                });
            }
        }

        return this;
    }

    /**
     * Execute on document load
     * @param readyScript
     */
    static document_load (readyScript: any) {

        if (document.readyState === 'loading') {

            document.addEventListener('DOMContentLoaded', readyScript);

        } else {

            readyScript();
        }

        return this;
    }

    /**
     * Call on ready script
     * @param readyFn
     */
    static ready_script (readyFn: any) {

        document.addEventListener('ljs:nav:complete', () => {

            if (window.ljs.config('pjax-container')) {

                readyFn(document.querySelector(window.ljs.config('pjax-container')));
            }
        });

        document.addEventListener('ljs:load', () => {

            readyFn(document);
        });

        return this;
    }

    /**
     * Make dot object
     * @param obj
     * @param tgt
     * @param path
     * @param useBrackets
     * @param keepArray
     * @param separator
     */
    static dot (obj: any, tgt: any = {}, path: any = [], useBrackets: boolean = false, keepArray: boolean = false, separator: string = ".") {

        let isArray = Array.isArray(obj);

        Object.keys(obj).forEach(
            (key: any) => {

                let index = isArray && useBrackets ? '[' + key + ']' : key;

                if (
                    Helper.isArrayOrObject(obj[key]) &&
                    ((Helper.isObject(obj[key]) && !Helper.isEmptyObject(obj[key])) ||
                        (Array.isArray(obj[key]) && !keepArray && obj[key].length !== 0))
                ) {
                    if (isArray && useBrackets) {

                        let previousKey = path[path.length - 1] || '';

                        return Helper.dot(
                            obj[key],
                            tgt,
                            path.slice(0, -1).concat(previousKey + index)
                        )
                    } else {

                        return Helper.dot(obj[key], tgt, path.concat(index))
                    }
                } else {

                    if (isArray && useBrackets) {

                        tgt[path.join(separator).concat('[' + key + ']')] = obj[key]

                    } else {

                        tgt[path.concat(index).join(separator)] = obj[key]
                    }
                }
            }
        );

        return tgt
    }

    /**
     * Create http query
     * @param obj
     * @param num_prefix
     * @param temp_key
     */
    static http_build_query (obj: any, num_prefix: number|null = null, temp_key: string|null = null) {

        let output_string: any = []

        if (obj !== null) {

            Object.keys(obj).forEach((val: any) => {

                let key = val;

                num_prefix && !isNaN(key) ? key = num_prefix + key : '';

                key = encodeURIComponent(key.replace(/[!'()*]/g, escape));

                temp_key ? key = temp_key + '[' + key + ']' : '';

                if (typeof obj[val] === 'object') {

                    output_string.push(key + '=' + JSON.stringify(obj[val]))
                }

                else {

                    let value = encodeURIComponent(String(obj[val]).replace(/[!'()*]/g, escape));

                    output_string.push(key + '=' + value);
                }

            });
        }

        return output_string.join('&');
    }

    /**
     * Get query value
     * @param name
     */
    static query_get (name: string|null = null) {

        let match,
            pl     = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = (s: any) => decodeURIComponent(s.replace(pl, " ")),
            query  = window.location.search.substring(1);

        let urlParams: any = {};

        while (match = search.exec(query)) {

            urlParams[decode(match[1])] = decode(match[2]);
        }

        if (name) {

            return urlParams[name];
        }

        else {

            return urlParams;
        }
    }

    /**
     * Number formatter
     * @param num
     * @param decimals
     * @param dec_point
     * @param thousands_sep
     */
    static number_format(num: any, decimals: number = 0, dec_point: string = '.', thousands_sep: string = ',' ) {
        let i, j, kw, kd, km;
        if( isNaN(decimals = Math.abs(decimals)) ){ decimals = 2; }
        if( dec_point === undefined ){ dec_point = ","; }
        if( thousands_sep === undefined ){ thousands_sep = "."; }
        i = parseInt(num = (+num || 0).toFixed(decimals)) + "";
        if( (j = i.length) > 3 ){ j = j % 3; } else{ j = 0; }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(num - parseInt(i)).toFixed(decimals).replace(/-/, '0').slice(2) : "");
        return km + kw + kd;
    }
}