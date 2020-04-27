import {Helper} from "../Helper";
import {ExecutorParent} from "../ljs/Extends/ExecutorParent";

require('@fancyapps/fancybox');

Helper.before_load((ljs: Ljs) => {

    class FancyBox extends ExecutorParent
    {
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
    }

    ljs.regExec(FancyBox);
});