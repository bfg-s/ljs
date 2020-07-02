import {Helper} from "../Helper";
import {ExecutorParent} from "../ljs/Extends/ExecutorParent";
import get from 'lodash/get';
import merge from 'lodash/merge';

if (!('select2' in $())) {

    require('script-loader!select2/dist/js/select2.full');
}

Helper.before_load((ljs: Ljs) => {

    class Select2 extends ExecutorParent {

        public jquery: boolean;

        constructor(ljs: Ljs) {
            super(ljs);

            this.jquery = true;
        }

        /**
         * Create simple select2 alias
         * @private
         */
        __invoke (...args: any[]) {

            return this.init(...args);
        }

        /**
         * Create simple select2
         * @param args
         */
        init (...args: any[]) {

            if (this.target) {

                return ($(this.target) as any).select2(...args);
            }

            return undefined;
        }

        ajax (name: string) {

            let target = this.target;

            return this.init(merge({
                ajax: {
                    transport: (params: any, success: any, failure: any) => {

                        console.log(params.data);

                        let new_params = {
                            [name]: true,
                            [`${name}_q`]: params.data.q ? params.data.q : '',
                            [`${name}_page`]: params.data.page ? params.data.page : 1
                        };

                        window.$jax.get(window.location.href, new_params)
                            .then((data: any) => {
                                success(data);
                            }).catch(() => failure());
                    }
                }
            }));
        }

        /**
         * Create jaxible select
         * @param jax_path
         * @param $args
         * @param $ja_args
         */
        jax (jax_path: string, $args: any = [], $ja_args: any = null) {

            if (jax_path !== '') {

                let target = this.target;

                return this.init(merge({
                    ajax: {
                        transport: function (params: any, success: any, failure: any) {

                            let withs = target.dataset.with !== undefined ? target.dataset.with.split(',') : [];

                            let ljs_params = Object.assign({}, params.data);

                            if (params.data.page) {
                                ljs_params['_page'] = params.data.page;
                                delete ljs_params.page;
                            }

                            if (params.data.q) {
                                ljs_params['_q'] = params.data.q;
                                delete ljs_params.q;
                            }

                            let ja = window.jax.with(withs).params(ljs_params);

                            ja = get(ja, jax_path);

                            if (typeof $ja_args === 'function') {

                                $ja_args = $ja_args();
                            }

                            return ja($ja_args).then((data: any) => {

                                if (data !== undefined) {

                                    success(data);
                                }

                                else {

                                    //failure()
                                    success({results: []});
                                }

                                return data;

                            }).catch(() => failure());
                        }
                    }
                }, $args));
            }

            return undefined;
        }

        /**
         * Create if not exists
         * @param id
         * @param text
         * @param selected
         */
        set (id: any, text: any, selected: boolean = true) {

            let select2 = $(this.target);

            if (id === select2.val()) {

                return select2;
            }

            if (select2.find("option[value='" + id + "']").length) {

                if (selected) {

                    select2.val(id).trigger('change');
                }
            } else {

                select2.append(
                    new Option(text, id, selected, selected)
                );

                if (selected) {

                    select2.trigger('change');
                }
            }

            return select2;
        }

        static __name () {

            return "select2";
        }
    }

    ljs.regExec(Select2);
});