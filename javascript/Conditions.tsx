export class Conditions {

    /**
     * Is Array or Object
     * @param val
     */
    static isArrayOrObject (val: any) {
        return Object(val) === val
    }

    /**
     * Is Object
     * @param val
     */
    static isObject (val: any) {
        return Object.prototype.toString.call(val) === '[object Object]'
    }

    /**
     * Is empty object
     * @param val
     */
    static isEmptyObject(val: any) {
        return Object.keys(val).length === 0
    }

    /**
     * Check is number
     * @param num
     */
    static isNumber (num: any) {
        return !isNaN(Number(num))
    }

    /**
     * Check is ios device
     */
    static isIos () {
        return window.navigator.userAgent.match(/ipad|iphone|Macintosh/i);
    }

    /**
     * Determine if a given string matches a given pattern.
     * @param pattern
     * @param text
     */
    static string_is (pattern: string, text: string) {

        pattern = pattern
            .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\#-]', 'g'), '\\$&')
            .replace(/\\\*/g, '.*');

        return (new RegExp(pattern + '$', 'u')).test(text);
    }
}