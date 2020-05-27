import {Helper} from "../../Helper";
import {VueExecutor} from "./VueExecutor";
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import unset from 'lodash/unset';
import get from 'lodash/get';
import set from 'lodash/set';

Helper.before_load((ljs: Ljs) => {

    ljs.vue = require('vue');

    ljs.$vue = {

        components: {},

        group: () => {
            return ljs.config('route_name', location.pathname.replace(/\//g, '_').replace(/^\_/, ''));
        },

        component: ($name: string) => {
            let all = ljs.$vue.allComponents();
            return all[$name] !== undefined ? all[$name] : null;
        },

        getComponents: () => {
            return ljs.$vue.components;
        },

        pjaxComponents: () => {
            let group = ljs.$vue.group();
            return ljs.$vue[group] !== undefined ? ljs.$vue[group] : {};
        },

        allComponents: () => {
            return merge(ljs.$vue.getComponents(), ljs.$vue.pjaxComponents());
        },

        destroy: ($name: any, $group: any = 'auto') => {

            if ($group === 'auto') {

                $group = ljs.$vue.group();
            }

            else if ($group === null || $group === false) {

                $group = "components";
            }

            if (ljs.$vue[$group] !== undefined && ljs.$vue[$group][$name] !== undefined) {

                ljs.$vue[$group][$name].$destroy();

                return true;
            }

            return false;
        },

        destroyGroup: ($group: any) => {

            if (ljs.$vue[$group] !== undefined) {

                let result = filter(ljs.$vue[$group], (vm, name) => {

                    return !ljs.$vue.destroy(name, $group);
                });

                return !(Object.keys(result).length);
            }

            return false;
        },

        drop: ($name: any, $group: any = 'auto') => {

            if ($group === 'auto') {

                $group = ljs.$vue.group();
            }

            else if ($group === null || $group === false) {

                $group = "components";
            }

            return ljs.$vue[$group] !== undefined ? ljs.$vue.unset(`${$group}.${$name}`) : false;
        },

        unset: ($path: any) => {

            return unset(ljs.$vue, $path);
        }
    };

    ljs.regExec(VueExecutor);

    ljs.vue.mixin({

        data: () => {

            return {
                ljs: ljs
            };
        },

        $ws: {},
        $state: {},
        $sync: {},

        beforeMount () {

            Object.keys(this.$options.$ws).map((event: string) => {
                let closure_name = this.$options.$ws[event];
                this.ljs.$ws.on(event, this[closure_name], this);
            });

            Object.keys(this.$options.$state).map((event: string) => {
                let closure_name = this.$options.$state[event];
                this.ljs.$state.on(event, this[closure_name], this);
            });

            Object.keys(this.$options.$sync).map((global_var: string) => {
                let inner_var = this.$options.$sync[global_var];
                if (!window.$state.has(global_var)) {
                    window.$state.set(global_var, get(this, inner_var));
                } else {
                    set(this, inner_var, window.$state.get(global_var));
                }
                this.ljs.$state.on(`changed:${global_var}`, (val: any) => {
                    set(this, inner_var, val);
                });
                this.$watch(inner_var, (val: any) => {
                    window.$state.set(global_var, val);
                })
            });
        },

        beforeDestroy () {

            Object.keys(this.$options.$ws).map((event: string) => {
                let closure_name = this.$options.$ws[event];
                this.ljs.$ws.off(event, this[closure_name]);
            });

            Object.keys(this.$options.$state).map((event: string) => {
                let closure_name = this.$options.$state[event];
                this.ljs.$state.off(event, this[closure_name]);
            });

            Object.keys(this.$options.$sync).map((global_var: string) => {
                this.ljs.$state.off(`changed:${global_var}`);
            });
        },

        methods: {

            test_sw () {


            },

            exec (name: any, event: any = null) {

                ljs.exec(name, null, {object: (this as any).$el, event: event})
            }
        }
    });
});