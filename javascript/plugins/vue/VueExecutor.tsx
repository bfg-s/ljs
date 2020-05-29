import {ExecutorParent} from "../../ljs/Extends/ExecutorParent";

export class VueExecutor extends ExecutorParent {

    init () {

        if (this.target) {

            let pjax = window.ljs.config('pjax-container');
            let parents = pjax ? this.target.closest(pjax) : 0;
            let group = window.ljs.$vue.group();
            if (!pjax && !parents) { group = 'components'; }
            else if (pjax && !parents) { group = 'outside'; }

            let name = this.target.tagName.toLowerCase() + (window.ljs.$vue[group] !== undefined ? Object.keys(window.ljs.$vue[group]).length : 0);

            if (this.target.hasAttribute('id')) {

                name = this.target.getAttribute('id')
            }

            let vue = new window.ljs.vue({
                el: this.target,
                data () {

                    return {
                        ljs: window.ljs,
                        name: name,
                        group: group,
                        pjax: !!(pjax && parents)
                    }
                },
                methods: {

                },
                mounted () {

                    if (process.env.NODE_ENV === 'development') {
                        window.ljs._detail(`Vue component [${this.name}] mounted!`);
                    }
                },
                destroyed () {
                    if (process.env.NODE_ENV === 'development') {
                        window.ljs._detail(`Vue component [${this.name}] destroyed!`);
                    }
                    window.ljs.$vue.drop(this.name, this.group);
                    window.ljs.$vue.drop(this.name, 'components');
                },
                errorCaptured (err: any, vm: any, info: any) {

                    if (err) {

                        window.ljs._error(info);
                    }

                    else {

                        window.ljs._info(info);
                    }
                }
            });

            if (window.ljs.$vue[group] === undefined) { window.ljs.$vue[group] = {}; }

            window.ljs.$vue[group][name] = vue;
        }
    }

    /**
     * Class name for call
     *
     * @returns {string}
     * @private
     */
    static __name () {

        return "vue";
    }
}
