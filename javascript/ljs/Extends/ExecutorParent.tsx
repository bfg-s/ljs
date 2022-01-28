import camelCase from 'lodash/camelCase';

export abstract class ExecutorParent implements ExecutorParentInterface {

    static ljs: any;
    static storage: any;
    static self: any;

    public ljs: any;
    public name: string;
    public __now_method: any;
    public jquery: boolean;

    /**
     * Executor constructor
     */
    constructor(ljs: Ljs) {

        ExecutorParent.ljs = ljs
        ExecutorParent.storage = {};
        ExecutorParent.self = this;

        this.ljs = ljs;
        this.name = ExecutorParent.name;
        this.__now_method = null;
        this.jquery = false;
    }

    /**
     * Now call method
     */
    get now_method() {

        return this.__now_method;
    }

    /**
     * Get relation object
     */
    get target() {

        let obj = undefined;

        if (this.storage.object) {

            obj = this.storage.object;
        } else if (this.storage.target) {

            obj = this.storage.target;
        } else if (this.storage.event && this.storage.event.target) {

            obj = this.storage.event.target;
        }

        if (obj) {

            if (obj.executors === undefined) {
                obj.executors = {};
            }

            let name = (this.constructor as any).__name();
            if (name) {

                obj.executors[name] = true;
            }
        }

        return obj;
    }

    /**
     * Get current target object
     */
    get currentTarget() {

        if (this.storage.event && this.storage.event.currentTarget) {

            return this.storage.event.currentTarget;
        } else if (this.target) {

            return this.target;
        }

        return document;
    }

    /**
     * Get trace execute results commands pipeline
     */
    get trace() {

        if (this.storage.trace) {

            return this.storage.trace;
        }

        return undefined;
    }

    /**
     * Get event data
     */
    get event() {

        if (this.storage.event) {

            return this.storage.event;
        }

        return this.storage;
    }

    /**
     * Create jQuery current target element
     */
    get jq() {

        return $(this.currentTarget);
    }

    /**
     * Public storage
     */
    get storage() {

        return ExecutorParent.storage;
    }

    /**
     * Class name for call
     * @private
     */
    static __name() {

        return '';
    }

    /**
     * Aliases from object
     * @private
     */
    static __aliases() {

        return [];
    }

    /**
     * Individual method name getter
     * @private
     */
    static __individual_method() {

        return "__invoke";
    }

    /**
     * preventDefault on event
     */
    preventDefault() {

        if (this.event.preventDefault !== undefined) {

            this.event.preventDefault();

            return true;
        }

        return false;
    }

    data($name: string, $default: any = null) {

        if (this.currentTarget && this.currentTarget.dataset) {

            let varName = camelCase($name);

            if (varName in this.currentTarget.dataset) {

                let data = this.currentTarget.dataset[varName];
                if (data === 'true') {
                    return true;
                } else if (data === 'false' || data === undefined) {
                    return false;
                } else if (data === 'null') {
                    return null;
                } else if (data === 'undefined') {
                    return undefined;
                } else if (data === '') {
                    return true;
                } else {
                    return data;
                }
            } else {
                return $default;
            }
        }

        return $default;
    }
}
