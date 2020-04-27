import map from 'lodash/map';
import {ExecutorParent} from "../../../ljs/Extends/ExecutorParent";

export class Errors extends ExecutorParent {

    __invoke (texts: any) {

        map(texts, (item, key) => {

            window.ljs.exec("toast:error", item);
        });
    }

    static __name () {

        return "errors";
    }
}
