import {ExecutorParent} from "../../../ljs/Extends/ExecutorParent";

export class Message extends ExecutorParent {

    static __name() {

        return "message";
    }

    __invoke(text: string) {

        if (text === "CSRF token mismatch.") {

            location.reload();
        } else {

            window.ljs.exec("toast:info", text);
        }
    }
}
