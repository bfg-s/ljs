import {ExecutorParent} from "../Extends/ExecutorParent";

export class Script extends ExecutorParent {

    __call ($name: string, $args: []) {

        return this.call($name, $args);
    }

    static __call($name: string, $args: []) {

        return this.prototype.call($name, $args);
    }

    call ($name: string, $args: []) {

        return document.querySelectorAll(`script[for="${$name}"]`).forEach((a: any) => {

            let exec_script = a.innerText.trim();

            (function(){
                eval(exec_script);
            }).call(this);

            return exec_script;
        });
    }

    static __name () {
    
        return "script";
    }
}