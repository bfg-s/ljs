import {Helper} from "../../Helper";
import {VueExecutor} from "./VueExecutor";
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import unset from 'lodash/unset';

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

        methods: {

            exec (name: any, event: any = null) {

                ljs.exec(name, null, {object: (this as any).$el, event: event})
            }
        }
    });
});