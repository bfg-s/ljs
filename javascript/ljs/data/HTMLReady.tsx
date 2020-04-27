import {HTMLState} from "./HTMLstate";
import {HTMLDataEvent} from "./HTMLDataEvent";

export class HTMLReady {

    constructor($root: any) {

        $root.querySelectorAll('[data-state]').forEach((obj: any) => {

            new HTMLState(obj);
        });

        $root.querySelectorAll('[data-load]').forEach((obj: any) => {

            new HTMLDataEvent('load', {target: obj, currentTarget: obj}, () => {

                obj.removeAttribute(`data-load`);
            });
        });
    }
}