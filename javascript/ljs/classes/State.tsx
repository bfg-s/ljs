import {StateInstance} from "./StateInstance";

export class State {
    public all: any = {}
    public prox: any

    constructor() {

        this.all = {};

        this.prox = new Proxy(this, (this as any));

        return this.prox;
    }

    deleteProperty(that: State, property: string) {

        return window.ljs.$state ? window.ljs.$state.delete(property) : null;
    }

    has(that: State, property: string) {

        return window.ljs.$state ? window.ljs.$state.has(property) : false;
    }

    set(that: State, property: string, value: any) {

        if (window.ljs.$state) {

            return window.ljs.$state.set(property, value);
        }

        return undefined;
    }

    get(that: State, property: string) {

        let state: StateInstance;
        if (!window.ljs.$state) return;
        else state = window.ljs.$state;

        if (property === 'all') {

            return state.all();
        }

        if (property in state) {

            return (state as any)[property];
        }

        return state.get(property)
    }

    ownKeys() {

        return Reflect.ownKeys(StateInstance.state);
    }

    getOwnPropertyDescriptor() {
        return {
            enumerable: true,
            configurable: true,
        };
    }
}
