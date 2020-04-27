/// <reference path="./ljs.d.ts" />

import {Core} from "./ljs/Core";
import {HTMLReady} from "./ljs/data/HTMLReady";
import {HTMLRegisterEvents} from "./ljs/data/HTMLRegisterEvents";

Core.globalBootstrap()
    .jsPrototypes()
    .document_load(() => {

        Core.ready_script((root: any) => new HTMLReady(root))
            .before_load((ljs: Ljs) => new HTMLRegisterEvents(ljs));

        Core.makeInstance()
            .loadedLjs();
    });
