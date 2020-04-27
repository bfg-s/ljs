import {ExecutorParent} from "../../../ljs/Extends/ExecutorParent";

export class Message extends ExecutorParent {

    __invoke (text: string) {

        if (text === "CSRF token mismatch.") {

            location.reload();
        }

        else {

            window.ljs.exec("toast:info", text);
        }
    }

    static __name () {

        return "message";
    }
}
