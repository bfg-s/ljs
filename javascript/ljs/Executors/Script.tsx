import {ExecutorParent} from "../Extends/ExecutorParent";

export class Script extends ExecutorParent {

    __call ($name: string, $args: []) {

        return this.call($name, $args);
    }

    static __call($name: string, $args: []) {

        return this.constructor.call($name, $args);
    }

    call ($name: string, $args: []) {

        return document.querySelectorAll(`script[for="${$name}"]`).forEach((a: any) => {

            let exec_script = a.innerText.trim();

            eval(exec_script);

            return exec_script;
        });
    }

    static __name () {
    
        return "script";
    }
}