import {Helper} from "../Helper";
import {ExecutorParent} from "../ljs/Extends/ExecutorParent";
const Inputmask = require('inputmask');

Helper.before_load((ljs: Ljs) => {

    class Mask extends ExecutorParent {

        __invoke ($mask: any) {

            if (this.target && $mask) {

                return Inputmask($mask).mask(this.target);
            }

            else {

                if (process.env.NODE_ENV === 'development') {
                    ljs._error('Not found object for input mask!');
                }
            }
        }

        help () {

            return window.open('https://github.com/RobinHerbots/Inputmask', '_blank')
        }

        static __name () {

            return "mask";
        }
    }

    ljs.regExec(Mask);
});