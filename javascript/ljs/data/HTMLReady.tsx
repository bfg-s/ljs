import {HTMLDataEvent} from "./HTMLDataEvent";

window.HTMLDataEvent = HTMLDataEvent;

export class HTMLReady {

    constructor($root: any) {

        $root.querySelectorAll('[data-load]').forEach((obj: any) => {

            new HTMLDataEvent('load', {target: obj, currentTarget: obj}, () => {

                obj.removeAttribute(`data-load`);
            });
        });
    }
}