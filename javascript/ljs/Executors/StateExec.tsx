import {ExecutorParent} from "../Extends/ExecutorParent";

class EMPTY_DATA {
}

export class StateExec extends ExecutorParent {

    /**
     * Executor name
     * @private
     */
    static __name() {

        return "state";
    }

    /**
     * Magic call
     * @param $name
     * @param $args
     * @private
     */
    __call($name: any, $args: any) {

        let $value = EMPTY_DATA;

        if ($args.length) {

            $value = $args[0];
        }

        if ($value === EMPTY_DATA) {

            return window.state[$name];
        }

        window.ljs.$state.set($name, $value);

        return $value;
    }

    /**
     * Set variable state
     * @param $name
     * @param $value
     */
    set($name: string, $value: any) {

        return window.ljs.$state.set($name, $value);
    }

    /**
     * Switch boolean state
     * @param $name
     * @param $default
     */
    switch_bool($name: string, $default: any = false) {

        return window.ljs.$state.set($name, !window.ljs.$state.get($name, $default));
    }
}
