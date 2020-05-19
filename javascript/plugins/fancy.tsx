import {Helper} from "../Helper";
import {ExecutorParent} from "../ljs/Extends/ExecutorParent";
import get from 'lodash/get';

require('@fancyapps/fancybox');

Helper.before_load((ljs: Ljs) => {

    ljs.regExec(class extends ExecutorParent {

        public ins: any;

        constructor(params: any) {
            super(params);
            this.ins = null;
        }

        __call ($name: string, $args: any = []) {

            let closable = this.target ? (this.target.dataset.closable ? true : false) : false;

            return get(window.jax, $name)(...$args).then((params: any) => {

                this.ins = "fancy::mess".exec(params[0], {
                    touch: false,
                    smallBtn: closable,
                    toolbar: false,
                    clickSlide: closable
                });

                return
            });
        }

        close () {

            if (this.ins) {

                this.ins.close();
            }
        }

        static __name () {
            return 'load_modal';
        }
    });

    ljs.regExec(class extends ExecutorParent {
        mess (items: any, opts: any, index: any) {

            return ($ as any).fancybox.open(items, opts, index);
        }

        img (img: any, opts: any = null) {

            return ($ as any).fancybox.open({
                src  : img,
            }, opts);
        }

        imgs (...args: any[]) {

            let imgs: any = [];

            args.map((i) => {

                imgs.push({
                    src  : i,
                    opts : {
                        thumb : i
                    }
                });
            });

            return ($ as any).fancybox.open(imgs);
        }

        help () {

            return window.open('https://fancyapps.com/fancybox/3/docs', '_blank')
        }

        static __name () {

            return 'fancy';
        }
    });
});