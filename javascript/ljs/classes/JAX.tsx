import isObject from 'lodash/isObject';

export class Jax
{
    public prox: any
    public withs: any = {}
    public withParams: any = {}
    public storage: any = {}
    public state: any = null
    constructor() {

        this.prox = new Proxy(this, this);
        this.withs = {};
        this.withParams = {};
        this.storage = {};
        this.state = null;
        return this.prox;
    }

    get (target: Jax, prop: any) {

        let that = this;

        if (prop === 'with') {

            return function (args: any) {

                that.withs = Array.isArray(args) || isObject(args) ? args : arguments;

                return that.prox;
            };
        }

        if (prop === 'params') {

            return function (object: any) {

                that.withParams = object;

                return that.prox;
            };
        }

        if (prop === 'storage') {

            return function (object: any) {

                that.storage = object;

                return that.prox;
            };
        }

        if (prop === 'state') {

            return function (path: string|boolean = true) {

                that.state = path;

                return that.prox;
            };
        }

        if (prop === 'toState') {

            return function (path: string|boolean = true) {

                that.state = path;

                return that.prox;
            };
        }

        return new Proxy(window.ljs.jax(prop), {

            get: function (tar, method) {

                if (method === 'call') {

                    method = '__invoke';
                }

                tar.with(that.withs);

                tar.storage(that.storage);

                tar.mergeParams(that.withParams);

                tar.state(that.state === true ? prop : that.state);

                return function (...props: any) {

                    return tar.call(method, props).onDone(() => {

                        that.withs = {};
                        that.storage = {};
                        that.withParams = {};
                        that.state = null;

                    }).send();
                }
            }
        });
    }
}