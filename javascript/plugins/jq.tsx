import {Helper} from "../Helper";
import {ExecutorParent} from "../ljs/Extends/ExecutorParent";
import map from 'lodash/map';

Helper.before_load((ljs: Ljs) => {

    class jQuery extends ExecutorParent {
        /**
         * Static jQuery call for target object
         * @param $name
         * @param $args
         * @private
         */
        static __call($name: any, $args: any = []) {

            if (this.self.target) {

                let jq = $(this.self.target);

                return jq[$name](...$args);
            }

            if (process.env.NODE_ENV === 'development') {
                ljs._error('Undefined object target!');
            }

            return undefined;
        }

        /**
         * Self object
         */
        static jquery() {

            return $(this.self.target);
        }

        /**
         * Class name for call
         * @private
         */
        static __name() {

            return "$";
        }

        /**
         * Selector adapter
         * @param $select
         * @private
         */
        _select($select: any) {

            if ($select === 'this' || $select === 'target') {

                return this.target;
            } else if ($select === 'body') {

                return document.body;
            } else if ($select === 'head') {

                return document.head;
            } else if (typeof $select === 'string' && /^parent\:/.test($select) && this.target) {

                return this.target.closest($select.replace(/^parent\:/, ''));
            }

            return $select;
        }

        /**
         * Public jQuery call for selector
         * @param $name
         * @param $args
         * @private
         */
        __call($name: any, $args: any) {

            if ($args.length && $args[0] !== undefined) {

                let a: any = [],
                    select = this._select($args[0]);

                map($args, (i, k) => k && a.push(i))

                return $(select)[$name](...a);
            }

            if (process.env.NODE_ENV === 'development') {
                ljs._error('Undefined object selector!');
            }

            return undefined;
        }

        /**
         * Apply many objects attributes
         * @param $data
         */
        manyAttributes($data: any) {

            return map($data, ($data, $selector) => {

                return map($data, ($value, $name) => {

                    return $($selector).attr($name, $value);
                });
            });
        }

        /**
         * Set or merge attribute data
         * @param $selector
         * @param $attr
         * @param $val
         */
        attribute($selector: any, $attr: any = null, $val: any = "") {

            if ($attr && typeof $attr === 'object') {


                return this.attr_merge($selector, $attr);
            }

            return $($selector).attr($attr, $val);
        }

        /**
         * Merge many attribute data
         * @param $selector
         * @param $attributes
         */
        attr_merge($selector: any, $attributes: any) {

            return map($attributes, (i, k) => {

                return $($attributes).attr(k, i);
            });
        }

        /**
         * Eval method alias
         * @param data
         */
        globalEval(data: any) {

            return this.eval(data);
        }

        /**
         * Eval method
         * @param data
         */
        'eval'(data: any) {

            $.globalEval(data);
        }
    }

    ljs.regExec(jQuery)
});
