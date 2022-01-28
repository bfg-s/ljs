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
            return ljs.config('name', location.pathname.replace(/\//g, '_').replace(/^\_/, ''));
        },

        component: ($name: string) => {
            let all = ljs.$vue.allComponents();
            return all[$name] !== undefined ? all[$name] : null;
        },

        getOutside: () => {
            return ljs.$vue.outside;
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
            } else if ($group === null || $group === false) {

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
            } else if ($group === null || $group === false) {

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

        data() {

            return {
                _id: this.$vnode && this.$vnode.key ? this.$vnode.key : this.$options._componentTag,
                ljs: ljs
            };
        },

        $ws: [],
        $state: {},
        $sync: {},
        $exec: [],
        $remember: [],
        namespace: 'app',

        beforeMount() {

            let obj_name = this.$options.name + (this.$vnode && this.$vnode.key ? '_' + this.$vnode.key : '');

            this.$options.$remember.map((v: string) => {
                if (ljs.$storage.has(v, `vue-${obj_name}`)) {
                    this.$set(this, v, ljs.$storage.get(v, `vue-${obj_name}`));
                } else {
                    ljs.$storage.put(v, this[v], `vue-${obj_name}`);
                }

                this.$watch(v, (val: any) => {
                    ljs.$storage.put(v, this[v], `vue-${obj_name}`);
                });
            });

            Object.values(this.$options.$exec).map((name: any) => {
                ljs.toExec(`${obj_name}:${name}`, (...args: any) => (this as any)[name](...args));
            });

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
                if (!isNaN(Number(global_var))) {
                    global_var = inner_var;
                }
                if (!window.$state.has(global_var)) {
                    window.$state.set(global_var, get(this, inner_var));
                } else {
                    set(this, inner_var, window.$state.get(global_var));
                }
                this.ljs.$state.on(`changed:${global_var}`, this.__inner_sync_state_method(inner_var));
                this.$watch(inner_var, (val: any) => {
                    window.$state.set(global_var, val);
                })
            });

            if (typeof this.echo_mount === 'function') {
                this.echo_mount(this.echo);
            }
        },

        beforeDestroy() {

            if (this.echo) {
                this.echo.leaveRegistered();
            }

            let obj_name = this.$options.name + (this.$vnode && this.$vnode.key ? '_' + this.$vnode.key : '');

            Object.values(this.$options.$exec).map((name: any) => {
                ljs.removeExec(`${obj_name}:${name}`);
            });

            Object.keys(this.$options.$ws).map((event: string) => {
                let closure_name = this.$options.$ws[event];
                this.ljs.$ws.off(event, this[closure_name]);
            });

            Object.keys(this.$options.$state).map((event: string) => {
                let closure_name = this.$options.$state[event];
                this.ljs.$state.off(event, this[closure_name]);
            });

            Object.keys(this.$options.$sync).map((global_var: string) => {
                this.ljs.$state.off(`changed:${global_var}`, this.__inner_sync_state_method(global_var));
            });
        },

        computed: {
            echo(): LjsEcho {
                // @ts-ignore
                return window.EchoWrapper ? new window.EchoWrapper({
                    // @ts-ignore
                    namespace: this.$options.namespace,
                    bind: this
                }) : null;
            },
            jax(): any {
                // @ts-ignore
                return new window.JaxWrapper(this.$options.namespace);
            }
        },

        methods: {

            exec(name: any, event: any = null) {

                ljs.exec(name, null, {object: (this as any).$el, event: event})
            },

            __inner_sync_state_method(inner_var: string) {
                return (val: any) => {
                    set(this, inner_var, val);
                };
            }
        }
    });
});
