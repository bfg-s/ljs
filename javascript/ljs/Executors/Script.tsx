import {ExecutorParent} from "../Extends/ExecutorParent";

export class Script extends ExecutorParent {

    __call ($name: string, $args: []) {

        return Script.call($name, $args);
    }

    static __call($name: string, $args: []) {

        return this.call($name, $args);
    }

    static call ($name: string, $args: []) {

        document.querySelectorAll('script[for="text-make"]').forEach((a: any) => {

            let exec_script = a.innerText.trim();

            eval(exec_script);
        });
    }

    static __name () {
    
        return "tpl";
    }
}